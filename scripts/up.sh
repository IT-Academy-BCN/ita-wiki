#!/bin/bash
source utils.sh
ENV_FILE=$(git_root)/back/.env
loadEnv "$ENV_FILE"

launchPostgres() {
    docker stop $DB_NAME -t 10 || true
    docker rm -v $DB_NAME || true
    docker volume rm $DB_NAME || true
    echo "Starting PostgreSQL ..."
    docker run -it -d --rm \
        --name $DB_NAME \
        -e POSTGRES_PASSWORD=$DB_PASS \
        -e PGDATA=/var/lib/postgresql/data/pgdata \
        -v $DB_NAME:/var/lib/postgresql/data \
        -p $DB_PORT:5432 \
        postgres:14.1-alpine
    timeout 90s "until docker exec $DB_NAME pg_isready ; do sleep 3 ; done"
}

launchPostgres