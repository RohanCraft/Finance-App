// routes/transactionRoutes.js
import express from "express";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/transactions", createTransaction);

router.get("/transactions/:userId", getTransactions);

router.put("/transactions/:id", updateTransaction);

router.delete("/transactions/:id", deleteTransaction);

export default router;
