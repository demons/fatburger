start:
	docker compose -f docker-compose.prod.yml up --build -d

dev:
	docker compose down && docker compose up --build -d

migrate:
	docker exec -it fb_backend npx sequelize-cli db:migrate

skeleton:
	docker exec -it fb_backend npx sequelize-cli migration:generate --name migration-skeleton
