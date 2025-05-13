import QuestionService from "../Service/QuestionService.js";

class QuestionController {
    static async newQuestion(req, res) {
        const userId = req.user.id;
        const { qtd_var_obj, qtd_res_des, matriz, answer } = req.body;

        // Verifica se o usuário inseriu os dados necessários
        if (!qtd_var_obj || !qtd_res_des || !matriz) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const newQuestion = await QuestionService.newQuestion(
                userId, 
                qtd_var_obj,
                qtd_res_des,
                matriz,
                answer,
            );

            return res.status(201).json(newQuestion);
        } catch (error) {
            return res.status(500).json({ message: "Error creating question:", error: error.message });
        }
    }

    static async getQuestionById(req, res) {
        const questionId = req.params.id;

        try {
            const question = await QuestionService.getQuestionById(questionId);

            return res.status(200).json(question);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving question:" });
        }
    }

    static async getAllQuestionsByUser(req, res) {
        const userId = req.user.id;
        
        try {
            const questions = await QuestionService.getAllQuestionsByUser(userId);

            return res.status(200).json(questions);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving questions " });
        }
    }

    static async deleteQuestion(req, res) {
        const questionId = req.params.id;

        try {
            await QuestionService.deleteQuestion(questionId);

            return res.status(200).json({ message: "Question deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting question" });
        }
    }

    static async answerQuestion(req, res) {
        const questionId = req.params.id;

        try {
            const answeredQuestion = await QuestionService.answerQuestion(questionId);

            return res.status(200).json(answeredQuestion);
        } catch (error) {
            return res.status(500).json({ message: "Error answering question" });
        }
    }

    static async getAnsweredQuestionsByUser(req, res) {
        const userId = req.user.id;

        try {
            const questions = await QuestionService.getAnsweredQuestionsByUser(userId);

            return res.status(200).json(questions);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving questions", error: error.message });
        }
    }
}

export default QuestionController;