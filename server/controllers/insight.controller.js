import OpenAI from "openai";
import Transaction from "../models/transaction.model.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
console.log("apikey", apiKey);
const openai = new OpenAI({ apiKey });

export const generateInsights = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found." });
        }

        const transactionSummary = transactions
            .map(
                (txn) =>
                    `${txn.type} of ₹${txn.amount} in ${
                        txn.category
                    } on ${new Date(txn.date).toDateString()}`
            )
            .join("; ");

        const prompt = `Analyze the following transactions and provide financial insights and recommendations for budgeting and investments: ${transactionSummary}`;

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json({
            insights: aiResponse.choices[0].message.content,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
