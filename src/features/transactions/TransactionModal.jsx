import { useState, useEffect } from "react";
import { useTransactions } from "../../context/TransactionsContext";

function TransactionModal({ onClose, initialData }) {
  const { addTransaction, editTransaction } = useTransactions();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "expense",
    date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!form.category.trim()) newErrors.category = "Category required";
    if (!form.amount || Number(form.amount) <= 0)
      newErrors.amount = "Enter valid amount";
    if (!form.date) newErrors.date = "Select a date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTx = {
      ...form,
      id: initialData?.id || Date.now().toString(),
      amount: Number(form.amount),
    };

    if (initialData) {
      editTransaction(newTx);
    } else {
      addTransaction(newTx);
    }

    onClose();
  };

  const isValid =
    form.category && form.amount > 0 && form.date;

  return (
    <div
      className="
        fixed inset-0 
        bg-black/40 dark:bg-black/70 
        backdrop-blur-sm 
        flex items-center justify-center 
        z-50
      "
      onClick={onClose}
    >
     
      <div
        className="
          bg-white dark:bg-gray-900 
          rounded-3xl p-6 w-full max-w-md 
          shadow-xl border border-gray-100 dark:border-gray-700
        "
        onClick={(e) => e.stopPropagation()}
      >
      
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your financial activity details
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Category
            </label>
            <input
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              placeholder="e.g. Food, Salary"
              className="
                w-full rounded-xl px-3 py-2 text-sm outline-none
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500
              "
            />
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Amount
            </label>
            <input
              value={form.amount}
              type="number"
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              placeholder="₹ Enter amount"
              className="
                w-full rounded-xl px-3 py-2 text-sm outline-none
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-indigo-500
              "
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">
                {errors.amount}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Date
            </label>
            <input
              value={form.date}
              type="date"
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="
                w-full rounded-xl px-3 py-2 text-sm outline-none
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-indigo-500
              "
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Type
            </label>

            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {["expense", "income"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2 text-sm rounded-lg transition ${
                    form.type === t
                      ? t === "income"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {t === "income" ? "Income" : "Expense"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 text-sm 
                text-gray-500 dark:text-gray-400 
                hover:text-gray-700 dark:hover:text-gray-200
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className="
                bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium shadow
                hover:bg-indigo-700 transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {initialData ? "Update" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TransactionModal;