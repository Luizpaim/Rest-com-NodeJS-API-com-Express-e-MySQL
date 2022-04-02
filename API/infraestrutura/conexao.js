//importando bibliotecas
const mysql = require("mysql");

//Criando metodo para conexão a base
const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dieinblue*19",
  database: "agenda-petshop",
});

module.exports = conexao;
