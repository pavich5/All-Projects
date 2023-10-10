"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var Joi = require("joi");
exports.userSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(18).required(),
    email: Joi.string().email().required(),
    //   role: Joi.string().valid("business", "user").required(),
    password: Joi.string().min(2).required(),
});
