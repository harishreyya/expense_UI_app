import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { getTimeSeriesData } from "../../utils/finance";
import { useTransactions } from "../../context/TransactionsContext";

function BalanceChart() {
  const { transactions } = useTransactions();
  const data = getTimeSeriesData(transactions);

  const balances = data.map((d) => d.balance);

  const currentBalance = balances.at(-1) || 0;
  const maxBalance = balances.length ? Math.max(...balances) : 0;
  const minBalance = balances.length ? Math.min(...balances) : 0;

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700">
        📉 No data available
      </div>
    );
  }

  return (
    <div
      className="
        bg-white dark:bg-gray-900 
        rounded-2xl p-4 sm:p-6 
        shadow-sm hover:shadow-md 
        transition
        border border-gray-100 dark:border-gray-700
      "
    >

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
            Balance Trend
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Track your financial growth over time
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Current
          </p>
          <p className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
            ₹{currentBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-4 text-sm">
        
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            Highest
          </p>
          <p className="font-semibold text-green-600 dark:text-green-400 text-sm sm:text-base">
            ₹{maxBalance.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            Lowest
          </p>
          <p className="font-semibold text-red-500 dark:text-red-400 text-sm sm:text-base">
            ₹{minBalance.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="w-full h-52 sm:h-64 md:h-72">
        <ResponsiveContainer>
          <AreaChart data={data}>

            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              className="dark:stroke-gray-700"
              opacity={0.2}
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              stroke="#9CA3AF"
            />

            <YAxis
              tickFormatter={(value) => `₹${value / 1000}k`}
              tick={{ fontSize: 10 }}
              stroke="#9CA3AF"
            />

            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;

                const item = payload[0].payload;

                return (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                    <p className="font-medium text-gray-600 dark:text-gray-300">
                      {item.date}
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      ₹{item.balance.toLocaleString()}
                    </p>
                  </div>
                );
              }}
            />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366F1"
              fill="url(#colorBalance)"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default BalanceChart;