const express = require('express');
console.log('test debug');
const router = express.Router();
// import { Sequelize, Model, DataTypes } from 'sequelize';
const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
console.log('welcome')
// user = process.env.DB_USER;
// host = process.env.DB_HOST;
console.log(process.env.DB_USER);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established')
})
.catch((err) => {
    console.log('unable to connect to the database', err);
})
console.log('whats the issue');

// Define the signup model
const Signup = sequelize.define("signup",
    {
        username: {
            type: DataTypes.STRING,
            allownull: false,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false
            
        },
        password: {
            type: DataTypes.STRING,
            allownull: false
        },
        isadmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        timestamps: false,
    }

);

sequelize.sync({ alter:true, force:true  });
// synchronize the model with the database


module.exports = Signup;