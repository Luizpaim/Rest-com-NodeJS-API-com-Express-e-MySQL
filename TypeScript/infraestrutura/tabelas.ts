import { conexao } from "./conexao";

class Tabelas {
  public conexao = conexao;

  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimentos();
    console.log("tabelas foram chamadas");
  }

  criarAtendimentos() {
    /**query sql para criar tabelas */
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY(id))`;

    /**metodo para criar tabela */
    conexao.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("TABELA ATENDIMENTOS CRIADA COM SUCESSO");
      }
    });
  }
}
export const tabelas = new Tabelas()
