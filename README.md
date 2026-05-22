# Restaurant API Nest.js

Backend didatico para uma aula de API REST, simulando um sistema de restaurante com clientes, mesas, itens do cardapio e pedidos.

Agora a API usa MongoDB com Mongoose e pode subir inteira via Docker Compose.

## Rodar local sem Docker

```bash
npm install
npm run start:dev
```

Servidor local:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/docs-json`

Para rodar local sem Docker, tenha um MongoDB acessivel e configure:

```bash
copy .env.example .env
npm run start:dev
```

## Rodar com Docker

```bash
copy .env.example .env
docker compose up -d --build
```

Com Docker, a API fica publicada na porta configurada em `HOST_PORT`.
Por padrao:

- API: `http://localhost:3002`
- Swagger: `http://localhost:3002/docs`

Ver logs:

```bash
docker compose logs -f api
```

Parar:

```bash
docker compose down
```

Parar e apagar o volume do MongoDB:

```bash
docker compose down -v
```

## Subir em uma VPS

1. Instale Docker e Docker Compose na VPS.
2. Envie a pasta do projeto para a VPS.
3. Crie o arquivo `.env` a partir do `.env.example`.
4. Troque `MONGO_INITDB_ROOT_PASSWORD` por uma senha forte.
5. Rode:

```bash
docker compose up -d --build
```

O `docker-compose.yml` nao publica a porta `27017` do MongoDB. Na VPS, libere apenas a porta da API, por exemplo `3002`, ou coloque a API atras de Nginx/Caddy com HTTPS.

Se a porta `3002` tambem estiver ocupada no servidor, altere somente `HOST_PORT` no `.env`, por exemplo:

```env
HOST_PORT=3003
```

## Recursos

- `customers`: CRUD de clientes.
- `tables`: CRUD de mesas do restaurante.
- `menu-items`: CRUD de itens do cardapio.
- `orders`: CRUD de pedidos e alteracao de status.
- `request-lab`: endpoints didaticos para testar metodos HTTP como `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` e `ALL`.

Ao iniciar com um banco vazio, a API cria dados iniciais para facilitar os testes:

- Cliente: `cus_0001`
- Mesa: `tbl_0003`
- Item do cardapio: `mit_0005`
- Pedido: `ord_0008`

## Postman

Importe o arquivo `postman/Restaurant API Nest.postman_collection.json` no Postman.
