const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Contact = new mongoose.Schema({

    first_name: { type: String },

    telf_number: { type: String},

    owner_Id : { type: Schema.ObjectId, $ref:"Usuario" }

},{timestamps: true})

module.exports = mongoose.model("Contacto", Contact)