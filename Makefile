start:
	docker compose -f docker-compose.prod.yml up --build -d

dev:
	docker compose down && docker compose up --build -d