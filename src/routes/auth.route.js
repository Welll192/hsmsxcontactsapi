const route = require("express").Router()
const User = require("../models/Usuario")
const jwt = require("jsonwebtoken")
const CryptJS = require("crypto-js")
require("dotenv").config()
// REGISTRO
route.post("/registro", async (req,res)=>{

    try {
    
        const newUser = await User.create({
            email: req.body.email,
            password: CryptJS.AES.encrypt(req.body.password,process.env.CRYPTO_KEY).toString(),
        },{writeConcern:"majority"})
    
        const saveUser = await newUser.save();
        res.status(200).json(saveUser)

    } catch (error) {
        res.status(500).json("hubo un problema en el servidor");
    }

})



// LOGIN

route.post("/login", async (req,res)=>{

    try {
        const {email, password} = req.body

        const findUser = await User.findOne({email:email});
    
        if(!findUser) throw("Usuario Equivocado")

        passwordDecrypted = CryptJS.AES.decrypt(findUser.password,process.env.CRYPTO_KEY).toString(CryptJS.enc.Utf8)

        if(passwordDecrypted!=password) throw("Contraseña equivocada")

        const accessToken = jwt.sign({email: email},"MYSECRETKEY",{expiresIn:"1d"})

        res.status(200).json({email,accessToken})
    
    } catch (error) {
        
        console.log(error);

        res.status(404).json(error)

    }



})




module.exports = route