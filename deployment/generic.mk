.PHONY: all

.DEFAULT_GOAL := help

OS_NAME := $(shell uname -s | tr A-Z a-z)
ifeq ($(OS_NAME),darwin)
	NUM_PROCESSORS := $(shell sysctl -n hw.ncpu)
else
	NUM_PROCESSORS := $(shell nproc)
endif

DATE := $(shell date +%Y)

COMMAND_COLOR := $(shell tput -Txterm setaf 2)
HELP_COLOR    := $(shell tput -Txterm setaf 4)
RESET_COLOR   := $(shell tput -Txterm sgr0)
CYAN_COLOR    := $(shell tput -Txterm setaf 6)

PYTHON_SERVICE := 

ifndef DISABLE_INTERACTIVE
	INTERACTIVE_FLAG =
else
	INTERACTIVE_FLAG = -T
endif

USER_ID:=$(shell id -u)
GROUP_ID:=$(shell id -g)

DOCKER_NAMESPACE := $(shell basename $(CURDIR) | tr A-Z a-z)
DOCKER_COMPOSE    = docker-compose -p ${DOCKER_NAMESPACE} -f deployment/docker-compose.yml --project-directory ${PWD}
EXEC_APP          = $(DOCKER_COMPOSE) exec ${INTERACTIVE_FLAG} --user="${USER_ID}:${GROUP_ID}" ${PYTHON_SERVICE} sh -c
RUN_APP           = $(DOCKER_COMPOSE) run ${INTERACTIVE_FLAG} --user="${USER_ID}:${GROUP_ID}" --rm ${PYTHON_SERVICE} sh -c

UNIT_TEST_CMD := 
UNIT_TEST_COVERAGE_CMD := 


##@ Helpers
.PHONY: help
help: ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\n${CYAN_COLOR}${DOCKER_NAMESPACE}\n${RESET_COLOR}\nCopyright (c) ${DATE} Jeyhun Abbasov \n \nUsage:\n  make ${CYAN_COLOR}<target>${RESET_COLOR}\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  ${COMMAND_COLOR}%-25s${RESET_COLOR} %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s${RESET_COLOR}\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Main commands
.PHONY: init
init: clean-all setup-hooks docker-prepare start  ## Initialize the project for the first time

.PHONY: clean-all
clean-all: ## WARNING!! This command delete the project container and volumes
	@$(DOCKER_COMPOSE) rm -s -v

.PHONY: setup-hooks
setup-hooks: ## Configure git hooks
	@git config core.hooksPath ./deployment/hooks/

.PHONY: docker-prepare
docker-prepare:
	$(DOCKER_COMPOSE) pull --quiet --ignore-pull-failures
	DOCKER_BUILDKIT=1 COMPOSE_HTTP_TIMEOUT=200 $(DOCKER_COMPOSE) build --no-cache

.PHONY: start
start: ## Start this project
	$(DOCKER_COMPOSE) up -d --remove-orphans