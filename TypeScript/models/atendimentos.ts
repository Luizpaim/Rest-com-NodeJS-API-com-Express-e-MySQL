import moment from "moment";
import { conexao } from "../infraestrutura/conexao";

class Atendimentos {
  /**metodo para adicionar */
  adiciona(atendimento, res) {
    /**fazendo formatação de data com moment */
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    /**metodo para validar se a data de criação é maior que a data atual */
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    /**metodo para validar quantidade de caracteres em nome de cliete */
    //const clienteEhValido = atendimento.cliente.lenght >= 2;

    /**Array com objetos de cada validação */
    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mesagem: "data deve ser maior ou igual a data atual",
      },
      // {
      //   nome: "cliente",
      //   valido: clienteEhValido,
      //   mensagem: "Cliente deve ter pelo menos três caracteres",
      // },
    ];

    /**validando campos de validação */
    const erros = validacoes.filter((campo) => !campo.valido);
    /**verificando se existe erros */
    const existemErros = erros.length;
    /**verifica erros e efetua processo de criação */
    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentodotado = { ...atendimento, dataCriacao, data };

      const sql = "INSERT INTO Atendimentos SET ?";
      conexao.query(sql, atendimentodotado, (error, resultados) => {
        resultados = {
          data: "O atendimento  foi agendado com sucesso",
          atendimento: atendimentodotado,
        };
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  }
  /**Metodo para listar os atendimentos */
  lista(res) {
    const sql = "SELECT * FROM Atendimentos";
    conexao.query(sql, (error, resultados) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
  /**Metodo para buscar apenas um atendimento pelo ID */
  buscarPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    conexao.query(sql, (error, resultados) => {
      const atendimento = resultados[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
  /**Metodo para alterar um atendimento */
  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = " UPDATE Atendimentos SET ? WHERE id=?";
    conexao.query(sql, [valores, id], (error, resultados) => {
      resultados = {
        data: "O Atendimento foi alterado com sucesso",
        alteracoes: id,
        valores,
      };
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
  /**Metodo para deletar um atendimento */
  deleta(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";
    conexao.query(sql, id, (error, resultados) => {
      resultados = {
        data: "O Atendimento foi deletado com sucesso",
        atendimento: id,
      };
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
}

export const atendimentos = new Atendimentos();
