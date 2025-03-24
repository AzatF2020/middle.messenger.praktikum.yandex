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