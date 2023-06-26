import React, { useState } from "react";
import { Line } from "react-chartjs-2";

enum ChartView {
  Day = "day",
  Week = "week",
  Month = "month",
}

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
};

const data: ChartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3, 8, 10, 15, 20, 25, 30],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "day",
        },
      },
    ],
  },
};

const ChartComponent = () => {
  const [view, setView] = useState<ChartView>(ChartView.Day);

  const onViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chartView = e.target.value as ChartView;
    setView(chartView);
  };

  const filteredData = () => {
    if (view === ChartView.Day) {
      return data;
    }

    if (view === ChartView.Week) {
      const weekData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: data.datasets.map((dataset) => {
          const weekValues = [
            dataset.data.slice(0, 7).reduce((a, b) => a + b),
            dataset.data.slice(7, 14).reduce((a, b) => a + b),
            dataset.data.slice(14, 21).reduce((a, b) => a + b),
            dataset.data.slice(21, 28).reduce((a, b) => a + b),
          ];
          return { ...dataset, data: weekValues };
        }),
      };
      return weekData;
    }

    if (view === ChartView.Month) {
      const monthData = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: data.datasets.map((dataset) => {
          const monthValues = [
            dataset.data.slice(0, 31).reduce((a, b) => a + b),
            dataset.data.slice(31, 59).reduce((a, b) => a + b),
            dataset.data.slice(59, 90).reduce((a, b) => a + b),
            dataset.data.slice(90, 120).reduce((a, b) => a + b),
            dataset.data.slice(120, 151).reduce((a, b) => a + b),
            dataset.data.slice(151, 181).reduce((a, b) => a + b),
            dataset.data.slice(181, 212).reduce((a, b) => a + b),
            dataset.data.slice(212, 243).reduce((a, b) => a + b),
            dataset.data.slice(243, 273).reduce((a, b) => a + b),
            dataset.data.slice(273, 304).reduce((a, b) => a + b),
            dataset.data.slice(304, 334).reduce((a, b) => a + b),
            dataset.data.slice(334).reduce((a, b) => a + b),
          ];
          return { ...dataset, data: monthValues };
        }),
      };
      return monthData;
    }

    return data;
  };

  return (
    <div>
      <h1>Sales Chart</h1>
      <Line data={filteredData()} options={options} />
      <select value={view} onChange={onViewChange}>
        <option value={ChartView.Day}>Daily</option>
        <option value={ChartView.Week}>Weekly</option>
        <option value={ChartView.Month}>Monthly</option>
      </select>
    </div>
  );
};

export default ChartComponent;
