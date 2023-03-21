#!/bin/bash

# Location where you want to keep your db dump
backup_folder_path=~/db_backups


# File name i.e: dump-2020-06-24.sql
file_name="dump-"`date "+%Y-%m-%d"`".sql"


# ensure the location exists
mkdir -p ${backup_folder_path}


#change database name, username and docker container name
dbname=my_db_name
username=my_db_username
container=my_db_container


backup_file=${backup_folder_path}/${file_name}

docker exec -it ${container} pg_dump -U ${username} -d ${dbname} > ${backup_file}

echo "Dump successful"
