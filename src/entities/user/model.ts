import sequelize from '../../db/postgresql/postgresql'; 
import {DataTypes} from 'sequelize'; 
import { CardData } from '../card/model';

export const UserData = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    activation: {type: DataTypes.STRING},
    refreshToken: {type: DataTypes.STRING},
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

UserData.hasOne(UserProgress);
UserProgress.belongsTo(UserData);

UserData.hasMany(CardData);