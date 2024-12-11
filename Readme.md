# Documentação

API Rest para realizar CRUD de Etiquetas. Construida sobre o Framework `NestJs` na linguagem `Typescript` usando o motor `NodeJS` na versão 20.
Esta aplicação esta configurada para uso em Docker.

## Pré-requisitos

- Docker
- Make (Para sistemas linux)

## Swagger

Documentação da API realizada com Swagger. Url de acesso `http://localhost:3000/swagger-docs`.
A url de acesso pode-se alterar quando as variaveis de ambiente `SWAGGER_PATH` e `API_PORT` forem alteradas.

## Environment Variables

```
      API_PORT: 3000 // Porta de exposição
      API_NAME: "MS-ME-Etiqueta-DEV" // Nome da aplicação
      SWAGGER_ENABLED: "true" // Habilita o swagger, qualquer valor diferente desabilita ou se não existir;
      SWAGGER_PATH: "swagger-docs" // Rota para acessar o swagger
      SIZE_MAX_FILE_BYTES: "5242880" // Tamnho maximo do arquivo de upload
```

# Gerenciamento do Projeto

Este projeto utiliza um Makefile para facilitar a execução de comandos comuns de gerenciamento do projeto. Abaixo estão os comandos disponíveis para sistemas Linux e seus equivalentes para Windows.

## Comandos para Linux

### Limpar

Remove os diretórios `node_modules` e `dist`.

```sh
make clean
```

### Anexar

Anexa ao contêiner Docker em execução.

```sh
make attach
```

### Desenvolvimento

Inicia o ambiente de desenvolvimento usando o arquivo docker-compose.dev.yml.

```sh
make dev
```

### Produção

Inicia o ambiente de produção.

```sh
make prod
```

### Parar

Para o contêiner Docker.

```sh
make stop
```

### Iniciar

Inicia o contêiner Docker.

```sh
make start
```

### Remover Imagem

Para e remove o contêiner Docker e a imagem Docker associada.

```sh
make rmi
```

### Alterar Propriedade

Altera a propriedade dos arquivos no diretório ./code para o usuário carvalho.

```sh
make chown
```

## Comandos para Windows

Para sistemas Windows, você pode usar os comandos gerados a partir do comando make. Aqui estão os equivalentes:

### Anexar

```powershell
docker exec -it mais-envios-backend sh
```

### Desenvolvimento

```powershell
docker compose --project-name mais-envios --file docker-compose.dev.yml up
```

### Produção

```powershell
docker compose --project-name mais-envios up
```

### Parar

```powershell
docker compose --project-name mais-envios container mais-envios-backend down
```

### Iniciar

```powershell
docker compose --project-name mais-envios container mais-envios-backend up
```

### Remover Imagem

```powershell
docker stop mais-envios-backend && docker rm mais-envios-backend && docker rmi mais-envios-mais-envios-backend
```

## Observações

Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.
Para executar os comandos `make` no Linux você pode precisar ter instalado.
Com esses comandos, você pode gerenciar facilmente o projeto tanto em sistemas Linux quanto em Windows.

## Comandos sem Docker

## Pré-requisitos

- Node: 20
- Yarn

Antes de qualquer comando `yarn`, executar o `yarn install` para instalar as dependecias do projeto e
configurar as variaveis de ambiente.

### Desenvolvimento

```
yarn dev
```

### Build

```
yarn build
```
