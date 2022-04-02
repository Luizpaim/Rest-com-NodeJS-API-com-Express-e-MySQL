import { Request, Response, Router } from "express";
import { atendimentos } from "../models/atendimentos";
import { customExpress } from "../config/customExpress";

const router = Router();
/**Rota para listar todos atendimentos */
router.get("/atendimentos", (req: Request, res: Response) => {
  atendimentos.lista(res);
});
/**Rota para listar um atendimento por Id */
router.get("/atendimentos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  atendimentos.buscarPorId(id, res);
});
/**Rota para cadastrar um atendimento */
router.post("/atendimentos", (req: Request, res: Response) => {
  const atendimento = req.body;
  atendimentos.adiciona(atendimento, res);
});
/** Rota para alterar determinado atendimento */
router.patch("/atendimentos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const valores = req.body;
  atendimentos.altera(id, valores, res);
});
/**Rota para deletar um atendimento */
router.delete("/atendimentos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  atendimentos.deleta(id, res);
});

export { router };
