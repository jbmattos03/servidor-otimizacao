import express from "express";
const UserController = require('../Controllers/UserController');
const auth = require('../Middleware/Auth');

const routes = (app) => {
    // Public routes
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    app.post('/request-password-reset', UserController.requestPasswordReset);
    app.post('/reset-password/:token', UserController.resetPassword);

    // Protected routes
    app.put('/update/:id', auth, UserController.update);
    app.get('/profile', auth, UserController.getUserProfile);
    app.get('/:id', auth, UserController.getUserById);
}

export default routes; // Exportar rotas para o servidor