// controllers/transactionController.js
import Transaction from "../models/Transaction.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { userId, type, amount, description } = req.body;

    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      description,
    });

    await newTransaction.save();

    res.status(201).json({ message: "Transaction created successfully!", newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

// Get all transactions of a user
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ userId });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, type, amount, description } = req.body;
  
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { userId, type, amount, description },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found!" });
      }
  
      res.status(200).json({ message: "Transaction updated successfully!", updatedTransaction });
    } catch (error) {
      res.status(500).json({ message: "Error updating transaction", error });
    }
  };

  // Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found!" });
      }
  
      res.status(200).json({ message: "Transaction deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting transaction", error });
    }
  };
  
