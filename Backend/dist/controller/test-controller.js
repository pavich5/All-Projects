"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
var TestController = /** @class */ (function () {
    function TestController() {
    }
    TestController.test = function (req, res) {
        var message = "Hello, world!";
        return res.json({ message: message });
    };
    return TestController;
}());
exports.TestController = TestController;
