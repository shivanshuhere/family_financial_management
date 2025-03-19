import Transaction from "../models/transaction.model.js";

// Add Transaction
export const addTransaction = async (req, res) => {
    try {
        const { type, category, amount, description, date } = req.body;
        const transaction = new Transaction({
            user: req.user._id,
            type,
            category,
            amount,
            description,
            date,
        });
        await transaction.save();
        res.status(201).json({
            message: "Transaction added successfully",
            transaction,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
