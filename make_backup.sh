#/bin/bash

# docker exec -t fb_db pg_dump fatburger -U fatburger > backup.test
#  && curl -X POST -H 'Content-Type: application/json' --data '{"chat_id": "'$CHAT_ID'", "text": "backup!"}' https://api.telegram.org/bot$TOKEN/sendMessage

source .env

fileName=/tmp/"$DB_NAME"_`date +%Y-%m-%d"_"%H-%M-%S`.gz
# docker exec -t fb_db pg_dumpall -c -U $DB_NAME | gzip > $fileName

# Создание бэкапа
docker exec -t fb_db pg_dump --clean --create --if-exists -U fatburger fatburger | gzip > $fileName

# Для восстановления сбрасываем все подключения к базе (чтобы не возникало ошибок)
# SELECT pg_terminate_backend( pid ) FROM pg_stat_activity WHERE pid <>
# pg_backend_pid( ) AND datname = 'fatburger';
# Восстанавливаем базу данных из бэкапа
# gunzip -c /tmp/fatburger_2024-04-18_11-11-27.gz | psql -U postgres -h localhost

curl -v -F "chat_id=$TELEGRAM_CHAT_ID" -F document=@"$fileName" https://api.telegram.org/bot$TELEGRAM_TOKEN/sendDocument

rm $fileName

# Restore
# file=dump_2023-07-18_20-51-29.gz
# gunzip -c $file | docker exec -i fb_db psql -U fatburger

# Add crontab
# sudo sh -c 'echo "00 02   * * *   alex     cd /home/alex/docker/fatburger && /usr/bin/bash make_backup.sh;\n\n" >> /etc/crontab'
