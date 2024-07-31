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
}, {
  timestamps: true
});

export const Tip = model("Tip",tipSchema);