const Question = require('../Models/Question');
const {PythonFunction} = require('../Middleware/PythonFunction');

class QuestionService {
    static async newQuestion(user, question, answer) {
        const newQuestion = await Question.create({
            user,
            question,
            answer,
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

    static async getAllQuestions() {
        const questions = await Question.findAll();

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

        const answer = await QuestionService.PythonFunction(question.values.question);
        const answeredQuestion = await Question.update({answer: answer}, {where: {id: questionId}});

        return answeredQuestion;
    }
}