import express from "express";
const UserController = require('../Controllers/UserController');
const auth = require('../Middleware/Auth');

const routes = (app) => {
    // Public routes
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);

    // Protected routes
    app.put('/update/:id', auth, UserController.update);
    app.get('/profile', auth, UserController.getUserProfile);
    app.get('/:id', auth, UserController.getUserById);
}

export default routes; // Exportar rotas para o servidor