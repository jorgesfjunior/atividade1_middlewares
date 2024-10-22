
const Marshaller = require("../mashaller");
class Invoker {
    constructor(service) {
      this.service = service;
    }
  
    handleRequest(request) {
      const marshaller = new Marshaller();
      const { method, args } = marshaller.unmarshal(request);
      return this.service[method](...args);
    }
  }

  module.exports = Invoker;