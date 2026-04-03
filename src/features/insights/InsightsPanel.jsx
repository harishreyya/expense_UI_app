import { useTransactions } from "../../context/TransactionsContext";
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
} from "../../utils/insights";

function InsightsPanel() {
  const { transactions } = useTransactions();

  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const percentage = totalExpense
    ? ((highest.amount / totalExpense) * 100).toFixed(1)
    : 0;

  const income = monthly?.currData.income || 0;
  const expense = monthly?.currData.expense || 0;

  const balanceTrend = income - expense;

  return (
    <div className="space-y-8">
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Insights & Analytics
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Smart analysis of your financial behavior
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          className="
            bg-white dark:bg-gray-900 
            p-6 rounded-2xl shadow-sm 
            border border-gray-100 dark:border-gray-700
            hover:shadow-lg transition
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Highest Spending
            </p>
            <span className="text-red-500 text-lg">🔥</span>
          </div>

          <p className="text-xl font-bold mt-3 text-gray-800 dark:text-gray-100">
            {highest.category || "N/A"}
          </p>

          <p className="text-sm text-gray-400">
            ₹{highest.amount.toLocaleString()}
          </p>

          <div className="mt-4">
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 dark:bg-red-400 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {percentage}% of total expenses
            </p>
          </div>
        </div>

        {monthly && (
          <div
            className="
              bg-white dark:bg-gray-900 
              p-6 rounded-2xl shadow-sm 
              border border-gray-100 dark:border-gray-700
              hover:shadow-lg transition
            "
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Comparison
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {monthly.prevMonth} → {monthly.currMonth}
            </p>

            <div className="mt-4 space-y-3">
              
              <div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Income</span>
                  <span>₹{income}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 dark:bg-green-400"
                    style={{ width: `${Math.min((income / 100000) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Expenses</span>
                  <span>₹{expense}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 dark:bg-red-400"
                    style={{ width: `${Math.min((expense / 100000) * 100, 100)}%` }}
                  />
                </div>
              </div>

            </div>

            <p
              className={`mt-3 text-sm font-medium ${
                balanceTrend >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {balanceTrend >= 0
                ? "↑ Positive balance"
                : "↓ Negative balance"}
            </p>
          </div>
        )}

        <div
          className="
            bg-gradient-to-br 
            from-indigo-500 to-purple-600 
            dark:from-indigo-600 dark:to-purple-800
            text-white 
            p-6 rounded-2xl shadow-lg 
            relative overflow-hidden
          "
        >
      
          <div className="absolute inset-0 opacity-10 bg-white blur-2xl" />

          <p className="text-sm opacity-90">
            Smart Insight
          </p>

          <p className="mt-3 text-sm leading-relaxed">
            You are spending the most on{" "}
            <span className="font-semibold">
              {highest.category}
            </span>
            , which accounts for{" "}
            <span className="font-semibold">
              {percentage}%
            </span>{" "}
            of your total expenses.
          </p>

          <p className="mt-2 text-xs opacity-80">
            💡 Try reducing this category to improve savings.
          </p>
        </div>

      </div>
    </div>
  );
}

export default InsightsPanel;