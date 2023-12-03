import Joi from "joi";

const productValidatior =Joi.object({
  name: Joi.string().required().min(6).max(255),
  price: Joi.number().required().min(1),
  desc: Joi.string().required()
})

export default productValidatior