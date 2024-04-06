Testing the configuration:

```bash
docker compose exec nginx nginx -t
```
Restart Nginx:
```bash
docker compose exec nginx nginx -s reload
```
