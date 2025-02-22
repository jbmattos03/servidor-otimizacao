import { Model, DataTypes } from "sequelize";
import { sequelize, initializeSequelize } from "../Database/Database.js";

class Question extends Model {
    static associate(models) {
        this.hasMany(models.Question, {
            foreignKey: {
                name: "userId",
                allowNull: false, //Garante participação total
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            as: "users" // Nome do relacionamento
        });
    }
}

Question.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["password"]
        }
    }
});

export default Question;