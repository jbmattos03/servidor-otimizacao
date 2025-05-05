import User  from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserService {
    static async registerUser(name, email, password) {
        const user = await User.findOne({where: {email: email}}); // Verificar se usuário já existe
        if (user) {
            throw new Error("User already exists");
        }

        if (!name || !email || !password) { // Verificar se todos os campos foram preenchidos
            throw new Error("Missing required information");
        }

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return newUser;
    }

    static async updateUser(userId, name, email) {
        // Verificar se usuário existe
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        // Atualizar usuário
        const updatedData = {};

        if (name) {
            updatedData.name = name;
        }

        if (email) {
            // Verificar se e-mail já está em uso
            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                throw new Error("Email already in use");
            }

            updatedData.email = email;
        }

        await User.update(updatedData, { where: { id: userId } });
        const updatedUser = await User.findOne({ where: { id: userId } });

        return updatedUser;
    }

    static async getAllUsers(req, res) {
        const users = await User.findAll();

        return users;
    }

    static async getUserById(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async deleteUser(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        await User.destroy({ where: { id: userId } });
    }

    static generateAuthToken(user) {
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error("JWT secret key is not defined");
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
        
        return token;
    }

    static async loginUser(email, password) {
        // Verificar se usuário existe
        const user = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password'], // Retornar senha para comparação
            raw: true // Retornar objeto JS
        });
        
        if (!user) {
            throw new Error("Invalid email or password");
        }
    
        // Comparar senhas
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
    
        return this.generateAuthToken(user);
    }

    static async findUserByEmail(email) {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async savePasswordResetToken(userId, token, expiry) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        await User.update({
            resetToken: token,
            resetTokenExpiry: expiry,
        }, { where: { id: userId } });
    }

    static async findUserByResetToken(token) {
        return await User.findOne({ where: { resetToken: token } });
    }

    static async updatePassword(userId, password) {
        const user = await User.findOne({ where: { id: userId } });
        console.log(user);

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedData = {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null
        }
        
        await User.update(updatedData, { where: { id: userId } });
        console.log(updatedData);
    }
}

export default UserService;