import Question from "../Models/QuestionModel.js"; 
import callPythonFunction from "../Middleware/PythonFunction.js";

class QuestionService {
    static async newQuestion(user, modo, qtd_var_obj, qtd_res_des, matriz, answer) {
        const newQuestion = await Question.create({
            userId: user,
            modo: modo,
            qtd_var_obj,
            qtd_res_des,
            matriz,
            answer,
            isAnswered: 0,
        });

        return newQuestion;
    }

    static async getQuestionById(questionId) {
        const question = await Question.findByPk(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        return question;
    }

    static async getAllQuestionsByUser(id) {
        const questions = await Question.findAll({ where: { userId: id } });

        if (questions.length === 0) {
            throw new Error("No questions found");
        }

        return questions;
    }

    static async getAnsweredQuestionsByUser(id) {
        const questions = await QuestionService.getAllQuestionsByUser(id);
        const answeredQuestions = questions.filter(question => question.isAnswered === true);

        if (answeredQuestions.length === 0) {
            throw new Error("No answered questions found");
        }

        return questions;
    }

    static async deleteQuestion(questionId) {
        const question = await QuestionService.getQuestionById(questionId);

        await Question.destroy({ where: { id: questionId } });
    }

    static async answerQuestion(questionId) {
        const question = await QuestionService.getQuestionById(questionId);

        const answer = await callPythonFunction({
            modo: question.modo,
            qtd_var_obj: question.qtd_var_obj,
            qtd_res_des: question.qtd_res_des,
            matriz: question.matriz,
        });

        // Atualizar a questão com a resposta
        await Question.update(
            { answer: answer, isAnswered: 1 }, 
            { where: { id: questionId } }
        );

        // Retornar a questão atualizada
        const answeredQuestion = await QuestionService.getQuestionById(questionId);

        return answeredQuestion.answer;
    }
}

export default QuestionService;