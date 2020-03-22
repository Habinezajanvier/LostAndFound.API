import Joi from '@hapi/joi';

export const foundsValidation =(req, res, next) =>{
    const schema = Joi.object({
        documentType: Joi.string().required(),
        documentNumber: Joi.string().min(7),
        ownerName: Joi.string().required(),
        ownerPhoneNumber: Joi.string().min(10),
        foundName: Joi.string().min(4).required(),
        foundPhoneNumber: Joi.string().min(10).required(),
        foundEmail: Joi.string().email(),
        location: Joi.string().min(4),
        reward: Joi.boolean()
    });

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next();
};

export const lostsValidation =(req, res, next) =>{
    const schema = Joi.object({
        documentType: Joi.string().required(),
        documentNumber: Joi.string().min(7),
        ownerName: Joi.string().required(),
        ownerPhoneNumber: Joi.string().min(10).required(),
        ownerEmail: Joi.string().email(),
        location: Joi.string().min(4),
        reward: Joi.boolean()
    });

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});
    next();
};

