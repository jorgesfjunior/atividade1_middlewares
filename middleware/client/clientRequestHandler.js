const dgram = require('dgram');

class ClientRequestHandler {
  constructor(serverHost = 'localhost', serverPort = 3000) {
    this.serverHost = serverHost;
    this.serverPort = serverPort;
    this.client = dgram.createSocket('udp4');
  }

  send(request) {
    return new Promise((resolve, reject) => {
      
      const message = Buffer.from(request);

      // Envia a mensagem para o servidor UDP
      this.client.send(message, this.serverPort, this.serverHost, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Mensagem enviada ao servidor:', message.toString());
        }
      });

      // Escuta a resposta do servidor
      this.client.on('message', (response) => {
        const responseMessage = response.toString();
        resolve(JSON.parse(responseMessage));  // Deserializa a resposta
        this.client.close();  // Fecha o socket depois de receber a resposta
      });
    });
  }
}
module.exports = ClientRequestHandler;