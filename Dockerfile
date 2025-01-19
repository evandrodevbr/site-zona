FROM node:18-alpine

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o resto dos arquivos
COPY . .

# Compila o projeto
RUN pnpm build

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["pnpm", "start"] 