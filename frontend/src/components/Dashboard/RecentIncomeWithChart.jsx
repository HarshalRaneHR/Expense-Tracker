import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  const prepareChartData = () => {
    const chartData = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(chartData);
  };

  useEffect(() => {
    prepareChartData();
    return () => {
      setChartData([]);
    };
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        llabel="Total Income"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;
