import express from "express";
const userRoutes = require("./Routes/UserRoutes");

const app = express();
routes(app); // Passar servidor para as rotas

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
