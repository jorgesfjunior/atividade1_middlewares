class ClientRequestHandler {
    async send(request) {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        body: request,
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    }
  }

module.exports = ClientRequestHandler;