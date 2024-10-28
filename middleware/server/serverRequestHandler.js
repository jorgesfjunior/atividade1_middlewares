const dgram = require('dgram');

class ServerRequestHandler {
  constructor(invoker) {
    this.invoker = invoker;
  }

  handle(data, rinfo, server) {
    // Converte os dados recebidos em string
    const request = data.toString();
    console.log("SRH: " + request);
    console.log("Cliente IP: " + rinfo.address + ", Porta: " + rinfo.port);

    // Processa a requisição via Invoker
    const result = this.invoker.handleRequest(request);
    const response = Buffer.from(JSON.stringify(result)); // UDP espera um Buffer para enviar

    // Envia a resposta de volta ao cliente usando o socket UDP (server)
    server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error('Erro ao enviar a resposta:', err);
      } else {
        console.log('Resposta enviada ao cliente:', response.toString());
      }
    });
  }
}

module.exports = ServerRequestHandler;
