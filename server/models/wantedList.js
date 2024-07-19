import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    alias: {
        type: String,
    },
    lastSeen: {
        type: String,
    },
    crimes: {
        type: String,
    },
    image: {
        public_id : {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    }
},{
    timestamps: true
});

export const WantedList = model("WantedList",schema);