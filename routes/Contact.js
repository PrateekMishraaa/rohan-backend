import express from "express"
const router = express.Router()
import Contact from "../models/Contact.js"





router.post("/contact",async(req,res)=>{
    const {Name,Email,Phone,Message} = req.body

    if(!Name || !Email || !Phone || !Message){
        return res.status(403).json({message:"All fields are reuired"})
    }
    try{
            const newForm = Contact.create({
                Name,
                Email,
                Phone,
                Message
            })
            res.status(200).json({message:"Form has been submitted",newform:newForm})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})


router.get("/allcontact",async(req,res)=>{
    try{
            const allcontacts = await Contact.find()
            console.log("Contact",allcontacts)
            res.status(200).json({message:"contact",allcontacts})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error    "})
    }
})


export default router