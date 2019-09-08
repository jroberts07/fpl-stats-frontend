NAME = fpl-stats-frontend
COMPOSE_FILE = src/docker-compose.yaml
COMPOSE_PROJECT_NAME = fpl

help:
	@perl -ne 'print if /^[0-9a-zA-Z_-]+:.*?## .*$$/' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build docker images
	@docker-compose build fpl-stats-frontend
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend sh -c "yarn install && yarn build"
	@docker-compose build cdn

run: ## Runs the code in a container
	@docker-compose up -d

stop: ## Stop running containers
	@docker-compose stop

down: ## Stop running containers and remove orphans/volumes
	@docker-compose down --volumes

clean: ## Remove running containers and docker images
	@docker-compose down --volumes --rmi all

logs: ## Show logs
	@docker-compose logs --tail=500 -f

ps: ## Show running containers
	@docker-compose ps

shell: ## Shell to the fpl-stats-frontend container.
	@docker-compose exec fpl-stats-frontend bash

lint: ## Runs the linting on the code
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend yarn run lint

fix-lint: ## Runs the fix linting on the code
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend yarn run fix-lint

test: ## Runs the unit tests
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend yarn run test

test-with-coverage: ## Runs the unit tests
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend yarn run test-with-coverage

test-debug: ## Runs the unit tests
	@docker run -it --rm -w /app -v $(PWD)/src/app:/app fpl-stats-frontend yarn run test:debug

.PHONY: build clean down fix-lint lint logs ps run shell stop test test-with-coverage test-debug
.EXPORT_ALL_VARIABLES: