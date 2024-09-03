const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();

// Use the cors middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow only requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
    }),
    headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// Function to get new access token
async function getAccessToken() {
    try {
        const response = await axios(authOptions);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token', error);
        return null;
    }
}

// Endpoint to get currently playing track
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
