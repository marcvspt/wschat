# WebSocket: simple chat through Nginx reverse proxy

## Deploy project
```
git clone https://github.com/marcvspt/wschat
cd wschat/
```

### Nginx config files
On the path `/etc/nginx/site-available` we need modify the `defautl` and put this:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name example-domain.local; # Your domain

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Server $host;
    }
}
```

Create a file with a descriptive name, `ws.example-domain.local` and put this:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ws.example-domain.local; # Your domain

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Server $host;

        # WEBSOCKET CONFIGURATION
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        add_header Access-Control-Allow-Origin http://example-domain.local; # RECOMENDATION: put just your domain
    }
}
```

Replace your domain in the [frontend index.js](frontend/index.js). Later run the compose.
```bash
docker-compose up -d
```