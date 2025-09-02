import { toast } from "react-toastify";

const API_URL =
  "https://finance-app-backend-e0xc.onrender.com/api/transactions";

// Add a new transaction
export const createTransaction = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create transaction");
  }

  return await response.json();
};

// - getTransactionsByUserId(userId)
export const getTransactions = async (userId) => {
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          toast.error("Failed to fetch transactions");
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        return data.transactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Error fetching transactions: " + error.message);
      }
    };

// updateTransaction(id, data)

export const updateTransaction = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      toast.error("Failed to update transaction");
      throw new Error("Failed to update transaction");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating transaction:", error);
    toast.error("Error updating transaction: " + error.message);
  }
};

// deleteTransaction(id)
export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      toast.error("Failed to delete transaction");
      throw new Error("Failed to delete transaction");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    toast.error("Error deleting transaction: " + error.message);
  }
};
// - deleteTransaction(id)
// - updateTransaction(id, data)
