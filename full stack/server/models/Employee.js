const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'employees', // Matches the table name in the database
    timestamps: false
});

module.exports = Employee;
