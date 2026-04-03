import { createContext, useContext, useEffect, useState } from "react";
import { transactions as initialData } from "../data/transactions";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      localStorage.setItem("transactions", JSON.stringify(initialData));
      setTransactions(initialData);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
    }
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const editTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updatedTx.id ? updatedTx : t
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () =>
  useContext(TransactionsContext);