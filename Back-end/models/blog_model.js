import mongoose from "mongoose";
const schema = mongoose.Schema

const blogSchema = new schema({
    description: String,
    image: String,
    title:String,
    user:{type:schema.Types.ObjectId,ref:"users"},
    // comment_users:[{type:schema.Types.ObjectId,ref:"comment_data"}],
    liked_Users:[{type:schema.Types.ObjectId,ref:"users"}],
    comments:[{type:schema.Types.ObjectId,ref:"comments"}],
    writer:{type:schema.Types.ObjectId,ref:"users"},
    liked_Users:[{type:schema.Types.ObjectId,ref:"users"}],

})


const blogModel = mongoose.model("blogs", blogSchema)

export default blogModel