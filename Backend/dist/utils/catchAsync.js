"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
var catchAsync = function (func) {
    return function (req, res, next) {
        func(req, res, next).catch(function (e) { return next(e); });
    };
};
exports.catchAsync = catchAsync;
