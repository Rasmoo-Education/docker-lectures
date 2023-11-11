FROM mysql:5.7

## Ao copiar para esse caminho, o docker executa o script automaticamente
ADD schema.sql /docker-entrypoint-initdb.d

ENV MYSQL_ALLOW_EMPTY_PASSWORD true

EXPOSE 3306