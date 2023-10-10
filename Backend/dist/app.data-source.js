"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "drvarastat123",
    database: "postgres",
    entities: ["dist/entites/*.js"],
    logging: true,
});
