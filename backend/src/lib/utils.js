import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,// Shows how long this cookie alive in ms (here 7 days)
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",// If true cookie can only be sent over HTTPS, but under development process it set to false
    });

    return token;
}