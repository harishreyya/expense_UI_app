import SummaryCards from "../features/dashboard/SummaryCards";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryChart from "../components/charts/CategoryChart";
import TransactionTable from "../features/transactions/TransactionTable";
import InsightsPanel from "../features/insights/InsightsPanel";
import { useTransactions } from "../context/TransactionsContext";

function Dashboard() {
  const { transactions } = useTransactions();

  const totalTransactions = transactions.length;

  const categories = [
    ...new Set(transactions.map((t) => t.category)),
  ];

  const latestDate = transactions
    .map((t) => new Date(t.date))
    .sort((a, b) => b - a)[0]
    ?.toLocaleDateString("en-IN");

  return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome back 👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Here's your financial overview
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm text-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Transactions</p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {totalTransactions}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm text-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Categories</p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {categories.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm text-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Last Updated</p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {latestDate}
            </p>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCards />
      </div>

      <div className="
        bg-white/60 dark:bg-gray-900/60 
        backdrop-blur 
        rounded-3xl 
        p-4 md:p-6 
        shadow-sm 
        border border-gray-100 dark:border-gray-700
      ">
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Financial Insights
          </h3>

          <span className="text-xs text-gray-400 dark:text-gray-500">
            Updated in real-time
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <CategoryChart />
        </div>

      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Transactions
        </h3>
        <TransactionTable />
      </div>

      <div className="
        bg-gradient-to-r 
        from-blue-100 to-orange-100 
        dark:from-gray-800 dark:to-gray-900
        text-gray-800 dark:text-gray-100
        rounded-2xl p-5 shadow-lg
      ">
        <InsightsPanel />
      </div>

    </div>
  );
}

export default Dashboard;