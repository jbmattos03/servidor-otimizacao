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
    qtd_var_obj: DataTypes.INTEGER,
    qtd_res_des: DataTypes.INTEGER,
    matriz: DataTypes.JSON,
    answer: DataTypes.JSON,
    isAnswered: DataTypes.BOOLEAN,
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