import { Schema,model } from "mongoose";

const tipSchema = new Schema({
  message: { 
    type: String,
    required: true 
  },
  date: {
    type: Date,
    default: Date.now 
  },
});

export const Tip = model("Tip",tipSchema);