class ServerRequestHandler {
    constructor(invoker) {
      this.invoker = invoker;
    }
  
    handle(req, res) {
      const result = this.invoker.handleRequest(JSON.stringify(req.body));
      res.json(result);
    }
  }

module.exports = ServerRequestHandler;