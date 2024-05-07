import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const HistogramChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && Array.isArray(data.values)) {
      const values = data.values.map(parseFloat);
      const labels = data.time.map((time, index) => `Interv. ${index + 1}`);

      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const yAxisMin = Math.floor(minValue - 10);
      const yAxisMax = Math.ceil(maxValue + 10);

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Valores",
              data: values,
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.3,
              pointLabel: {
                display: true,
                font: {
                  size: 10,
                },
              },
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: yAxisMin,
              max: yAxisMax,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default HistogramChart;
