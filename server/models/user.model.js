import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["Admin", "FamilyMember", "Accountant"], default: "FamilyMember" }
});

export default  mongoose.model("User", UserSchema);
