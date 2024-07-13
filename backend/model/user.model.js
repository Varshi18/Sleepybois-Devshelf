import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    book1:{
        type:String,
        required:false,
    },
    book2:{
        type:String,
        required:false

    },
    book3:{
        type:String,
        required:false
    },
    book1Date:{
        type:String,
        required:false,
    },
    book2Date:{
        type:String,
        required:false,
    },
    book3Date:{
        type:String,
        required:false,
    },
    
});
const User = mongoose.model("User", userSchema);
export default User;