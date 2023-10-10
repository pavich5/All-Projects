"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var users_model_1 = require("../models/users-model");
var jwt_const_1 = require("../const/jwt-const");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.getAllUsers()];
                    case 1:
                        allUsers = _a.sent();
                        res.json(allUsers);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.getUserById(Number(req.params.id))];
                    case 1:
                        foundUser = _a.sent();
                        res.json(foundUser);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.createUser(req.body)];
                    case 1:
                        user = _a.sent();
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.updateUser(req.body, req.params.id)];
                    case 1:
                        _a.sent();
                        res.sendStatus(201);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.removeUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.deleteUser(req.params.id)];
                    case 1:
                        _a.sent();
                        res.sendStatus(201);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.deleteAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.deleteAll()];
                    case 1:
                        _a.sent();
                        res.sendStatus(201);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_model_1.AuthModel.loginUser(req.body)];
                    case 1:
                        user = _a.sent();
                        // const accessToken = createAccessToken(user.id);
                        // console.log("Access token is: ", accessToken);
                        // res.set("access-token", accessToken);
                        // const refreshToken = createRefreshToken(user.id);
                        // await AuthModel.saveRefreshToken(user.id, refreshToken);
                        // res.set("refresh-token", refreshToken);
                        // res.set("access-control-expose-headers", "access-token, refresh-token");
                        // res.sendStatus(200);
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.log("The error is: ", error_7);
                        res.status(500).json({ error: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.refreshAccessToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, decodedToken, userId, foundUser, accessToken, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.headers["refresh-token"];
                        console.log(refreshToken);
                        if (!refreshToken) {
                            throw new Error("Refresh token is missing");
                        }
                        decodedToken = (0, jwt_const_1.verifyRefreshToken)(refreshToken);
                        userId = decodedToken.userId;
                        return [4 /*yield*/, users_model_1.AuthModel.getUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        console.log("Found user:", foundUser);
                        if (!foundUser.refreshTokens.includes(refreshToken)) {
                            throw new Error("Invalid refresh token");
                        }
                        accessToken = (0, jwt_const_1.createAccessToken)(foundUser.id);
                        console.log("New access token:", accessToken);
                        res.set("access-token", accessToken);
                        res.set("access-control-expose-headers", "access-token, refresh-token");
                        return [2 /*return*/, res.sendStatus(204)];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [2 /*return*/, res.sendStatus(403)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.logoutUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, userId, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.headers["refresh-token"];
                        userId = (0, jwt_const_1.verifyRefreshToken)(refreshToken).userId;
                        return [4 /*yield*/, users_model_1.AuthModel.deleteRefreshToken(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(204)];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2 /*return*/, res.sendStatus(400)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
