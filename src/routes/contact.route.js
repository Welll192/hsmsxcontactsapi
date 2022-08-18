const Contact = require("../models/Contacto")
const { verify } = require("../auth/verifyToken")
const route = require("express").Router()


// CREATE CONTACT
route.post("/create", verify ,async (req, res)=> {

    try {
    
        const newContact = await Contact.create({
        
            first_name: req.body.first_name,
        
            telf_number: req.body.telf_number,
        
            owner_Id: req.user._id
        
        })

        const saveContact = await newContact.save()

        res.status(200).json(saveContact)

    } catch (error) {
        
        console.log(error);

        res.status(500).json(error)

    }

})




// GET CONTACTS

route.get("/get", verify, async (req, res)=> {

    try {
        
        const getContacts = await Contact.find({ owner_Id: req.user._id})
        
        res.status(200).json(getContacts)

    } catch (error) {
        
        console.log(error);

        res.status(500).json(error)

    }

})

// UPDATE CONTACTS

route.patch("/update", verify, async (req,res)=>{

    const id = req.body.id

    const first_name = req.body.first_name

    const telf_number = req.body.telf_number

    try {
        
        const findContact = await Contact.findOne({_id: id})

        if(!findContact) throw("No existe el contacto")

        await Contact.updateOne({_id: id},{$set: {first_name:first_name, telf_number:telf_number}})

        res.status(200).json(true)
    
    } catch (error) {

        console.log(error);
    
        res.status(500).json(false)
    
    }

})

// DELETE CONTACTS

route.delete("/delete", verify, async (req, res)=>{

    try {
        
        const id = req.body.id

        const findContact = await Contact.findOne({_id: id})

        if(!findContact) throw("No existe el contacto")

        await Contact.deleteOne({_id: id})

        res.status(200).json(true)

    } catch (error) {
    
        console.log(error);
      
        res.status(500).json(false)

    }

})

module.exports = route