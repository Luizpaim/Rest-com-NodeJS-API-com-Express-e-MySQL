//importando arquivos exportados
const Atendimento = require("../models/atendimentos");
//Rota para listar todos atendimentos
module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista(res);
  });
  //Rota para lista um atendimento por Id
  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.buscarPorId(id, res);
  });
  //Rota para cadastrar um atendimento
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento, res);
  });
  //Rota para alterar determinado atendimento
  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  });
  //rota para deletar um atendimento
  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.deleta(id, res);
  });
};
