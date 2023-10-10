import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "drvarastat123",
  database: "postgres",
  entities: ["dist/entites/*.js"],
  logging: true,
});
