# jeremymark.ca

Portfolio website: [https://jeremymark.ca](https://jeremymark.ca)

## Generate certs

```bash
sudo certbot certonly --standalone -d spotify.jeremymark.ca
sudo certbot certonly --standalone -d jeremymark.ca
```

Then edit `docker-compose.yaml` volumes appropriately

## Spotify

To login, go to

https://spotify.jeremymark.ca
