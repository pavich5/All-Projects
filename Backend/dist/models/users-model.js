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
exports.AuthModel = void 0;
var app_data_source_1 = require("../app.data-source");
var users_entity_1 = require("../entites/users.entity");
var bcrypt = require("bcryptjs");
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    AuthModel.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, usersRepo.find({})];
                    case 1:
                        allUsers = _a.sent();
                        console.log(allUsers);
                        return [2 /*return*/, allUsers];
                }
            });
        });
    };
    AuthModel.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, foundUser;
            return __generator(this, function (_a) {
                usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                foundUser = usersRepo.findOne({
                    where: {
                        id: userId,
                    },
                });
                if (!foundUser)
                    throw new Error("user not found");
                return [2 /*return*/, foundUser];
            });
        });
    };
    AuthModel.createUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, hashedPassword, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, bcrypt.hash(userData.password, 8)];
                    case 1:
                        hashedPassword = _a.sent();
                        userData.password = hashedPassword;
                        return [4 /*yield*/, usersRepo.insert(userData)];
                    case 2:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    AuthModel.updateUser = function (userData, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, foundUser, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, this.getUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(userData.password, 8)];
                    case 2:
                        hashedPassword = _a.sent();
                        userData.password = hashedPassword;
                        Object.assign(foundUser, userData);
                        usersRepo.save(foundUser);
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    AuthModel.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, this.getUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        usersRepo.remove(foundUser);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthModel.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo;
            return __generator(this, function (_a) {
                usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                usersRepo.clear();
                return [2 /*return*/];
            });
        });
    };
    AuthModel.loginUser = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, usersRepo, foundUser, isPasswprdValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = credentials.email, password = credentials.password;
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, usersRepo.findOne({
                                where: {
                                    email: email,
                                },
                            })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser)
                            throw new Error("Invalid credentials");
                        return [4 /*yield*/, bcrypt.compare(password, foundUser.password)];
                    case 2:
                        isPasswprdValid = _a.sent();
                        if (!isPasswprdValid)
                            throw new Error("Invalid credentials");
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    AuthModel.saveRefreshToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, this.getUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser.id === userId) {
                            foundUser.refreshTokens = refreshToken;
                        }
                        return [4 /*yield*/, usersRepo.save(foundUser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthModel.deleteRefreshToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepo, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepo = app_data_source_1.dataSource.getRepository(users_entity_1.UsersEntity);
                        return [4 /*yield*/, usersRepo.findOne({
                                where: {
                                    id: userId,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        user.refreshTokens = null;
                        return [4 /*yield*/, usersRepo.save(user)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthModel;
}());
exports.AuthModel = AuthModel;
