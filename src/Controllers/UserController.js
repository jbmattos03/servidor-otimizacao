const User = require ('../Models/User');
const UserService = require('../Services/UserService');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

class UserController {
    static async register(req, res) {
        const {name, email, password} = req.body;

        try {
            const newUser = await UserService.registerUser(name, email, password);
            delete newUser.password; // Não retornar a senha

            return res.status(201).json({newUser});
            
        } catch(error) {
            return res.status(500).json({message: "Error registering user"});
        }
    }

    static async update(req, res) {
        const userId = req.params.id;
        const {name, email} = req.body;

        // Atualizar usuário
        try {
            const updatedUser = await UserService.updateUser(userId, name, email);
            delete updatedUser.password; // Não retornar a senha

            return res.status(200).json(updatedUser);
        } catch(error) {
            return res.status(500).json({message: "Error updating user"});
        }
    }

    static async getUserById(req, res) {
        const userId = req.params.id;

        try {
            const user = await UserService.getUserById(userId);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving users" });
        }
    }

    static async delete(req, res) {
        const userId = req.params.id;

        // Deletar usuário
        try {
            await UserService.deleteUser(userId);

            return res.status(200).json({message: "User deleted successfully"});
        } catch(error) {
            return res.status(500).json({message: "Error deleting user"});
        }
    }
    
    static async login(req, res) {
        const userId = req.params.id;
        const {email, password} = req.body;

        try {
            const token = await UserService.login(email, password);

            return res.status(200).json({token});
        } catch(error) {
            return res.status(500).json({message: "Error logging in"});
        }
    }

    static async getUserProfile(req, res) {
        try {
            // Checar se usuário está presente na requisição
            if (!req.user || !req.user._id) {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            }

            const user = await UserService.getUserById(req.user._id);
            delete user.password;
            
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving user profile' });
        }
    }

    static async requestPasswordReset(req, res) {
        const { email } = req.body;

        try {
            const user = await UserService.findUserByEmail(email);
            const token = crypto.randomBytes(20).toString('hex');
            const resetTokenExpiry = Date.now() + 1800000; // 30 minutos a partir de agora

            await UserService.savePasswordResetToken(user._id, token, resetTokenExpiry);

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://${req.headers.host}/reset/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Error requesting password reset' });
        }
    }

    static async resetPassword(req, res) {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const user = await UserService.findUserByResetToken(token);

            if (!user || user.resetTokenExpiry < Date.now()) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
            }

            await UserService.updatePassword(user._id, password);

            return res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            return res.status(500).json({ message: 'Error resetting password' });
        }
    }
}

export default UserController; // Exportar UserController para Routes.js