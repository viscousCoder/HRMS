// import { DataSource } from "typeorm";
// import path from "path";
// import dotenv from "dotenv";
// import { User } from "../entities/User";

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

import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.MYHOST,
  port: process.env.MYDBPORT ? parseInt(process.env.MYDBPORT) : 5432,
  password: process.env.MYDBPASSWORD,
  database: process.env.MYDBNAME,
  username: process.env.MYDBUSER,
  entities: [path.join(__dirname, "../entities/*{.ts,.js}")],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

export async function getConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Database initialized");
  }
  return AppDataSource;
}
