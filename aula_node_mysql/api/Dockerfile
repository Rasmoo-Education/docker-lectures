# Declara uma variavel VERSION com o valor latest
ARG VERSION=18-alpine3.17

# Define uma imagem base. Imagem para extendermos em nossa imagem customizada
FROM node:${VERSION}

# Define um diretorio de trabalho. Diretorio pai/raiz
WORKDIR /src

# Redeclara para tornar acessivel durante o build phase
ARG VERSION

# Declara uma variavel de AMBIENTE chamada PORT e de valor 7000
ENV PORT 7000

# Copia uma arquivo seguindo o padrao ORIGEM(maquina)  DESTINO(container)
COPY package*.json ./ 

COPY yarn.lock ./

COPY install_all_deps.sh ./

COPY app.js ./

# Execute comandos de terminal durante a fase de build da nossa imagem
RUN chmod +x install_all_deps.sh
RUN ./install_all_deps.sh

# expoe uma porta do container
EXPOSE ${PORT}

# Executa comando de entrada. Os primeiros comandos assim que o container é iniciado
CMD ["npm", "start"]
