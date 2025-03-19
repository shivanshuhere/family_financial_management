import Transaction from "../models/transaction.model.js";

// Fetch all transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).populate(
            "user",
            "name email"
        );
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        await transaction.deleteOne();
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
