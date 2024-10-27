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

app.get('/experiment', async function(req,res){

  function pausa(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const nome = "teste1.txt";
  const data = "Gcz2BrWcsE1POwRmTqFOqgZEmWRyRlRHKzPoB9OFfDWdnVW3WQfZ9ikAb5KnCmOaMv5z3hY0IJmbh8SejClNzNhXgB41SE3Ym1wNTzhwviXtVmHiVCzME2Oj2O6Y5wbcNm0ENJrsjhvIQfby1FtwIhxXvlGh7ed6H4kMriPK4ZCXJfbsLeXKcBeayQFZ8NOCbwRgMm7u0fGZ3bvPgsnvG8JZLFr8BQDTxlgzIusx3uv7aD1j4LQzDBQmnl9MSKJuzQFQ4TT2thtmQczxiEG5TT0WAIQGFPy3E7Fwvh7TUSnsOx9Ltth6SOQyxnvSbUnYshBhcncDqD4v3TSdjAWYmDBqREKYyswm6Z5gAg8BDXePiXFW6NlyKwE1G8TKxtZxGVyyi7NzC1blSZTH3kcTngHz0rnSBFe52XhddGoFL7oSN14ZztxdElHJ5UxzWPIv1qgrNoaHbwtGxD25KNnlHJIO0HTDAAKwTPFDzBqO5ukd7umC2nd76b2WddHgmsOtKMUXzz9gVbSwkb9AOCZtf6V7SlpjfW0jPWoP7AbCayP3UrD64f6dKP84FV7qDOX5IkGMcSzEZa8ZWwRuGnpxGpeEPYNFhLVHZrxW23uPd4gE0J4BL7dVNsULCHnGbyOKbHrfGTXmjN1BodcXw96TvIWejhcFToU7Kr9MOG6EvNL98vSDC5tYGsYBa7AieYWgfRNdQb4bcS0aRm6D1Tw4fb7wupfNPSGH1JQKTG6l8KDFXTn1cPtqJtFfwSB0CLmGYSeI59vWyEwxl8MMY7KEQSKy1ocgG2eLRHhYHQ9uDiZnU9cAo5Nkn4hx52nxYyXTHqyxm1axmEzGXDsOBIz6woHPS1QZjIupzEXu5hxjK2Mj5F9fhKuTYHoDrJeaWYB9tTMgOc7zM8xIdXduX92zOqqMtx6nmXnbXPiLo5sXJ4pLp1VDJ0m0iAl3Xfh48S9c47Uw0vFCKvCUJdKH4P96bWL0KN0LRhD9Baxp1avWUSJUtvc0vwF6HhZrd3zzfnNN73y6Lfw7Bq5GZq5CKmRRYAhjfwzi3PTGkXTwSvMdbYk7f1VrGYIEOsTZCrqk94CMgMi8uS5onMBPQ2Z6OzHkTqZKiMrpLOwQ4NVyzoAFlO9PbdhGMoHx6fKBlOBE2tcQXZRYE";

  for(let i = 0; i<100; i++) {
    console.log(i);
    createFile(nome, data);
    await pausa(100);
    updateFile(nome, data);
    await pausa(100);
    deleteFile(nome);
    await pausa(100);
  }
  res.send("Experimento Concluído");
});



app.listen(8080,function(){
  console.log("Servidor ativo na porta 8080");
});

