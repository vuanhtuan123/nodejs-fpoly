import Joi from "joi";

export const userValidator = Joi.object({
  userName: Joi.string().required().min(6).max(255).message({
    "string.empty": "userName khong duoc de trong ",
    "any.requied": "userName la bat buoc",
    "string.min": "userName phai co it nhat {$limit} ky tu",
    "string.max": "username phai co it hon {$limit} ky tu"
  }),
  email: Joi.string().required().email().message({
    "string.empty": "email khong duoc de trong ",
    "any.requied": "email la bat buoc",
    "string.email": "email khong dung dinh dang",
  }),
  password: Joi.string().required().min(6).max(20).message({
    "string.empty": "password khong duoc de trong ",
    "any.requied": "password la bat buoc",
    "string.min": "password phai co it nhat {$limit} ky tu",
    "string.max": "password phai co it hon {$limit} ky tu"
  }),
  confirmPassword: Joi.string().required().min(6).max(20).valid(Joi.ref("password")).message({
    "string.empty": "confirmPassword khong duoc de trong ",
    "any.requied": "confirmPassword la bat buoc",
    "string.min": "confirmPassword phai co it nhat {$limit} ky tu",
    "string.max": "confirmPassword phai co it hon {$limit} ky tu",
    "any.only": "confirmPassword khong khop voi password"
  }),
  role: Joi.string()
})

export const SignInValidator = Joi.object({
  
  email: Joi.string().required().email().message({
    "string.empty": "email khong duoc de trong ",
    "any.requied": "email la bat buoc",
    "string.email": "email khong dung dinh dang",
  }),
  password: Joi.string().required().min(6).max(20).message({
    "string.empty": "password khong duoc de trong ",
    "any.requied": "password la bat buoc",
    "string.min": "password phai co it nhat {$limit} ky tu",
    "string.max": "password phai co it hon {$limit} ky tu"
  }),
 
})


