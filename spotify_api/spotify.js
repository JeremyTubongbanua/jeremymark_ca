const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['https://jeremymark.ca', 'http://jeremymark.ca', 'http://localhost:3002', 'http://localhost:3001'],
    optionsSuccessStatus: 200
}));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI; // Redirect URI you set in Spotify Developer Dashboard
const scope = 'user-read-currently-playing'; // Add other scopes as needed

// Step 1: /login endpoint to redirect users to Spotify authorization page
app.get('/login', (req, res) => {
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        });
    res.redirect(authUrl);
});

// Step 2: /callback endpoint to handle Spotify redirect and exchange the authorization code for access token
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    const tokenOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            client_id: client_id,
            client_secret: client_secret
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios(tokenOptions);
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;

        // Log the refresh token to the console for manual saving
        console.log('Refresh Token:', refresh_token);

        // Set the CORS headers for redirect response
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Redirect to success page with tokens
        res.redirect(`/success?access_token=${access_token}&refresh_token=${refresh_token}`);

    } catch (error) {
        console.error('Error during token exchange', error);
        res.status(500).json({ error: 'Failed to exchange authorization code for token' });
    }
});

// Step 3: /success endpoint to display the access and refresh tokens
app.get('/success', (req, res) => {
    const access_token = req.query.access_token;
    const refresh_token = req.query.refresh_token;

    res.send(`
        <h1>Success!</h1>
        <p>Access Token: ${access_token}</p>
        <p>Refresh Token: ${refresh_token}</p>
        <p>Make sure to store these securely.</p>
    `);
});

// Step 4: Endpoint to get currently playing track
app.get('/currently-playing', async (req, res) => {
    const access_token = await getAccessToken();

    if (!access_token) {
        return res.status(500).json({ error: 'Failed to get access token' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });

        if (response.status === 204 || response.data === '') {
            return res.status(200).json({ message: 'No track is currently playing.' });
        }

        const currentlyPlaying = response.data;
        return res.json(currentlyPlaying);

    } catch (error) {
        console.error('Error fetching currently playing track', error);
        return res.status(500).json({ error: 'Failed to get currently playing track' });
    }
});

// Start the server
app.listen(3002, () => {
    console.log('Server listening on port 3002');
});

// Function to get new access token using refresh token
async function getAccessToken() {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: process.env.REFRESH_TOKEN, // Use from .env or pass it appropriately
            }),
            headers: {
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token', error);
        return null;
    }
}
