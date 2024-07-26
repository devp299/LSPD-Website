import { Schema,Types,model } from "mongoose";

const jobSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: Number, required: true },
    // resume: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     },
    // }
},{
    timestamps: true
});

export const JobApplication = model("JobApplication",jobSchema);