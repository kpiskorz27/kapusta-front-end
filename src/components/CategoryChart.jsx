import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useMediaQuery } from "react-responsive";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";

Chart.register(ChartDataLabels);

const CategoryChart = ({ categoryName, data }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const processedData = Object.entries(data)
    .filter(([key]) => key !== "total")
    .map(([description, amount]) => ({
      description,
      amount,
    }));

  useEffect(() => {
    console.log(
      "Processed data:",
      processedData.map((item) => item.description)
    );
  }, [processedData]);

  const getBackgroundColor = (index) => {
    return index % 2 === 0 ? "#FF751D" : "#FFDAC0";
  };

  const backgroundColors = processedData.map((_, index) =>
    getBackgroundColor(index)
  );

  const chartDataVertical = {
    labels: processedData.map((item) => item.description),
    datasets: [
      {
        data: processedData.map((item) => item.amount),
        backgroundColor: backgroundColors,
        barThickness: 38,
        borderRadius: 10,
      },
    ],
  };

  const chartDataHorizontal = {
    labels: processedData.map((item) => item.description),
    datasets: [
      {
        data: processedData.map((item) => item.amount),
        backgroundColor: backgroundColors,
        barThickness: 15,
        borderRadius: 10,
      },
    ],
  };

  const optionsVertical = {
    maintainAspectRatio: false,
    indexAxis: "x",
    responsive: true,
    layout: {
      padding: {
        top: 50,
        bottom: 13,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#52555f",
          font: {
            weight: 400,
            size: 12,
          },
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        offset: 10,
        clip: false,
        formatter: (value) => `${value} PLN`,
        font: {
          size: 12,
        },
        color: "#52555f",
      },
    },
  };

  const optionsHorizontal = {
    maintainAspectRatio: false,
    indexAxis: "y",
    responsive: true,
    layout: {
      padding: {
        top: 20,
        right: 40,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#52555f",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        offset: 5,
        clip: false,
        formatter: (value) => `${value} PLN`,
        font: {
          size: 12,
        },
        color: "#52555f",
      },
    },
  };

  return (
    <div className="category-chart-container">
      <div className="category-chart-wrapper">
        <div className="category-chart">
          {!isMobile && (
            <Bar
              options={optionsVertical}
              data={chartDataVertical}
              height={378}
            />
          )}

          {isMobile && (
            <Bar
              options={optionsHorizontal}
              data={chartDataHorizontal}
              width={280}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
