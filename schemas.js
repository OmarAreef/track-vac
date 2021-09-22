const Joi = require('joi');
const { number } = require('joi');

module.exports.reviewSchema = Joi.object(
    {
        review: Joi.object({
            body: Joi.string().required(),
            location: Joi.number().required().min(1).max(5),
            clean: Joi.number().required().min(1).max(5),
            service: Joi.number().required().min(1).max(5),
            speed: Joi.number().required().min(1).max(5),
        }).required()
    }
)
module.exports.questionSchema = Joi.object(
    {
        question: Joi.object({
            question: Joi.string().required()
        }).required()
    }
)
module.exports.answerSchema = Joi.object(
    {
        answer: Joi.object({
            answer: Joi.string().required()
        }).required()
    }
)