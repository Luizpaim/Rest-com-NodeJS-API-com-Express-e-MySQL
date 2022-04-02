import {customExpress} from "./config/customExpress";
import { conexao } from "./infraestrutura/conexao";
import {tabelas} from "./infraestrutura/tabelas";

conexao.connect((error) => {
  if (error) {
    console.log(error)
  }
  else {
    console.log("Conectado com sucesso")
    /**Criando tabelas */
    tabelas.init(conexao)
    /**Instanciando express */
    const app = customExpress()
    /**Levantando servidor */
    app.listen(3000, () => console.log("servidor rodando na porta 30000"))
  }
});
