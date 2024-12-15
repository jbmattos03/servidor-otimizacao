import express from "express";
const userRoutes = require("./Routes/UserRoutes");
const questionRoutes = require("./Routes/QuestionRoutes");

const app = express();

userRoutes(app); // Passar servidor para as rotas de usuário
questionRoutes(app); // Passar servidor para as rotas de questões

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
