import express from "express";
import UserController from "../Controllers/UserController.js";
import auth from "../Middleware/Auth.js";

const userRoutes = (app) => {
    // Rotas públicas
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    app.post("/request-password-reset", UserController.requestPasswordReset);
    app.put("/reset-password/:token", UserController.resetPassword);

    // Rotas protegidas
    app.put("/update/:id", auth, UserController.update);
    app.get("/profile", auth, UserController.getUserProfile);
    app.get("/:id", auth, UserController.getUserById);
}

// Requisições HTTP:
//     POST: criar novo recurso no servidor
//     GET: obter um recurso do servidor
//     PUT: atualizar um recurso no servidor

export default userRoutes; // Exportar rotas para o servidor