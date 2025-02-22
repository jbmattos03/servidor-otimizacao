import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

async function createDatabase() {
    const mysqlConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        await mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log("Database checked/created successfully");
        await mysqlConnection.end();
    } catch(error) {
        console.log("An unexpected error has occurred: ", error);
    }
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "-03:00",
});

async function initializeSequelize() {
    await createDatabase();

    try {
        await sequelize.authenticate();
        console.log("Successfully connected to the database");
    } catch (err) {
        console.log("An unexpected error has occurred: ", error);
    }
}

export { sequelize, initializeSequelize };