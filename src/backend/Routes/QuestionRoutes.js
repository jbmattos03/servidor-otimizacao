import QuestionController from "../Controllers/QuestionController.js"; // Importar controller
import auth from "../Middleware/Auth.js"; // Importar middleware de autenticação

const questionRoutes = (app) => {
    // Rotas protegidas
    app.get("/questions", auth, QuestionController.getAllQuestionsByUser);
    app.get("/questions/answered", auth, QuestionController.getAnsweredQuestionsByUser);
    app.post("/questions/new-question", auth, QuestionController.newQuestion);
    app.post("/questions/answer-question/:id", auth, QuestionController.answerQuestion);
    app.post("/questions/delete-question/:id", auth, QuestionController.deleteQuestion);
    app.get("/questions/:id", auth, QuestionController.getQuestionById);
}

// Requisições HTTP:
//     POST: criar novo recurso no servidor
//     GET: obter um recurso do servidor
//     PUT: atualizar um recurso no servidor

export default questionRoutes; // Exportar rotas para servidor
