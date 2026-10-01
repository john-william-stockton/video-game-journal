-- Run by the db service on every start (see docker-compose.yml), so it must stay idempotent.
-- $(DB_NAME) is a sqlcmd variable, passed in with -v.
IF DB_ID('$(DB_NAME)') IS NULL
    CREATE DATABASE [$(DB_NAME)];
GO
