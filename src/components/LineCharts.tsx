import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js"; // Import ChartData and ChartOptions types
import moment from "moment";
interface DataItem {
  grantTime: string;
  // Add other properties if present in the actual data
}

interface LineChartProps {
  data: DataItem[]; // Define the type for the 'data' prop
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Define the ref type

  useEffect(() => {
    const grantTimeCounts: { [key: string]: number } = data.reduce(
      (counts: any, item) => {
        const date = item.grantTime;
        counts[date] = (counts[date] || 0) + 1;
        return counts;
      },
      {}
    );

    const getChartLabels = (): string[] => Object.keys(grantTimeCounts);
    const getChartData = (): number[] => Object.values(grantTimeCounts);

    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      // Define the chart data and options with appropriate types
      const chartData: ChartData = {
        labels: getChartLabels(),
        datasets: [
          {
            label: "Number of occurrences",
            data: getChartData(),
            backgroundColor: "rgba(52, 152, 219, 0.2)",
            borderColor: "rgba(41, 128, 185, 1)",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "rgba(41, 128, 185, 1)",
            pointHoverRadius: 6,
          },
        ],
      };

      const chartOptions: ChartOptions = {
        responsive: true,
      };

      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default LineChart;
