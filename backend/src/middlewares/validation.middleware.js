import Joi from "joi";
import { ApiError } from "../utils/ApiError.js";

const registerUserValidation = (req, res, next) => {
  //name, email, password, role
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    //role: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};
const loginUserValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};

export { registerUserValidation, loginUserValidation };
