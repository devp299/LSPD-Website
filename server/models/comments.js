import { Schema, Types,model } from "mongoose";

const commentSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    newsId: { type: Types.ObjectId, ref: 'News', required: true },
    comment: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

export const Comment = model("Comment",commentSchema);
