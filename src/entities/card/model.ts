import sequelize from '../../db/postgresql/postgresql'; 
import {DataTypes} from 'sequelize'; 

export const CardData = sequelize.define('CardData', {
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    cardNumber: {type: DataTypes.STRING, allowNull: false},
    cardNumberHidden: {type: DataTypes.STRING},
    cardBalance: {type: DataTypes.INTEGER, defaultValue: 0},
    initials: {type: DataTypes.STRING, allowNull: false},
    cardCvc: {type: DataTypes.INTEGER, allowNull: false},
    expiry: {type: DataTypes.STRING, allowNull: false},
    system: {type: DataTypes.STRING, defaultValue: "Visa"}
});


