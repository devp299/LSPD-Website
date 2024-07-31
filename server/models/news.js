import { Schema,Types,model } from "mongoose";

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    likes: [{ type: Types.ObjectId, ref: 'Like' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    location: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
},{
    timestamps: true
});

export const News = model("News",newSchema);