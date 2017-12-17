PROJECT = node_project

.PHONY: start
start: 
	docker-compose -p $(PROJECT) up -d --build && \
	docker logs -f client
	
.PHONY: start-dev
start-dev: 
	docker-compose -f docker-compose.dev.yml -p $(PROJECT) up -d --build && \
	docker logs -f client
	
.PHONY: restart
restart:
	docker-compose -p $(PROJECT) kill && \
	docker-compose -p $(PROJECT) rm -f && \
	docker-compose -p $(PROJECT) up -d --build && \
	docker logs -f client

.PHONY: restart-dev
restart-dev:
	docker-compose -p $(PROJECT) kill && \
	docker-compose -p $(PROJECT) rm -f && \
	docker-compose -f docker-compose.dev.yml -p $(PROJECT) up -d --build && \
	docker logs -f client


.PHONY: logs
logs:
	docker-compose -p $(PROJECT) logs

.PHONY: kill
kill: 
	docker-compose -p $(PROJECT) kill

.PHONY: ps
ps: 
	docker-compose -p $(PROJECT) ps
