import Question from "../Models/QuestionModel.js"; 
import callPythonFunction from "../Middleware/PythonFunction.js";

class QuestionService {
    static async newQuestion(user, question, answer) {
        const newQuestion = await Question.create({
            user,
            question,
            answer,
            status: 0,
        });

        return newQuestion;
    }

    static async getQuestionById(questionId) {
        const question = await Question.findById(questionId);

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
        const questions = await Question.findAll({where: {user: id, status: 1}});

        if(!questions) {
            throw new Error("No questions found");
        }

        return questions;
    }

    static async deleteQuestion(questionId) {
        const question = await Question.findById(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        await Question.destroy({where: {id: questionId}});
    }

    static async answerQuestion(questionId) {
        const question = await Question.findById(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        const answer = await callPythonFunction(question.values.question);
        const answeredQuestion = await Question.update({answer: answer, status: 1}, {where: {id: questionId}});

        return answeredQuestion;
    }
}

export default QuestionService;