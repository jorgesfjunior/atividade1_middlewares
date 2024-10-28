const express = require('express');
const app = express();
const Invoker = require("../../middleware/server/invoker");
const ServerRequestHandler = require("../../middleware/server/serverRequestHandler");
const net = require('net'); // Importa o módulo net para TCP
const fs = require('fs');
const path = require('path');

app.use(express.json());

function criarArquivoSync(nomeArquivo, conteudo) {
    const pasta = path.join(__dirname, 'archives');

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    const caminhoCompleto = path.join(pasta, nomeArquivo);

    try {
        fs.writeFileSync(caminhoCompleto, conteudo);
        console.log(`Arquivo "${nomeArquivo}" criado com sucesso!`);
        return "TUDO CERTO!";
    } catch (err) {
        console.error('Erro ao criar o arquivo:', err);
        return "ERRO!";
    }
}

async function excluirArquivo(nomeArquivo) {
    const pasta = path.join(__dirname, 'archives');

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    const caminhoCompleto = path.join(pasta, nomeArquivo);

    try {
        if (!caminhoCompleto) {
            throw new Error('O nome do arquivo deve ser fornecido.');
        }

        await fs.promises.unlink(caminhoCompleto);
        console.log(`Arquivo "${nomeArquivo}" excluído com sucesso!`);
        return "TUDO CERTO!";
    } catch (err) {
        console.error('Erro ao excluir o arquivo:', err.message);
        return "ERRO!";
    }
}

async function atualizarConteudoArquivo(nomeArquivo, novoConteudo) {
    const pasta = path.join(__dirname, 'archives');

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    const caminhoCompleto = path.join(pasta, nomeArquivo);

    try {
        if (!caminhoCompleto) {
            throw new Error('O nome do arquivo deve ser fornecido.');
        }

        await fs.promises.writeFile(caminhoCompleto, novoConteudo);
        console.log(`Arquivo "${nomeArquivo}" atualizado com sucesso!`);
        return "ok!";
    } catch (err) {
        console.error('Erro ao atualizar o arquivo:', err.message);
        return "erro!";
    }
}

const service = {
    createFile: (a, b) => criarArquivoSync(a, b),
    deleteFile: (a) => excluirArquivo(a),
    attFile: (a, b) => atualizarConteudoArquivo(a, b)
};

const invoker = new Invoker(service);
const serverRequestHandler = new ServerRequestHandler(invoker);

// Cria um servidor TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    // Quando dados são recebidos
    socket.on('data', (data) => {
        console.log(`Mensagem recebida do cliente: ${data}`);
        serverRequestHandler.handle(socket, data); // Chama o handler com o socket e os dados recebidos
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    socket.on('error', (err) => {
        console.error('Erro no socket:', err.message);
    });
});

// Inicia o servidor TCP na porta 3000
server.listen(3000, () => {
    console.log('Servidor TCP rodando na porta 3000');
});
