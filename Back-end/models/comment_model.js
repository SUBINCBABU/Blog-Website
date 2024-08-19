import mongoose, { Schema } from "mongoose";
const commentSchema=new mongoose.Schema({
    comment:{type:String},
    comment_user:{type:Schema.Types.ObjectId,ref:"users"},
    replays:[{type:Schema.Types.ObjectId,ref:"replays"}],
    date:{type:Date,default:Date.now}
})
export const commentModel=mongoose.model("comments",commentSchema)