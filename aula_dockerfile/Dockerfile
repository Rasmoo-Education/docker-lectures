# Define uma imagem base. Imagem para extendermos em nossa imagem customizada
FROM node:18-alpine3.17 

# Define um diretorio de trabalho. Diretorio pai/raiz
WORKDIR /src

# Copia uma arquivo seguindo o padrao ORIGEM(maquina)  DESTINO(container)
COPY package*.json ./ 

COPY requirements.txt ./ 

COPY yarn.lock ./

COPY install_all_deps.sh ./

# Execute comandos de terminal durante a fase de build da nossa imagem
RUN chmod +x install_all_deps.sh
RUN ./install_all_deps.sh

COPY . .

# expoe uma porta do container
EXPOSE 3000


# Executa comando de entrada. Os primeiros comandos assim que o container é iniciado
CMD ["npm", "start"]
