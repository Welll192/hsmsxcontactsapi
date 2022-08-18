const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require("./src/routes/auth.route")
const contactRoute = require("./src/routes/contact.route")
const cors=require("cors")
require("dotenv").config()
app.use(cors());
mongoose.connect(process.env.MONGOOSE_URL).then(()=>console.log("todo ok")).catch(()=>console.log("no sirvo para la programacion"))


app.use(express.json())

app.use("/api/user/auth",authRoute)
app.use("/api/contact",contactRoute)

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})