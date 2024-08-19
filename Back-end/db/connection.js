import mongoose from "mongoose"

 export const DB=()=>{
    mongoose.connect(process.env.connection_string).then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(err);
    })
}