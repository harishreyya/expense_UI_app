import TransactionTable from "../features/transactions/TransactionTable";
import { useRole } from "../context/RoleContext";
import { useTransactions } from "../context/TransactionsContext";
import { useState } from "react";
import TransactionModal from "../features/transactions/TransactionModal";
import { exportToCSV } from "../utils/exportCSV";

function TransactionsPage() {
  const { transactions } = useTransactions();
  const { role } = useRole();

  const [open, setOpen] = useState(false);

  const total = transactions.length;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="space-y-8">

      <div
        className="
          bg-gradient-to-r 
          from-yellow-100 to-orange-200 
          dark:from-gray-800 dark:to-gray-900
          text-gray-800 dark:text-gray-100
          rounded-3xl p-6 shadow-lg 
          flex flex-col md:flex-row md:items-center md:justify-between gap-4
        "
      >
        
        <div>
          <h2 className="text-2xl font-bold">
            Transactions Dashboard
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your financial activity
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">

          {role === "admin" && (
            <button
              onClick={() => setOpen(true)}
              className="
                bg-white dark:bg-gray-700 
                text-indigo-600 dark:text-indigo-400 
                px-5 py-2 rounded-xl text-sm font-medium shadow 
                hover:scale-105 transition
              "
            >
              + Add Transaction
            </button>
          )}

          <button
            onClick={() => exportToCSV(transactions)}
            className="
              bg-indigo-600 text-white 
              px-4 py-2 rounded-xl text-sm
              hover:bg-indigo-700 transition
            "
          >
            Export CSV
          </button>

        </div>
      </div>

      <div
        className="
          bg-white/60 dark:bg-gray-900/60 
          backdrop-blur 
          rounded-3xl 
          p-4 md:p-6 
          shadow-sm 
          border border-gray-100 dark:border-gray-700
        "
      >
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            All Transactions
          </h3>

          <span className="text-xs text-gray-400 dark:text-gray-500">
            Live data • Updated instantly
          </span>

        </div>

        <TransactionTable />
      </div>

      {open && (
        <TransactionModal onClose={() => setOpen(false)} />
      )}

    </div>
  );
}

export default TransactionsPage;