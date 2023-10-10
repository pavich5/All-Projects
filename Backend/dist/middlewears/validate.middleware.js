"use strict";
// import { NextFunction, Request, Response } from "express"
// import { UsersEntity } from "../entites/users.entity"
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
var validaton_schemas_1 = require("../const/validaton.schemas");
// export const validateUser = () => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const data = req.body;
//     const validUser = userSchema.validate(data);
//     if (validUser?.error) throw new Error(validUser.error.details[0].message);
//     return next();
//   };
// };
var validateUser = function (req, res, next) {
    var data = req.body;
    var validUser = validaton_schemas_1.userSchema.validate(data);
    if (validUser === null || validUser === void 0 ? void 0 : validUser.error)
        throw new Error(validUser.error.details[0].message);
    next();
};
exports.validateUser = validateUser;
