import sequelize from '../../db/postgresql/postgresql'; 
import {DataTypes} from 'sequelize'; 
import { CardData } from '../card/model';

export const UserData = sequelize.define('UserData', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    activation: {type: DataTypes.STRING, defaultValue: null},
    refreshToken: {type: DataTypes.STRING, defaultValue: null},
    role: {type: DataTypes.STRING, defaultValue: "manager"},
    photo: {type: DataTypes.STRING},
});

export const UserProgress = sequelize.define('UserProgress', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    balance: {type: DataTypes.INTEGER, defaultValue: 0},
    index: {type: DataTypes.INTEGER, defaultValue: 0},
    clicks: {type: DataTypes.INTEGER, defaultValue: 0},
    hold: {type: DataTypes.INTEGER, defaultValue: 0},
    profit: {type: DataTypes.INTEGER, defaultValue: 0},
    budget: {type: DataTypes.INTEGER, defaultValue: 0},
    notification: {type: DataTypes.INTEGER, defaultValue: 0},
});

UserData.hasOne(UserProgress, {foreignKey: 'userId', onDelete: 'CASCADE'});
UserProgress.belongsTo(UserData, {foreignKey: 'userId'});

UserData.hasMany(CardData, {foreignKey: 'userId', onDelete: 'CASCADE'});
CardData.belongsTo(UserData, {foreignKey: 'userId'});

