# For developers:

## Set up vs code to correctly format .sql files

- We recommend having SQLTools extension installed.
- Set it as your default .sql formatter on vscode:<br>
  ctrl+shit+p<br>
  format document with --> select SQLTools<br>
  Then go to vs code settings.json and make sure to set it up as your default sql formatter:<br>

```json
"[sql]": {
    "editor.defaultFormatter": "mtxr.sqltools"
  }
```

Other formatters, will bizardly add additional $$ to your document, making it impossible to interpret by docker.

## To initiate the database:

- Take sure bash will read correctly the environment variables from the .env file:

```bash
    set -a; source .env; set +a
```

- Then download the image and mount the container with the env vars:

```bash
    docker run -d \
        --name postgres \
        -e POSTGRES_USER=$DB_USER \
         -e POSTGRES_PASSWORD=$DB_PASS \
        -e POSTGRES_DB=$DB_NAME \
        -v "/$(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql" \
        -p $DB_PORT:5432 \
        postgres:latest
```

- Then run the server

```Bash
npm run dev
```
