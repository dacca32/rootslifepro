Commands and helpers - @TODO: Tidy and format

- docker compose build
- docker compose up -d
- docker compose down
- docker stop <container-id>
- docker ps

- docker exec -it <container-id> /bin/bash
- docker logs -v <container-id>

PSQL in the container
- psql -U <username> -d <database>

Migrations
- docker exec into webserver
- flask db migrate -m "message"
- flask db upgrade
