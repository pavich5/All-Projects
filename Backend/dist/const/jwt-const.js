"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.createRefreshToken = exports.verifyAccessToken = exports.createAccessToken = void 0;
var jwt = require("jsonwebtoken");
var createAccessToken = function (userId) {
    return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5s",
    });
};
exports.createAccessToken = createAccessToken;
var verifyAccessToken = function (token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
var createRefreshToken = function (userId) {
    return jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.createRefreshToken = createRefreshToken;
var verifyRefreshToken = function (refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
