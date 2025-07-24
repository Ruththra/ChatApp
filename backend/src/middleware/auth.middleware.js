import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {//next will execute when the middleware is done
    try{
        const token = req.cookies.jwt; // Get the JWT from cookies
        if (!token) {
            return res.status(401).json({message: "Unauthorized, no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and return the decoded payload (userId)

        if (!decoded) {
            return res.status(401).json({message: "Unauthorized, invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // Find the user by ID from the decoded token and exclude the password field

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user; // Attach the user object to the request

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}