import { sequelize } from "./src/DB";
import server from "./src/app";
sequelize
  .sync({ force: true, logging: false }) // logging : imprime o no imprime mensajes de registro.
  .then(() => {
    console.log("base de datos conectada! :D");
    server.listen(3001, function () {
      console.log("server is listening on port 3001!");
    });
  })
  .catch((err) => console.error(err));

// todo esto sigue igual que antes..
