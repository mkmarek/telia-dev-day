# PosgreSQL database with GraphQL schema

Example of creating a schema in PostgreSQL database with an instant GraphQL schema

## How to start

1. Run Postgres docker with adminer `docker-compose -f stack.yml up`
2. Go to `localhost:8080`and login to your postgres instance with username `postgres` and password `example`
3. Create your database using `CREATE DATABASE ship_shop;` and switch to that database
3. Run `schema.sql` in order to create the appropriate tables
4. Run `seed.sql` in order to populate those tables with data