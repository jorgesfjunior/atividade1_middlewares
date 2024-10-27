class ServerRequestHandler {
  constructor(invoker) {
    this.invoker = invoker;
  }

  handle(socket, data) {
    const request = data.toString(); // Converte os dados recebidos em string
    const result = this.invoker.handleRequest(request);  // Processa a requisição via Invoker
    console.log("RESULT: ", result);
    const response = JSON.stringify(result);

    // Envia a resposta de volta ao cliente
    socket.write(response, (err) => {
      if (err) {
        console.error('Erro ao enviar a resposta:', err);
      } else {
        console.log('Resposta enviada ao cliente:', response);
      }
    });
  }
}

module.exports = ServerRequestHandler;