const questionController = require('../Controllers/QuestionController');
const callPythonFunction = require('../Middleware/PythonFunction');

const qRoutes = () => {
    // Rotas públicas
    app.post('/new-question', questionController.newQuestion);
    app.post('/process-input', questionController.answerQuestion);
}

export default qRoutes; // Exportar rotas para servidor
