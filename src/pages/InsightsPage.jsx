import InsightsPanel from "../features/insights/InsightsPanel";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryChart from "../components/charts/CategoryChart";

function InsightsPage() {
  return (
    <div className="space-y-8">

      

      <div
        className="
          bg-white dark:bg-gray-900
          rounded-2xl 
          p-4 md:p-5 
          shadow-sm 
          border border-gray-100 dark:border-gray-700
        "
      >
        <InsightsPanel />
      </div>

      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Deep insights into your financial activity
        </p>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <CategoryChart />
        </div>
      </div>

    </div>
  );
}

export default InsightsPage;