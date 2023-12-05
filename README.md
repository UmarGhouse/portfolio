# Tech Stack

This project runs on the following:

- Ruby 2.7.6
- Rails 6.0.6.1
- React v17
- PostgreSQL 12.15
- Docker

# Getting started

The app and associated services (Postgres) are dockerized and setup in `docker-compose.yml` for development and `heroku.yml` for production.

To get started in development, simply run:

```bash
docker-compose up -d
```

# Deployment

Deployment is handled by `heroku.yml` and set to deploy automatically from the `master` branch