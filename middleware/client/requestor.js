const Marshaller = require("../mashaller");
class Requestor {
    constructor(clientRequestHandler) {
      this.clientRequestHandler = clientRequestHandler;
    }
  
    sendRequest(methodName, params) {
      const marshaller = new Marshaller();
      const request = marshaller.marshal(methodName, params);
      return this.clientRequestHandler.send(request);
    }
  }

module.exports = Requestor;