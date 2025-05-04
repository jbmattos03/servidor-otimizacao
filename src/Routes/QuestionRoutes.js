import questionController from "../Controllers/QuestionController.js"; // Importar controller
import callPythonFunction from "../Middleware/PythonFunction.js";
import auth from "../Middleware/Auth.js"; // Importar middleware de autenticação

const questionRoutes = (app) => {
    // Rotas protegidas
    app.post("/new-question", auth, questionController.newQuestion);
    app.post("/answer-question/:id", auth, questionController.answerQuestion);
    app.post("/delete-question", auth, questionController.deleteQuestion);
    app.get("/all-questions", auth, questionController.getAllQuestionsByUser);
    app.get("/question/:id", auth, questionController.getQuestionById);
}

// Requisições HTTP:
//     POST: criar novo recurso no servidor
//     GET: obter um recurso do servidor
//     PUT: atualizar um recurso no servidor

export default questionRoutes; // Exportar rotas para servidor
