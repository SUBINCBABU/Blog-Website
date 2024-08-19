import express from 'express'
import usermodel from './models/user_model.js'
import blogModel from './models/blog_model.js'
import crypto from "crypto"
import { log } from "console"
import { commentModel } from './models/comment_model.js'
import { replayModel } from './models/replay_model.js'
const hidden = crypto.randomBytes(64).toString('hex')
//console.log(hidden);
const userRouter = express.Router()
let user = ["name", "email", "password"]
let current_user = []




userRouter.post("/signup", async (req, res) => {
   
    const blog_body = req.body

    const users = new usermodel({
        name: blog_body.name,
        email: blog_body.email,
        password: blog_body.password
    })

    await users.save()
    res.status(201).json({
        status: "signup success"
    })

})






userRouter.post("/login", async (req, res) => {
    current_user = []
    const { email, password } = req.body
    const user = await usermodel.findOne({ email: email })
    if (user) {
        if (password == user.password && email == user.email) {
            current_user.push(user)
            res.status(200).json({

                status: "login success"
            })
        }
        else {
            res.status(401).json({
                status: "invalid password"
            })
        }
    }
    else {
        res.status(401).json({
            status: "invalid user"
        })
    }

})



userRouter.post("/create", async (req, res) => {
    //console.log(req.body);


    const blogs = new blogModel({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    })
    let blog = await blogs.save()
    // const user = await usermodel.findOne({ email: current_user[0]. }).lean
    await usermodel.findByIdAndUpdate(current_user[0]._id, { $push: { blogs: blog._id } })
    //console.log(blogs);
    res.status(201).json({
        status: "success"
    })

})




userRouter.get("/myBlog", async (req, res) => {
    //console.log("current:", current_user[0]);
    if (current_user.length == 0) {

        res.json("please login for view" )
    }
    else {
        // if(current_user._id){

        // }
  
        let user1 = await usermodel.findById(current_user[0]._id).populate('blogs').lean({})
        //console.log("data=", user1);
        res.json(user1)
    }
})





userRouter.get("/allblogs", async (req, res) => {


    let user1 = await blogModel.find().lean({})

   
    res.json(user1,)
})




userRouter.get("/logout", async (req, res) => {
    current_user = []


    res.json(" deleted")
})




//view



userRouter.get("/view/:id",async(req,res)=>{
    let id=req.params.id
    //console.log("blgid+++++++",id);
   
    let blog =  await blogModel.findById(id).populate([{
        path: "comments",
        model: "comments",
        populate: [{
            path: "replays",
            model: "replays",
            populate: {
                path: "replay_user",
                model: "users",
            }
        },
       {
            path:"comment_user",
            model:"users"
        }]
    }, {
        path: "writer",
        model:"users"
    }]).lean({}).then((data) => {
       // console.log("view", data.comments);
         return data
    })
   

    res.json(blog)
})




//like


  
userRouter.post("/like/:id",async(req,res)=>{
   // console.log("like",req.params.id);
    if (current_user.length != 0) {
        const id = req.params.id
        let blog_likes = await blogModel.findOne({ _id: id, liked_Users: current_user[0] }).lean({}).then((data) => {

            return data
        })
        if (blog_likes != undefined) {
            await blogModel.findByIdAndUpdate(id, { $pull: { liked_Users: current_user[0] } })
            //console.log("removed");
        } else {
            await blogModel.findByIdAndUpdate(id, { $push: { liked_Users: current_user[0] } })
            //console.log("added");
        }
        res.json("like added")
    }
    else {
        res.json("please login first")
    }
})




//comment


let New_Comment
let addComments = async (cmnt, user) => {
    let newComment = new commentModel({
        comment: cmnt,
        comment_user: user,
        replays: [],
    })
    New_Comment = await newComment.save()
}

let blogid
userRouter.post("/comment/:id" ,async (req, res) => {
   // console.log("comment:", req.params.id);
    if (current_user.length != 0) {
        const comment = req.body
        blogid = req.params.id
       // console.log("comment", comment.Comment);
        //console.log("id", blogid);
        await addComments(comment.Comment, current_user[0])
        await blogModel.findByIdAndUpdate(blogid, { $push: { comments: New_Comment._id } })
        res.json("comment added")
    }
    else {
        res.json("please login first")
    }
})




//Replay


let New_Replay
let addReplays = async (replay, user) => {
    let newReplay = new replayModel({
        replay: replay,
        replay_user: user,
    })
    New_Replay = await newReplay.save()
}

userRouter.post("/replay/:id" ,async (req, res) => {
    if (current_user.length != 0) {

        const replay = req.body
        const cid = req.params.id
        console.log("commentreplay", req.body);
        console.log("id", cid);
        await addReplays(replay.Replay, current_user[0])
        await commentModel.findByIdAndUpdate(cid, { $push: { replays: New_Replay._id } })
        res.json("replay added")
    }
    else {
        res.json("please login first")
    }
})


export default userRouter