import jwt from "jsonwebtoken";

function auth(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        //console.log("User authenticated:", req.user);

        next(); // Chamar o próximo middleware ou rota
    } catch (error) {
        //console.error('JWT Verification Error:', error);

        return res.status(401).json({ 
            message: "Invalid or expired token. Please log in again.",
            error: error.message 
        });
    }
}

export default auth;