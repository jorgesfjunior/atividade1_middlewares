const express = require('express');
const app = express();
const Invoker  = require("../../middleware/server/invoker");
const ServerRequestHandler = require("../../middleware/server/serverRequestHandler");
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

app.use(express.json());


const service = {
  add: (a, b) => a + b,  // Adicione outros métodos remotos conforme necessário
  subtract: (a, b) => a - b
};
  
  const invoker = new Invoker(service);
  const serverRequestHandler = new ServerRequestHandler(invoker);
  
  server.on('message', (msg, rinfo) => {
    console.log(`Mensagem recebida do cliente: ${msg} de ${rinfo.address}:${rinfo.port}`);
    serverRequestHandler.handle(msg, rinfo);  // Processa a mensagem recebida
  });
  
  server.bind(3000, () => {
    console.log('Servidor UDP rodando na porta 3000');
  });