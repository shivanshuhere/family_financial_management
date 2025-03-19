import Transaction from "../models/transaction.model.js";

// Generate financial summary
export const getFinancialReport = async (req, res) => {
    try {
        const userId = req.user.role === "Admin" ? {} : { user: req.user._id };

        const transactions = await Transaction.find(userId);

        const summary = {
            income: 0,
            expenses: 0,
            investments: 0,
            categoryBreakdown: {},
        };

        transactions.forEach((transaction) => {
            if (transaction.type === "Income")
                summary.income += transaction.amount;
            if (transaction.type === "Expense")
                summary.expenses += transaction.amount;
            if (transaction.type === "Investment")
                summary.investments += transaction.amount;

            if (!summary.categoryBreakdown[transaction.category]) {
                summary.categoryBreakdown[transaction.category] = 0;
            }
            summary.categoryBreakdown[transaction.category] +=
                transaction.amount;
        });

        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
