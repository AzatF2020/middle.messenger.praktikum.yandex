run:
	docker compose -f docker-compose.yml up -d

stop:
	docker compose -f docker-compose.yml down

build:
	docker compose -f docker-compose.yml build

build-no-cache:
	docker compose -f docker-compose.yml build --no-cache

reboot:
	make stop && make build && make run

bash:
	docker compose -f docker-compose.yml exec -it app /bin/bash