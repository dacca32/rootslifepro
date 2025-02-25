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

    - Adding a new table eg.
    CREATE TABLE roles ( 
            id SERIAL PRIMARY KEY,
            role_name VARCHAR(50) NOT NULL
            );

    - Insert data eg.
    INSERT INTO roles (role_name) VALUES ('Admin'), ('User), ('Guest');

    - Add relationship column eg to users table
    ALTER TABLE "user" ADD COLUMN role_id INTEGER;
    ALTER TABLE "user"
    ADD CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id);

    - Next update models and schema to include the new relationship



Migrations
- docker exec into webserver
- flask db migrate -m "message"
- flask db upgrade
