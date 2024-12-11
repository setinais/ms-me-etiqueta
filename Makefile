export PROJECT_NAME = mais-envios
export PROJECT_COMAND = docker compose --project-name ${PROJECT_NAME}
export CONTAINER_NAME = ${PROJECT_NAME}-backend
export IMAGE_NAME = ${PROJECT_NAME}-${CONTAINER_NAME}

clean:;  sudo rm -rf "/code/node_modules" "/code/dist"
attach:; docker exec -it ${CONTAINER_NAME} sh
dev:;    ${PROJECT_COMAND} --file docker-compose.dev.yml up
prod:;   ${PROJECT_COMAND} up
stop:;   ${PROJECT_COMAND} container ${CONTAINER_NAME} down
start:;  ${PROJECT_COMAND} container ${CONTAINER_NAME} up
rmi:;    docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME} && docker rmi ${IMAGE_NAME}
chown:;  sudo chown -R carvalho:carvalho ./code

PHONY: clean
PHONY: attach
PHONY: dev
PHONY: prod
PHONY: stop
PHONY: start
PHONY: rmi
PHONY: chown