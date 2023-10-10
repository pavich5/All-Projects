"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
var express_1 = require("express");
var test_controller_1 = require("../controller/test-controller");
exports.testRouter = (0, express_1.Router)();
exports.testRouter.get('/', test_controller_1.TestController.test);
