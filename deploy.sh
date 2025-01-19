#!/bin/bash

# Instala o pnpm se não estiver instalado
if ! command -v pnpm &> /dev/null; then
    echo "Instalando pnpm..."
    npm install -g pnpm
fi

# Instala as dependências
echo "Instalando dependências..."
pnpm install --frozen-lockfile

# Compila o projeto
echo "Compilando o projeto..."
pnpm build

# Inicia o servidor
echo "Iniciando o servidor..."
pnpm start 