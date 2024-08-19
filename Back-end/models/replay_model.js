
import mongoose, { Schema } from "mongoose";
const replaySchema = new mongoose.Schema({
    replay: { type: String },
    replay_user: { type: Schema.Types.ObjectId, ref: "users" },
    date: { type: Date, default: Date.now }
})
export const replayModel = mongoose.model("replays", replaySchema)