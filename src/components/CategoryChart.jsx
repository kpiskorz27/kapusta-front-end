import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useMediaQuery } from "react-responsive";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js"; // Import the Chart object to register plugins

// Register the plugin
Chart.register(ChartDataLabels);

const CategoryChart = ({ categoryName, data }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // Process data to extract descriptions and amounts
  const processedData = Object.entries(data)
    .filter(([key]) => key !== "total") // Exclude the 'total' key from the dataset
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

  // Define a function to alternate the colors based on index
  const getBackgroundColor = (index) => {
    return index % 2 === 0 ? "#FF751D" : "#FFDAC0"; // Alternate colors
  };

  // Generate background colors for the chart data
  const backgroundColors = processedData.map((_, index) =>
    getBackgroundColor(index)
  );

  // Prepare vertical and horizontal chart data using processed descriptions and amounts
  const chartDataVertical = {
    labels: processedData.map((item) => item.description), // Use full descriptions
    datasets: [
      {
        data: processedData.map((item) => item.amount), // Use the amounts from the processed data
        backgroundColor: backgroundColors, // Apply dynamic background colors
        barThickness: 38, // Fixed bar thickness for desktop and tablet
        borderRadius: 10, // Rounded corners
      },
    ],
  };

  const chartDataHorizontal = {
    labels: processedData.map((item) => item.description), // Use descriptions for labels
    datasets: [
      {
        data: processedData.map((item) => item.amount), // Use amounts for the data
        backgroundColor: backgroundColors, // Apply dynamic background colors
        barThickness: 15, // Thinner bar for mobile horizontal layout
        borderRadius: 10, // Rounded corners
      },
    ],
  };

  // Vertical chart options with the y scale hidden and amounts at the top of bars
  const optionsVertical = {
    maintainAspectRatio: false,
    indexAxis: "x", // Vertical chart for larger screens
    responsive: true,
    layout: {
      padding: {
        top: 50,
        bottom: 13, // Increase top padding to prevent labels from clipping
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines
        },
        border: {
          display: false, // Hide the axis baseline (floor)
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
        display: false, // Hide the y-axis
        grid: {
          display: false, // Remove grid lines
        },
        border: {
          display: false, // Hide the axis baseline
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the label/legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: true, // Show the amount on top of each bar
        anchor: "end",
        align: "end",
        offset: 10, // Add space between the label and the bar
        clip: false, // Prevent the label from being clipped
        formatter: (value) => `${value} PLN`, // Format the amount
        font: {
          size: 12,
        },
        color: "#52555f",
      },
    },
  };

  // Horizontal chart options for mobile with descriptions above the bars
  const optionsHorizontal = {
    maintainAspectRatio: false,
    indexAxis: "y", // Horizontal chart for mobile
    responsive: true,
    layout: {
      padding: {
        top: 20, // Add more padding to ensure descriptions have space above the bars
        right: 40, // Add padding to the right for better appearance
      },
    },
    scales: {
      x: {
        display: false, // Hide the x scale on mobile
        grid: {
          display: false, // Remove grid lines
        },
        border: {
          display: false, // Hide the axis baseline (floor)
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
          display: false, // Remove grid lines
        },
        border: {
          display: false, // Hide the axis baseline
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the label/legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: true, // Show the amount on top of each bar
        anchor: "end",
        align: "end", // Align amounts at the end of the bars
        offset: 5,
        clip: false, // Ensure labels do not go out of the container
        formatter: (value) => `${value} PLN`, // Keep only the amount on the bars
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
          {/* For non-mobile screens, display vertical chart */}
          {!isMobile && (
            <Bar
              options={optionsVertical}
              data={chartDataVertical}
              height={378}
            />
          )}

          {/* For mobile screens, display horizontal chart */}
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
