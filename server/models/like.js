import { Schema, Types,model } from "mongoose";

const likeSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    announcementId: { type: Types.ObjectId, ref: 'News', required: true },
},{
    timestamps: true
});

export const Like = model("Like",likeSchema);
