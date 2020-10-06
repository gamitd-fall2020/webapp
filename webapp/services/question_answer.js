const db = require('../database/sequelize');
const v4 = require('uuidv4');
const Question = db.question;
const Category = db.category;
const Answer = db.answer;

const findAllQuestions = async () => {

    const questions = await Question.findAll({
        include: [
            {
                 as: 'categories',
                 model: Category,
                 through: {
                     attributes: []
                 }
            }, 
            {
                 as: 'answers',
                 model: Answer
            }
        ]
    });

    return questions;
}

const findQuestionById = async (id) => {

    const question = await Question.findOne({
        where: {question_id: id }, 
        include: [
            {
                 as: 'categories',
                 model: Category,
                 through: {
                     attributes: []
                 }
            }, 
            {
                 as: 'answers',
                 model: Answer
            }
        ]
    });

    return question;

}

const findAnswerById = async (answer_id, question_id) => {

    const answer = await Answer.findOne({
        where: {answer_id, question_id }, 
    });

    return answer;

}


module.exports = {findQuestionById, findAllQuestions, findAnswerById};