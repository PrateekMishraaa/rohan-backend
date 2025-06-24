import mongoose,{Schema} from "mongoose";


const ContactSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
        minlength:[10,"Phone number should be in 10 digits"],
        maxlength:[10,"Phone number should not be more than 10 digits"]
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Contact = mongoose.model("ContactForm",ContactSchema)
export default Contact