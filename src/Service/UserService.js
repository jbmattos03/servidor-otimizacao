const User = require('../Models/User');
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(name, email, password) {
        if (await User.findOne({ email })) {
            throw new Error("User already exists");
        }

        if (!name || !email || !password) {
            throw new Error("Missing required information");
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        return newUser;
    }

    static async updateUser(userId, name, email) {
        // Verificar se usuário existe
        const user = await User.findById(userId);
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
            if (await User.findOne({ email })) {
                throw new Error("Email already in use");
            }

            updatedData.email = email;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        return updatedUser;
    }

    static async getAllUsers(req, res) {
        const users = await User.findAll();

        return users;
    }

    static async getUserById(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async deleteUser(userId) {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error("User not found");
        }

        await User.destroy({where: {id: userId}});
    }

    static generateAuthToken(user) {
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            throw new Error("JWT secret key is not defined");
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        
        return token;
    }

    static async loginUser(email, password) {
        const user = await User.findOne({ email });

        if (!user || !(user.password === password)) {
            throw new Error("Invalid email or password");
        }

        return user.generateAuthToken();
    }

    static async findUserByEmail(email) {
        const user = await User.findOne({where: {email: email }});

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async savePasswordResetToken(userId, token, expiry) {
        return await User.findByIdAndUpdate(userId, {
            resetPasswordToken: token,
            resetPasswordTokenExpiry: expiry,
        });
    }

    static async findUserByResetToken(token) {
        return await User.findOne({ resetPasswordToken: token });
    }

    static async updatePassword(userId, password) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const updatedData = {
            password: password,
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null
        }
        
        await User.update(updatedData, {where: {id: userId}});
    }
}

module.exports = UserService;