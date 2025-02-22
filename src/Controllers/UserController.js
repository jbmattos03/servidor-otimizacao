import User  from "../Models/UserModel.js";
import UserService from "../Service/UserService.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

class UserController {
    static async register(req, res) {
        const {name, email, password} = req.body;

        try {
            const newUser = await UserService.registerUser(name, email, password);
            const userObject = newUser.toJSON(); // Converter para objeto para poder deletar a senha
            delete userObject.password; 

            return res.status(201).json({newUser: userObject});
            
        } catch(error) {
            return res.status(500).json({message: "Error registering user"});
        }
    }

    static async update(req, res) {
        const userId = req.params.id;
        const { name, email } = req.body;

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
            delete user.password; // Não retornar a senha

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: "User not found" });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            users.forEach(user => {
                delete user.password;
            }); // Não retornar a senha

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
            const token = await UserService.loginUser(email, password);

            return res.status(200).json({token});
        } catch(error) {
            return res.status(500).json({message: "Error logging in"});
        }
    }

    static async getUserProfile(req, res) {
        try {
            // Checar se usuário está presente na requisição
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: "Token expired. Please log in again." });
            }

            const user = await UserService.getUserById(req.user.id);
            const userObject = user.toJSON();
            delete userObject.password;
            
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving user profile" });
        }
    }

    static async requestPasswordReset(req, res) {
        const { email } = req.body;

        try {
            const user = await UserService.findUserByEmail(email);
            const id = user.id;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const token = crypto.randomBytes(20).toString("hex");
            const expiry = Date.now() + 3600000; // 1 hour

            await UserService.savePasswordResetToken(id, token, expiry);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODE_USER,
                    pass: process.env.NODE_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Password Reset",
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://localhost:3000/reset-password/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: "Password reset email sent" });
        } catch (error) {
            console.error("Error sending password reset email:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async resetPassword(req, res) {
        const { token } = req.params;
        const { password } = req.body;

        console.log(token);
        console.log(password);

        try {
            const user = await UserService.findUserByResetToken(token);
            console.log(user);

            if (!user || user.resetTokenExpiry < Date.now()) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }

            await UserService.updatePassword(user.id, password);

            return res.status(200).json({ message: "Password has been reset" });
        } catch (error) {
            return res.status(500).json({ message: "Error resetting password" });
        }
    }
}

export default UserController; // Exportar UserController para Routes.js