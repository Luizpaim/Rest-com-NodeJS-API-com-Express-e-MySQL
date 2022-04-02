class Tabelas {
  //Chamando tabelas
  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimentos();
    console.log("Tabelas foram chamadas");
  }

  criarAtendimentos() {
    //query sql para criar tabela
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY(id))`;
    // metodo para criar tabela
    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Tabela Atendimentos criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
