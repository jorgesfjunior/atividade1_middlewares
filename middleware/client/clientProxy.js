class ClientProxy {
  constructor(requestor) {
    this.requestor = requestor;
  }

  invoke(methodName, ...args) {
    return this.requestor.sendRequest(methodName, args);
  }
}

module.exports = ClientProxy;