import Transaction from "../models/transaction.model.js";

// Generate financial report with optional filters
export const getFinancialReport = async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        const userId = req.user.role === "Admin" ? {} : { user: req.user._id };

        // Build query with optional filters
        const query = { ...userId };

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        if (category) {
            query.category = category;
        }

        const transactions = await Transaction.find(query);

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
