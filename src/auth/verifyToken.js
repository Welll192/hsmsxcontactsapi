const jwt = require("jsonwebtoken")
const User  = require("../models/Usuario")

const verify = (req, res ,next)=>{

    try {

        const tokenHeaders = req.headers.tokenkey
        
        if(!tokenHeaders) throw("You're not authenticated")

        const token = tokenHeaders.split(" ")[1]

        jwt.verify(token,"MYSECRETKEY",async (error,user)=>{
            
            if(error) return res.status(403).json("Token invalid")

            const findUser = await User.findOne({email:user.email})

            req.user = findUser
    
            next()

        })

    } catch (error) {

        console.log(error);
    
        res.status(500).json(error)

    }
}


module.exports = { verify }