const express = require('express');
const app = express();
const Invoker  = require("../../middleware/server/invoker");
const ServerRequestHandler = require("../../middleware/server/serverRequestHandler");
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const fs = require('fs');
const path = require('path');

app.use(express.json());

function criarArquivoSync(nomeArquivo, conteudo) {

  const pasta = path.join(__dirname, 'archives');

  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true }); // Cria a pasta e suas subpastas, se necessário
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
    fs.mkdirSync(pasta, { recursive: true }); // Cria a pasta e suas subpastas, se necessário
  }

  const caminhoCompleto = path.join(pasta, nomeArquivo);

  try {
    if (!caminhoCompleto) {
      throw new Error('O nome do arquivo deve ser fornecido.');
    }

    // Exclui o arquivo
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
    fs.mkdirSync(pasta, { recursive: true }); // Cria a pasta e suas subpastas, se necessário
  }

  const caminhoCompleto = path.join(pasta, nomeArquivo);

  
  try {
    if (!caminhoCompleto) {
      throw new Error('O nome do arquivo deve ser fornecido.');
    }

    // Atualiza o conteúdo do arquivo
    await fs.promises.writeFile(caminhoCompleto, novoConteudo);
    console.log(`Arquivo "${nomeArquivo}" atualizado com sucesso!`);
    return "ok!"
  } catch (err) {
    console.error('Erro ao atualizar o arquivo:', err.message);
    return "erro!";
  }
}


const service = {
  createFile: (a,b) => criarArquivoSync(a,b),
  deleteFile: (a) => excluirArquivo(a),
  attFile: (a,b) => atualizarConteudoArquivo(a,b)
};
  
  const invoker = new Invoker(service);
  const serverRequestHandler = new ServerRequestHandler(invoker);
  
  server.on('message', (msg, rinfo) => {
    console.log(`Mensagem recebida do cliente: ${msg} de ${rinfo.address}:${rinfo.port}`);
    serverRequestHandler.handle(msg, rinfo, server);  // Processa a mensagem recebida
  });
  
  server.bind(3000, () => {
    console.log('Servidor UDP rodando na porta 3000');
  });