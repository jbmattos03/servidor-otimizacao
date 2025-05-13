import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Database/Database.js";

class Question extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false, // Garante participação total
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            as: "user" // Nome do relacionamento
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
    userId: {  // Add this field
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
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