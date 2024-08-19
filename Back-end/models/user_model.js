import mongoose from "mongoose";
const schema=mongoose.Schema

const userschema=new schema({
   name:String,
   email:String,
   password:String,
   blogs:[{type:schema.Types.ObjectId,ref:"blogs"}],
})
const  usermodel=mongoose.model("users",userschema)

export default usermodel