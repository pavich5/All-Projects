"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersEntity = void 0;
var typeorm_1 = require("typeorm");
var UsersEntity = exports.UsersEntity = /** @class */ (function () {
    function UsersEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UsersEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "firstname",
            type: "varchar",
        }),
        __metadata("design:type", String)
    ], UsersEntity.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "lastname",
            type: "varchar",
        }),
        __metadata("design:type", String)
    ], UsersEntity.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], UsersEntity.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], UsersEntity.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], UsersEntity.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "refreshtokens",
        }),
        __metadata("design:type", String)
    ], UsersEntity.prototype, "refreshTokens", void 0);
    UsersEntity = __decorate([
        (0, typeorm_1.Entity)({
            name: "users",
        })
    ], UsersEntity);
    return UsersEntity;
}());
