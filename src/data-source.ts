import "dotenv/config";
import { DataSource } from "typeorm";


const AppDataSource =
 process.env.NODE_ENV === "test"
   ? new DataSource({
       type: "postgres",
       host: process.env.DB_HOST,
       port: 5432,
       username: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: "tinder_db_teste",
       logging: true,
       synchronize: true,
       entities: ["src/entities/**/*.ts"],
     })
      : new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });

// const AppDataSource = new DataSource({
//   type: "postgres",
//   url: process.env.DATABASE_URL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
//   synchronize: false,
//   logging: true,
//   entities:
//     process.env.NODE_ENV === "production"
//       ? ["dist/src/entities/**/*.js"]
//       : ["src/entities/**/*.ts"],
//   migrations:
//     process.env.NODE_ENV === "production"
//       ? ["dist/src/migrations/*.js"]
//       : ["src/migrations/*.ts"],
// });

export default AppDataSource;
