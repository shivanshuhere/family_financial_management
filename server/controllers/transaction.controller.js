import Transaction from "../models/transaction.model.js";

//  Create Transaction
export const createTransaction = async (req, res) => {
    const { amount, type, category, description, date, status } = req.body;

    try {
        const transaction = new Transaction({
            user: req.user._id,
            amount,
            type,
            category,
            description,
            date,
            status,
        });

        const createdTransaction = await transaction.save();
        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  Get Transactions
export const getTransactions = async (req, res) => {
    try {
        let transactions;
        if (req.user.role === "Admin") {
            transactions = await Transaction.find({}).populate(
                "user",
                "name email"
            );
        } else {
            transactions = await Transaction.find({ user: req.user._id });
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
    const { amount, type, category, description, date, status } = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        transaction.amount = amount || transaction.amount;
        transaction.type = type || transaction.type;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;
        transaction.status = status || transaction.status;

        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Delete Transaction
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
