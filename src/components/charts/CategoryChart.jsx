import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCategoryData } from "../../utils/finance";
import { useTransactions } from "../../context/TransactionsContext";

const getColor = (index, total) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 55%)`;
};

function CategoryChart() {
  const { transactions } = useTransactions();
  const data = getCategoryData(transactions);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const topCategory = data.reduce(
    (max, curr) => (curr.value > max.value ? curr : max),
    data[0] || {}
  );

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700">
        📊 No category data
      </div>
    );
  }

  return (
    <div
      className="
        bg-white dark:bg-gray-900 
        rounded-2xl p-4 sm:p-6 
        shadow-sm 
        border border-gray-100 dark:border-gray-700
      "
    >

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
            Spending Analytics
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Category-wise expense breakdown
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Top Category
          </p>
          <p className="font-semibold text-red-500 dark:text-red-400 text-sm sm:text-base">
            {topCategory?.name || "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        <div className="w-full md:w-1/2 h-52 sm:h-64 md:h-72 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={getColor(i, data.length)} />
                ))}
              </Pie>

              <Tooltip
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;

                  const item = payload[0].payload;

                  return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 text-xs sm:text-sm">
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {item.name}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        ₹{item.value.toLocaleString()}
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              Total
            </p>
            <p className="text-sm sm:text-lg font-bold text-gray-800 dark:text-gray-100">
              ₹{total.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, index) => {
            const percent = ((item.value / total) * 100).toFixed(1);

            return (
              <div key={index} className="space-y-1">
                
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="truncate max-w-[120px] sm:max-w-full text-gray-700 dark:text-gray-200">
                    {item.name}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    ₹{item.value.toLocaleString()}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: getColor(index, data.length),
                    }}
                  />
                </div>

                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                  {percent}%
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default CategoryChart;