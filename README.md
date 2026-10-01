# video-game-journal

A Spring Boot API and React UI backed by SQL Server.

| Folder | What it is |
| --- | --- |
| `api/` | Spring Boot 4 (Java 21, Maven), JPA on SQL Server |
| `ui/` | React 19 on Vite; `server.mjs` serves the built app in the container |
| `db/` | `init.sql`, run by the `db` service on every start to create the database |

## Setup

Copy `.env.example` to `.env` and set `MSSQL_SA_PASSWORD`. SQL Server rejects weak passwords: use at least 8 characters with upper case, lower case and digits or symbols.

## Develop in the dev container

Open the folder in VS Code and run "Dev Containers: Reopen in Container". This starts SQL Server and a container with Java 21 and Node 22.

Start both apps with the "Full stack: API + UI" launch configuration, or from two terminals:

```sh
cd api && ./mvnw spring-boot:run
cd ui && npm run dev
```

| What | URL |
| --- | --- |
| UI | http://localhost:5173 |
| API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| SQL Server | `localhost:1433`, user `sa` |

The Vite dev server proxies `/api` to the API.

## Checks

```sh
cd api && ./mvnw test      # needs the database running
cd ui && npm run lint
```

## Run everything in containers

From the host, not from inside the dev container:

```sh
docker compose up --build
```

The UI is then on http://localhost:3000 and the API on http://localhost:8080.
