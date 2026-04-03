import { useState, useEffect } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import { useRole } from "../../context/RoleContext";
import TransactionFilters from "./TransactionFilters";
import TransactionRow from "./TransactionRow";
import TransactionModal from "./TransactionModal";

function TransactionTable() {
  const { role } = useRole();
  const { transactions, deleteTransaction } = useTransactions();

  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  const total = filtered.length;

  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const handleFilter = ({ search, type, sort }) => {
    let result = [...transactions];

    if (search) {
      result = result.filter((t) =>
        t.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      result = result.filter((t) => t.type === type);
    }

    if (sort === "latest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "high") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sort === "low") {
      result.sort((a, b) => a.amount - b.amount);
    }

    setFiltered(result);
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Transactions
          </p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            {total}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl shadow-sm border border-green-100 dark:border-green-800">
          <p className="text-xs text-green-600 dark:text-green-400">
            Income
          </p>
          <p className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-400">
            ₹{income.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl shadow-sm border border-red-100 dark:border-red-800">
          <p className="text-xs text-red-500 dark:text-red-400">
            Expenses
          </p>
          <p className="text-lg sm:text-xl font-semibold text-red-600 dark:text-red-400">
            ₹{expense.toLocaleString()}
          </p>
        </div>

      </div>

      <TransactionFilters onFilter={handleFilter} />

      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">

            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left">Date</th>
                <th className="px-3 sm:px-4 py-3 text-left">Category</th>
                <th className="px-3 sm:px-4 py-3 ">Type</th>
                <th className="px-3 sm:px-4 py-3 text-right">Amount</th>

                {role === "admin" && (
                  <th className="px-3 sm:px-4 py-3 text-right">Actions</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  onEdit={(tx) => {
                    setSelectedTx(tx);
                    setOpen(true);
                  }}
                />
              ))}
            </tbody>

          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((t) => (
            <div
              key={t.id}
              className="
                bg-white dark:bg-gray-900 
                p-4 rounded-2xl shadow-sm border 
                border-gray-100 dark:border-gray-700
              "
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {t.category}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(t.date).toLocaleDateString("en-IN")}
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {t.type}
                </span>

                {role === "admin" && (
                    <>
                  <button
                    onClick={() => {
                      setSelectedTx(t);
                      setOpen(true);
                    }}
                    className="text-xs text-indigo-600 dark:text-indigo-400"
                  >
                    Edit
                  </button>
                   <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
            </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            No transactions
          </div>
        )}
      </div>

      {open && (
        <TransactionModal
          onClose={() => {
            setOpen(false);
            setSelectedTx(null);
          }}
          initialData={selectedTx}
        />
      )}

    </div>
  );
}

export default TransactionTable;