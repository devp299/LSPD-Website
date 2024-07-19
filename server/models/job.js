import { Schema,model } from "mongoose";

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    requirements: {
        type: String,
    },
    benefits: {
        type: String,
    }
},{
    timestamps: true
});

export const Job = model("Job",jobSchema);