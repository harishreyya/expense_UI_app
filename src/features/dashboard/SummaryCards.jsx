import { calculateSummary } from "../../utils/finance";
import { useTransactions } from "../../context/TransactionsContext";

function SummaryCards() {
  const { transactions } = useTransactions();
  const { income, expenses, balance } = calculateSummary(transactions);

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      trend: "+4.2%",
      trendUp: true,
      icon: "₹",
    },
    {
      title: "Income",
      value: income,
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      trend: "+8.1%",
      trendUp: true,
      icon: "↑",
    },
    {
      title: "Expenses",
      value: expenses,
      color: "from-red-500 to-rose-600",
      textColor: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      trend: "-2.5%",
      trendUp: false,
      icon: "↓",
    },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={index}
          className="
            relative overflow-hidden 
            bg-white dark:bg-gray-900 
            rounded-2xl p-5 
            shadow-sm hover:shadow-lg 
            transition-all duration-300 
            transform hover:-translate-y-1 
            border border-gray-100 dark:border-gray-700
            group
          "
        >
          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
          />

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>

            <div
              className={`
                w-10 h-10 flex items-center justify-center 
                rounded-xl font-semibold
                ${card.bg} ${card.textColor}
              `}
            >
              {card.icon}
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
            ₹{card.value.toLocaleString()}
          </p>

          <div className="mt-2 flex items-center justify-between text-sm">
            
            <div
              className={`flex items-center gap-1 font-medium ${
                card.trendUp
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              <span>{card.trendUp ? "↑" : "↓"}</span>
              <span>{card.trend}</span>
            </div>

            <span className="text-gray-400 dark:text-gray-500 text-xs">
              vs last month
            </span>
          </div>

          <div
            className="
              absolute inset-0 rounded-2xl 
              opacity-0 group-hover:opacity-100 
              transition pointer-events-none 
              bg-gradient-to-r 
              from-transparent 
              via-white/10 
              to-transparent 
              dark:via-white/5
            "
          />
        </div>
      ))}
    </>
  );
}

export default SummaryCards;