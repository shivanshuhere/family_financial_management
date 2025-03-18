import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["Admin", "Family Member", "Accountant"],
            default: "Family Member",
        },
    },
    { timestamps: true }
);

// Password hashing before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Password verification
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
