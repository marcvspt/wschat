# WebSocket: simple chat through Nginx reverse proxy with Docker-Compose
## Deploy project
```
git clone https://github.com/marcvspt/wschat
cd wschat/
```

### Nginx config files
We need modify the `.conf` files and the `.js` file in frontend, put your own domain:
* [**default.conf**](revproxy/default.conf)
* [**backend.conf**](revproxy/backend.conf)
* [**frontend index.js**](frontend/index.js)

Later run the compose.
```bash
docker-compose up -d
```