import { Schema,model } from "mongoose";
import {hash} from 'bcrypt';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true,
}
);

schema.pre("save",async function(next) {

    if(!this.isModified("password")) return next();
    this.password = await hash(this.password,10)
})
export const User = model("User",schema);