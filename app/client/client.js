// Função que inicializa o cliente e faz a chamada
const ClientRequestHandler = require("../../middleware/client/clientRequestHandler");
const Requestor = require("../../middleware/client/requestor");
const ClientProxy = require("../../middleware/client/clientProxy");
var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


const clientRequestHandler = new ClientRequestHandler();
  
    // Instancia o Requestor passando o Client Request Handler
const requestor = new Requestor(clientRequestHandler);
  
    // Instancia o Client Proxy passando o Requestor
const proxy = new ClientProxy(requestor);
  
// Definir o método e os argumentos que serão chamados no servidor
//const methodName = 'createFile';  // nome do método remoto, exemplo: 'add' para somar dois números
//const args = ['teste', 'tgeste'];     // argumentos a serem passados para o método remoto

async function createFile(name, data) {
  
  const methodName = 'createFile';  // nome do método remoto, exemplo: 'add' para somar dois números
  const args = [name, data]; 
  
  try {
    // Invoca o método remoto passando o nome e os argumentos
    const result = await proxy.invoke(methodName, ...args);
    console.log(`Resultado da chamada remota (${methodName}):`, result);
  } catch (error) {
    console.error("Erro ao invocar o método remoto:", error);
  }
}

async function updateFile(name, data) {
  
  const methodName = 'attFile';  // nome do método remoto, exemplo: 'add' para somar dois números
  const args = [name, data]; 
  
  try {
    // Invoca o método remoto passando o nome e os argumentos
    const result = await proxy.invoke(methodName, ...args);
    console.log(`Resultado da chamada remota (${methodName}):`, result);
  } catch (error) {
    console.error("Erro ao invocar o método remoto:", error);
  }
}


async function deleteFile(name) {
  
  const methodName = 'deleteFile';  // nome do método remoto, exemplo: 'add' para somar dois números
  const args = [name]; 
  
  try {
    // Invoca o método remoto passando o nome e os argumentos
    const result = await proxy.invoke(methodName, ...args);
    console.log(`Resultado da chamada remota (${methodName}):`, result);
  } catch (error) {
    console.error("Erro ao invocar o método remoto:", error);
  }
}




app.get('/',function(req,res){
  res.render("index");
});

app.post('/create', function(req,res){
  const nome = req.body.name;
  const data = req.body.data;
  createFile(nome, data);
  res.render("resultado", {name: nome, data: data, method: "criado"});
});


app.post('/update', function(req,res){
  const nome = req.body.name;
  const data = req.body.data;
  updateFile(nome, data);
  res.render("resultado", {name: nome, data: data, method: "atualizado"});
});

app.post('/delete', function(req,res){
  const nome = req.body.name;
  deleteFile(nome);
  res.render("resultado", {name: nome, data: null, method: "excluído"});
});


app.listen(8080,function(){
  console.log("Servidor ativo na porta 8080");
});

