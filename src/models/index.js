"use strict";
require("dotenv").config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
//we gonna use these things from the sequelize package
const { Sequelize, DataTypes } = require("sequelize");
const Users=require("./users");
// We will configure our connection options for production
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};
        // we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = Users(sequelize, DataTypes);


module.exports = {
    db: sequelize,
    Users:userTable
};
