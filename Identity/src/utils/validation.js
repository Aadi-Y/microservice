const Joi = require("joi");

function validateRegistration(data){
    const schema = Joi.schema({
        userName:Joi.string().min(3).max(50).required(),
        email:Joi.string().unique().email().required(),
        password:Joi.string().required()
    })

    return schema.validate(data);
}

module.exports = validateRegistration