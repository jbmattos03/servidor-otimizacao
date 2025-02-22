import Question from "../Models/QuestionModel.js";
import QuestionService from "../Service/QuestionService.js";
import callPythonFunction from "../Middleware/PythonFunction.js";

class QuestionController {
    static async newQuestion(req, res) {
        const user = req.user;
        const { question, answer } = req.body;

        try {
            const newQuestion = await QuestionService.newQuestion(user, question, answer);

            return res.status(201).json(newQuestion);
        } catch (error) {
            return res.status(500).json({ message: "Error creating question" });
        }
    }

    static async getQuestionById(req, res) {
        const questionId = req.params.id;

        try {
            const question = await QuestionService.getQuestionById(questionId);

            return res.status(200).json(question);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving question" });
        }
    }

    static async getAllQuestionsByUser(req, res) {
        try {
            const questions = await QuestionService.getAllQuestions(req.params.userId);

            return res.status(200).json(questions);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving questions" });
        }
    }

    static async deleteQuestion(req, res) {
        const questionId = req.params.id;

        try {
            await QuestionService.deleteQuestion(questionId);

            return res.status(204).json({ message: "Question deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting question" });
        }
    }

    static async answerQuestion(req, res) {
        const questionId = req.params.id;

        try {
            const answeredQuestion = await QuestionService.answerQuestion(questionId);

            return res.status(204).json(answeredQuestion);
        } catch (error) {
            return res.status(500).json({ message: "Error answering question" });
        }
    }

    static async getAnsweredQuestionsByUser(req, res) {
        try {
            const questions = await QuestionService.getAnsweredQuestionsByUser();

            return res.status(200).json(questions);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving questions" });
        }
    }



}

export default QuestionController;