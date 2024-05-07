const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const JWT_SECRET=process.env.JWT_SECRET;

const fetchUser = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token)
        res.status(401).send("Token Invalid 1");
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log(data);
        next();
    }catch(error){
        console.log(error);
        res.status(401).send("Token Invalid 2");
    }
};

module.exports = fetchUser;