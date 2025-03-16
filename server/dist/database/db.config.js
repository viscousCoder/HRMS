"use strict";
// import { DataSource } from "typeorm";
// import path from "path";
// import dotenv from "dotenv";
// import { User } from "../entities/User";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
// dotenv.config();
// /**Environment variable */
// const MYDBTYPE = (process.env.MYDBTYPE as "postgres") || "postgres";
// const MYHOST = process.env.MYHOST as string;
// const MYDBPORT = process.env.MYDBPORT ? parseInt(process.env.MYDBPORT) : 5432;
// const MYDBPASSWORD = process.env.MYDBPASSWORD;
// const MYDBNAME = process.env.MYDBNAME;
// const MYDBUSER = process.env.MYDBUSER;
// /**
//  * @function to establish the db conection
//  * @returns db response
//  */
// export async function getConnection() {
//   const AppDataSource = new DataSource({
//     type: MYDBTYPE,
//     host: MYHOST,
//     port: MYDBPORT,
//     password: MYDBPASSWORD,
//     database: MYDBNAME,
//     username: MYDBUSER,
//     // entities: [path.resolve("src", "entitites") + "/*.ts"],
//     entities: [path.join(__dirname, "../entities/*.ts")],
//     // entities: [User],
//     synchronize: true,
//     logging: true,
//   });
//   if (!AppDataSource.initialize) {
//     await AppDataSource.initialize();
//   }
//   console.log(path.join(__dirname, "../entities/*.ts"));
//   return AppDataSource;
// }
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.MYHOST,
    port: process.env.MYDBPORT ? parseInt(process.env.MYDBPORT) : 5432,
    password: process.env.MYDBPASSWORD,
    database: process.env.MYDBNAME,
    username: process.env.MYDBUSER,
    entities: [path_1.default.join(__dirname, "../entities/*{.ts,.js}")],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!AppDataSource.isInitialized) {
            yield AppDataSource.initialize();
            console.log("Database initialized");
        }
        return AppDataSource;
    });
}
