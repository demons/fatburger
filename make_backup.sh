#/bin/sh

# docker exec -t fb_db pg_dump fatburger -U fatburger > backup.test
#  && curl -X POST -H 'Content-Type: application/json' --data '{"chat_id": "'$CHAT_ID'", "text": "backup!"}' https://api.telegram.org/bot$TOKEN/sendMessage

source .env

fileName=/tmp/dump_`date +%Y-%m-%d"_"%H-%M-%S`.gz

docker exec -t fb_db pg_dumpall -c -U $DB_NAME | gzip > $fileName

curl -v -F "chat_id=$TELEGRAM_CHAT_ID" -F document=@"$fileName" https://api.telegram.org/bot$TELEGRAM_TOKEN/sendDocument

rm $fileName

# Restore
# file=dump_2023-07-18_20-51-29.gz
# gunzip -c $file | docker exec -i fb_db psql -U fatburger
