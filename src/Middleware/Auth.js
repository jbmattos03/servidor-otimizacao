import jwt from "jsonwebtoken";

function auth(req, res, next) {
    try {
        // Log the full authorization header for debugging
        console.log('Auth Header:', req.header("Authorization"));

        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        // Log the extracted token
        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Log the secret key being used (be careful with this in production)
        console.log('Using JWT Secret:', process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Log the decoded token
        console.log('Decoded Token:', decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ 
            message: "Invalid or expired token. Please log in again.",
            error: error.message 
        });
    }
}

export default auth;