//importando arquivos exportados
const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

//Chamando metodo para conectar a nossa base
conexao.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Conectado com sucesso");
    //Criando Tabelas
    Tabelas.init(conexao);
    //instancia objeto express
    const app = customExpress();
    //Levantando servidor
    app.listen(3000, () => console.log("servidor rodando na porta 3000"));
  }
});
