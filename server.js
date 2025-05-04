import express from "express";
import userRoutes from "./src/Routes/UserRoutes.js";
import questionRoutes from "./src/Routes/QuestionRoutes.js";
import { sequelize, initializeSequelize } from "./src/Database/Database.js";

const app = express();
app.use(express.json());

userRoutes(app); // Passar servidor para as rotas de usuário
questionRoutes(app); // Passar servidor para as rotas de questões

initializeSequelize().then(() => {
  sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  }).catch(error => {
    console.log("Unable to sync with the database. ", error);
  })
}).catch(error => {
  console.log("Unable to initialize sequelize", error);
});
