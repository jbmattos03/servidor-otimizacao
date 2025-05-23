import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Database/Database.js";

class User extends Model {
    static associate(models) {
        this.hasMany(models.Question, {
            foreignKey: {
                name: "userId",
                allowNull: false, // Garante participação total
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            as: "questions" // Nome do relacionamento
        });
    }
}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.DATE
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["password"]
        }
    }
});

export default User;