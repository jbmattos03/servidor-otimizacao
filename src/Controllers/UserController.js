const User = require ('../Models/User');
const UserService = require('../Services/UserService');

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
        const {name, email, password} = req.body;

        // Atualizar usuário
        try {
            const updatedUser = await UserService.updateUser(userId, name, email, password);
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
            // Check if the user is present in the request object
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
}

export default UserController; // Exportar UserController para Routes.js