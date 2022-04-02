//importando bibliotecas
const { query } = require("express");
const moment = require("moment");
//importando arquivos exportados
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  //metodo para adicionar
  adiciona(atendimento, res) {
    //fazendo formatação da data com moment
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    //metodo para validar de a data de criação é maisor que a data atual
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    //metodo para validar quantidade de caracteres em nome cliente
    const clienteEhValido = atendimento.cliente.length >= 3;

    //Array com objetos de cada validação
    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual.",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres.",
      },
    ];

    //validando campos de validação
    const erros = validacoes.filter((campo) => !campo.valido);
    //verificando se existe erros
    const existemErros = erros.length;
    //verifica erros e efetua processo de criação
    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      const sql = "INSERT INTO Atendimentos SET ?";

      conexao.query(sql, atendimentoDatado, (error, resultados) => {
        resultados = {
          data: "O Atendimento foi agendado com sucesso.",
          atendimento: atendimentoDatado,
        };
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  }
  //metodo para listar todos atendimentos
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
  //metodo para buscar apenas um  atendimento pelo ID
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

  //metodo para alterar um atendimento
  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = " UPDATE Atendimentos SET ? WHERE id=?";
    conexao.query(sql, [valores, id], (error, resultados) => {
      resultados = {
        data: "O Atendimento foi alterado com sucesso.",
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

  //metodo para deletar um atendimento
  deleta(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";
    conexao.query(sql, id, (error, resultados) => {
      resultados = {
        data: "O Atendimento foi Deletado com sucesso.",
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

module.exports = new Atendimento();
