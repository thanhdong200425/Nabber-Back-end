import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    DB_DIALECT,
    DB_HOST
} = process.env

if (!DB_DIALECT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USERNAME || !DB_PASSWORD)
    throw new Error("Invalid information of database");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres"
});

export default sequelize;
