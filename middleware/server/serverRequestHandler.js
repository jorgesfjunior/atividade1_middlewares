const dgram = require('dgram');
const server = dgram.createSocket('udp4');

class ServerRequestHandler {
  constructor(invoker) {
    this.invoker = invoker;
  }

  handle(msg, rinfo) {
    const request = msg.toString();
    const result = this.invoker.handleRequest(request);  // Processa a requisição via Invoker
    const response = JSON.stringify(result);

    // Envia a resposta de volta ao cliente
    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error('Erro ao enviar a resposta:', err);
      } else {
        console.log('Resposta enviada ao cliente:', response);
      }
    });
  }
}


module.exports = ServerRequestHandler;

