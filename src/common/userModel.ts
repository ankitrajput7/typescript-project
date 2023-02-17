import sequelize from '../config/database';
import { DataTypes, Model, Optional } from 'sequelize'

module.exports = sequelize.define("users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(20)
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(20),
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(20)
    },
    mobileNo: {
        allowNull: false,
        type: DataTypes.STRING(10)
    }
});
