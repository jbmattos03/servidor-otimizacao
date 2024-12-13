const questionController = require('../Controllers/QuestionController');
const callPythonFunction = require('../Middleware/PythonFunction');

const qRoutes = () => {
    app.post('/new-question', questionController.newQuestion);
    app.post('/process-input', questionController.answerQuestion);
}

export default qRoutes; // Export routes to server
