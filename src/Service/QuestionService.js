import Question from "../Models/QuestionModel.js"; 
import callPythonFunction from "../Middleware/PythonFunction.js";

class QuestionService {
    static async newQuestion(user, qtd_var_obj, qtd_res_des, matriz, answer) {
        const newQuestion = await Question.create({
            user,
            qtd_var_obj,
            qtd_res_des,
            matriz,
            answer,
            status: 0,
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
        const questions = await Question.findAll({where: {user: id}});

        if(!questions) {
            throw new Error("No questions found");
        }

        return questions;
    }

    static async getAnsweredQuestionsByUser(id) {
        const questions = await QuestionService.getAllQuestionsByUser(id);

        return questions;
    }

    static async deleteQuestion(questionId) {
        const question = await QuestionService.getQuestionById(questionId);

        await Question.destroy({ where: { id: questionId } });
    }

    static async answerQuestion(questionId) {
        const question = await QuestionService.getQuestionById(questionId);

        //if (question.isAnswered === 1) {
           // throw new Error("Question already answered");
        //}

        const answer = await callPythonFunction({
            qtd_var_obj: question.qtd_var_obj,
            qtd_res_des: question.qtd_res_des,
            matriz: question.matriz,
        });

        const answeredQuestion = await Question.update(
            { answer: answer, isAnswered: 1 }, 
            { where: { id: questionId } }
        );

        return answeredQuestion;
    }
}

export default QuestionService;