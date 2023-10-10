"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express = require("express");
var app_data_source_1 = require("./app.data-source");
var router_const_1 = require("./const/router.const");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router_const_1.globalRouter);
app_data_source_1.dataSource
    .initialize()
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) {
    console.log("Something went wrong. ".concat(err));
});
app.use(function (err, req, res, next) {
    var _a = err.statusCode, statusCode = _a === void 0 ? 500 : _a, message = err.message;
    res.status(statusCode).send(message);
});
app.listen(4000, "0.0.0.0", function () {
    console.log("Server is up at port 4000");
});
