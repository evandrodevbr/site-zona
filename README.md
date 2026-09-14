# Site Zona

**Site de uma página que apresenta os membros da comunidade Team Zona e as pérolas (frases) de cada um, lendo os dados de arquivos JSON versionados no próprio repositório.**

![Next.js](https://img.shields.io/badge/Next.js-15.1-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D18.18-5FA04E?logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Dockerfile-2496ED?logo=docker&logoColor=white)

## Sobre

O Site Zona é o site da Team Zona, um grupo de amigos que joga junto e acumula pérolas (frases memoráveis ditas em partida e no Discord). O site resolve um problema simples: guardar e exibir esse acervo sem banco de dados, sem CMS e sem painel administrativo. Tudo é arquivo versionado no repositório: uma imagem em `public/members` e um JSON em `data/members` por membro.

A página inicial mostra um destaque em carrossel e, abaixo, a grade com todos os membros. Cada card traz a foto, a descrição, o status (online/offline), a contagem de pérolas e a lista delas, com botão para expandir. Membros com `video` no JSON exibem um YouTube Short no lugar das pérolas.

## Como funciona

```
navegador
   │
   ▼
Next.js 15 (App Router, renderização no servidor)
   ├── GET /               app/page.jsx: busca /api/members no próprio
   │                       servidor, ordena por quantidade de pérolas e
   │                       renderiza MemberSlider (destaque) + MemberGrid (grade)
   └── GET /api/members    app/api/members/route.js: lê public/members/*.jpg,
                           cruza com data/members/<nome>.json e devolve JSON
```

- A home é renderizada no servidor a cada requisição (`cache: 'no-store'`), então basta recarregar a página para ver dados novos.
- O endpoint `/api/members` percorre as imagens de `public/members`. Para cada imagem procura `data/members/<nome>.json`; se o JSON não existir, usa dados padrão (`Membro da Team Zona`, status `offline`).
- Toda a animação (`motion`, efeito de digitação) roda no cliente; o HTML inicial já vem com os nomes, descrições e pérolas.
- As fotos são servidas pelo otimizador de imagens do Next (`/_next/image`).

## Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js 15.1.5, App Router, JavaScript (sem TypeScript) |
| UI | React 19 |
| Animação | motion 11 (`motion/react`) e componentes próprios (`TypeWriter`, `MotionWrapper`) |
| Estilo | Tailwind CSS 3.4 via PostCSS |
| Grade | CSS columns (`columns-1 md:columns-2 lg:columns-3`); `react-masonry-css` está declarado no `package.json` mas não é usado no código |
| Dados | arquivos JSON em `data/members` e imagens em `public/members` |
| Script auxiliar | chokidar 3 (observa `public/members` e cria JSON para imagens novas) |
| Pacotes | pnpm, lockfile v9.0 |
| Deploy | `Dockerfile` (node:18-alpine) e `deploy.sh` |

## Requisitos

- Node.js `>=18.18` (exigência do Next 15; testado com Node 24.20.0)
- pnpm `>=9` (lockfile v9.0; testado com pnpm 12.4.1 e com pnpm 9.15.9 para o lockfile)
- Nada além disso: não há banco de dados nem variável de ambiente obrigatória

## Início rápido

```bash
pnpm install --frozen-lockfile
pnpm dev                            # http://localhost:3000
```

Para subir em outra porta:

```bash
PORT=4317 pnpm dev
```

Conferir que a API de membros responde:

```bash
curl -s http://localhost:3000/api/members | head -c 300
```

## Uso

Rotas expostas pela aplicação:

| Rota | O que faz |
|---|---|
| `GET /` | Página única com o destaque em carrossel e a grade de membros. |
| `GET /api/members` | Lista os membros em JSON. Cada item tem `id`, `name`, `image`, `description`, `quotes` (array) e `status`; `video` aparece quando o JSON do membro define um. Só entram membros que têm imagem em `public/members`. |
| `GET /members/<arquivo>.jpg` | Fotos originais servidas como estático. |
| `GET /_next/image?url=...&w=...&q=...` | Otimizador de imagens do Next. |
| `GET /site.webmanifest` | Manifest do PWA existente em `public/` (não referenciado no layout). |

Scripts do `package.json`:

| Script | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento com Turbopack. |
| `pnpm build` | Build de produção (`next build`). |
| `pnpm start` | Sobe o build de produção (`next start`); respeita `PORT`. |
| `pnpm lint` | ESLint via `next lint`. |
| `pnpm watch:members` | Observa `public/members` e cria `data/members/<nome>.json` para imagens novas, com o template padrão. |

Adicionar um membro:

```bash
cp foto.jpg public/members/NovoMembro.jpg
pnpm watch:members          # cria data/members/NovoMembro.json (deixe rodando ou rode uma vez)
# edite data/members/NovoMembro.json com description, quotes e status
```

O nome do arquivo de imagem é a chave do membro: `NovoMembro.jpg` precisa de `data/members/NovoMembro.json`.

Variável de ambiente opcional:

| Variável | Efeito |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base usada pela home para chamar `/api/members`. Se não for definida, a home usa `http://127.0.0.1:$PORT`, com a porta em que o servidor está de fato ouvindo (o Next define `PORT` ao subir, inclusive com `-p`). |

## Produção

```bash
pnpm install --frozen-lockfile
pnpm build                  # gera .next
pnpm start                  # servidor Node do Next; porta padrão 3000, configurável por PORT
```

O `start` roda o servidor compilado, não o servidor de desenvolvimento. Os diretórios `public/` e `data/` precisam existir no ambiente de execução: a API lê `public/members` e `data/members` do disco em tempo de requisição.

Com Docker:

```bash
docker build -t site-zona .
docker run -p 3000:3000 site-zona
```

O `Dockerfile` usa `node:18-alpine`, instala o pnpm globalmente, roda `pnpm install --frozen-lockfile`, `pnpm build` e inicia com `pnpm start`. O `.dockerignore` evita copiar `node_modules` e `.next` do host para a imagem.

No host, `deploy.sh` faz o mesmo caminho (instala o pnpm globalmente se faltar, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm start`).

## Estrutura do projeto

```
app/
├── api/members/route.js     GET /api/members: cruza imagens com os JSONs
├── components/
│   ├── MemberCard.jsx       card do membro (foto, descrição, pérolas, vídeo)
│   ├── MemberGrid.jsx       grade responsiva em colunas
│   ├── MemberSlider.jsx     carrossel de destaque
│   ├── MotionWrapper.jsx    wrappers de animação (FadeIn, ScaleIn, Hover, Float, Pulse)
│   └── TypeWriter.jsx       efeito de digitação
├── globals.css              Tailwind e keyframes próprios
├── layout.jsx               layout raiz e metadados (SEO e Open Graph)
└── page.jsx                 home: busca /api/members e monta a página
data/members/*.json          dados de cada membro (description, quotes, status, video)
public/members/*.jpg         fotos dos membros
public/site.webmanifest      manifest do PWA
scripts/createMemberJson.js  cria JSON para imagens novas (chokidar)
Dockerfile, deploy.sh        caminhos de deploy
```

## Verificação

Não há testes automatizados neste repositório (nem CI). Os portões que existem hoje:

- `pnpm lint`: ESLint com `next/core-web-vitals`, sem avisos nem erros.
- `pnpm build`: compila a aplicação e roda o lint durante o build.

Verificação manual usada nesta auditoria:

```bash
pnpm install --frozen-lockfile        # exit 0
pnpm lint                             # No ESLint warnings or errors
pnpm build                            # exit 0, rotas / e /api/members
PORT=4317 pnpm start                  # sobe o build de produção
curl -o /dev/null -w '%{http_code}\n' http://localhost:4317/                 # 200
curl -s http://localhost:4317/api/members | python3 -m json.tool | head      # 200, 14 membros
curl -o /dev/null -w '%{http_code}\n' 'http://localhost:4317/_next/image?url=%2Fmembers%2FCaio.jpg&w=640&q=75'   # 200

pnpm start -p 4321                    # porta pela flag, sem variável de ambiente
curl -o /dev/null -w '%{http_code}\n' http://localhost:4321/                 # 200

docker build -t site-zona . && docker run -p 4319:3000 site-zona
curl -o /dev/null -w '%{http_code}\n' http://localhost:4319/                 # 200
```

## Estado atual e limitações

- Sem suíte de testes e sem CI configurada.
- Sem licença definida no repositório.
- A API lista apenas membros com imagem. Hoje há 20 JSONs em `data/members` e 14 imagens em `public/members`: Helinho, José, Lele, Petiti, Tom e o `exemplo.json` não aparecem no site.
- Arquivos referenciados nos metadados que não existem no repositório (respondem 404): `/og-image.jpg`, `/twitter-image.jpg`, `/android-chrome-192x192.png`, `/android-chrome-512x512.png` e `/favicon.ico`. O `site.webmanifest` existe mas não é referenciado no layout.
- `metadata.verification` traz códigos de exemplo (`adicione_seu_codigo_de_verificacao`) no `layout.jsx`.
- O modal de confirmação de idade do card da milannez nunca aparece: o componente testa `'millanez'` (com dois "l") e o arquivo do membro é `milannez`.
- `react-masonry-css` está nas dependências mas não é importado em lugar nenhum.
- Não existe rota por membro, busca nem paginação; a home sempre renderiza todos os membros (hoje cerca de 110 KB de HTML).
- Os dados são mantidos por commit: adicionar ou editar membro exige alterar imagem e JSON no repositório.

## Documentação

Não há documentação interna além deste README. Os comentários relevantes estão no próprio código (`app/api/members/route.js`, `scripts/createMemberJson.js`).

## Licença

Sem licença definida. O repositório é público, mas não há arquivo `LICENSE` declarando os termos de uso.
