import { useTransactions } from "../../context/TransactionsContext";
import { useRole } from "../../context/RoleContext";

function TransactionRow({ transaction, onEdit }) {
  const { deleteTransaction } = useTransactions();
  const { role } = useRole();

  const formattedDate = new Date(transaction.date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const isIncome = transaction.type === "income";

  return (
    <tr
      className="
        group 
        hover:bg-gray-50 dark:hover:bg-gray-800/50 
        transition-all duration-200
      "
    >
      
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
        {formattedDate}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          
          <div
            className="
              w-9 h-9 rounded-xl 
              bg-gray-100 dark:bg-gray-800 
              flex items-center justify-center 
              text-sm font-semibold 
              text-gray-600 dark:text-gray-300
              group-hover:scale-105 transition
            "
          >
            {transaction.category.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {transaction.category}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {isIncome ? "Income" : "Expense"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 ">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            isIncome
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </td>

      {/* AMOUNT */}
      <td
        className={`px-4 py-4 text-right font-semibold ${
          isIncome
            ? "text-green-600 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        {isIncome ? "+" : "-"}₹{transaction.amount}
      </td>

      {/* ACTIONS */}
      {role === "admin" && (
        <td className="px-4 py-4 text-right">
          <div className="flex justify-end gap-3">
            
            <button
              onClick={() => onEdit(transaction)}
              className="
                text-blue-500 dark:text-blue-400 
                text-xs hover:underline
              "
            >
              Edit
            </button>

            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="
                text-red-500 dark:text-red-400 
                text-xs hover:underline
              "
            >
              Delete
            </button>

          </div>
        </td>
      )}
    </tr>
  );
}

export default TransactionRow;