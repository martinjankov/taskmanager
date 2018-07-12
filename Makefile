PORT=8080

CONTAINER_NAME=taskmanager

# Docker Image name.
DOCKER_IMAGE_NAME=taskmanager-image

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Install application and build dependencies.
setup: build-docker-image

# Load Taskmanager
load-taskmanager:
	@echo Loading Taskmanager
	@docker-compose up -d
	@until curl --silent --output /dev/null http://localhost:${PORT};\
		do echo "Attempting connection..."; \
			sleep 10;									 \
		done
	@echo Done loading Taskmanager

# Build custom Docker Image.
build-docker-image:
	@echo Building Docker image
	@docker build -t $(DOCKER_IMAGE_NAME) -f Dockerfile .
	@echo Done building Docker image

start: load-taskmanager
	@echo
	@echo Application successfully launched at http://localhost:${PORT}
	@echo

# Stop Taskmanager
stop:
	@echo Stopping Docker containers
	@docker-compose down
	@echo Done stopping Docker containers

# Destroy Docker containers, and delete persistent storage.
destroy:
	@echo Destroying Docker containers
	@docker-compose down --volumes
	@echo Done destroying Docker containers

# Open an interactive terminal to Taskmanager.
tm-terminal:
	@echo Entering Taskmanager terminal
	@docker exec -it --user www-data ${CONTAINER_NAME} /bin/bash
	@echo Exiting Taskmanager terminal