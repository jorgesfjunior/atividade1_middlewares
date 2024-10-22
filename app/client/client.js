// Função que inicializa o cliente e faz a chamada
const ClientRequestHandler = require("../../middleware/client/clientRequestHandler");
const Requestor = require("../../middleware/client/requestor");
const ClientProxy = require("../../middleware/client/clientProxy");

async function main() {
    // Instancia o Client Request Handler
    const clientRequestHandler = new ClientRequestHandler();
  
    // Instancia o Requestor passando o Client Request Handler
    const requestor = new Requestor(clientRequestHandler);
  
    // Instancia o Client Proxy passando o Requestor
    const proxy = new ClientProxy(requestor);
  
    // Definir o método e os argumentos que serão chamados no servidor
    //const methodName = 'createFile';  // nome do método remoto, exemplo: 'add' para somar dois números
    //const args = ['teste', 'tgeste'];     // argumentos a serem passados para o método remoto
    //const methodName = 'deleteFile';
    //const args = ['teste'];
    const methodName = 'attFile';
    const args = ['teste', 'tgesteatt'];

    try {
      // Invoca o método remoto passando o nome e os argumentos
      const result = await proxy.invoke(methodName, ...args);
      console.log(`Resultado da chamada remota (${methodName}):`, result);
    } catch (error) {
      console.error("Erro ao invocar o método remoto:", error);
    }
  }
  
  // Executa o cliente
  main();