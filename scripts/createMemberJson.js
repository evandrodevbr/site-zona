const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'members');
const JSON_DIR = path.join(process.cwd(), 'data', 'members');

// Certifica-se de que os diretórios existem
if (!fs.existsSync(JSON_DIR)) {
    fs.mkdirSync(JSON_DIR, { recursive: true });
}

// Template para novos membros
const createMemberTemplate = (imageName) => ({
    name: path.parse(imageName).name,
    description: "Ainda não tem pérolas registradas",
    image: imageName,
    status: "online",
    quotes: []
});

// Função para criar JSON se não existir
const createJsonIfNeeded = (imagePath) => {
    const imageName = path.basename(imagePath);
    const jsonName = path.parse(imageName).name + '.json';
    const jsonPath = path.join(JSON_DIR, jsonName);

    // Verifica se o arquivo é uma imagem
    if (!['.jpg', '.jpeg', '.png'].includes(path.extname(imagePath).toLowerCase())) {
        return;
    }

    // Se o JSON já existe, não faz nada
    if (fs.existsSync(jsonPath)) {
        return;
    }

    // Cria o novo JSON
    const memberData = createMemberTemplate(imageName);
    fs.writeFileSync(jsonPath, JSON.stringify(memberData, null, 2));
    console.log(`Created JSON for ${imageName}`);
};

// Processa imagens existentes
fs.readdirSync(IMAGES_DIR).forEach(file => {
    createJsonIfNeeded(path.join(IMAGES_DIR, file));
});

// Monitora novos arquivos
const watcher = chokidar.watch(IMAGES_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

watcher
    .on('add', createJsonIfNeeded)
    .on('ready', () => console.log('Initial scan complete. Watching for new images...')); 