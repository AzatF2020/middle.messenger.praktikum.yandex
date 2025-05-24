# Dev
up_dev:
	docker compose -f docker.compose.dev.yml up -d

down_dev:
	docker compose -f docker.compose.dev.yml down

build_dev:
	docker compose -f docker.compose.dev.yml build

bash_dev:
	docker compose -f docker.compose.dev.yml exec frontend /bin/bash

reboot_dev:
	make down && make build && make up && make bash

logs_dev:
	docker compose -f docker-compose.dev.yml logs -f

# Prod
up:
	docker compose -f docker.compose.yml up -d

down:
	docker compose -f docker.compose.yml down

build:
	docker compose -f docker.compose.yml build

bash:
	docker compose -f docker.compose.yml exec frontend /bin/bash

reboot:
	make down && make build && make up && make bash

logs:
	docker compose -f docker-compose.yml logs -f
