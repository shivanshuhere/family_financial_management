import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        type: {
            type: String,
            enum: ["Income", "Expense", "Investment"],
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Salary",
                "Groceries",
                "Utilities",
                "Education",
                "Healthcare",
                "Entertainment",
                "Travel",
                "Investment",
                "Other",
            ],
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Completed",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

// Pre-save validation to ensure expense amount is valid
transactionSchema.pre("save", function (next) {
    if (this.type === "Expense" && this.amount <= 0) {
        const err = new Error("Expense amount must be greater than zero");
        next(err);
    } else {
        next();
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
