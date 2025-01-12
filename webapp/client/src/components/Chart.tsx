import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components globally
Chart.register(...registerables);

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return; // Prevent errors if the ref is null

    // Initialize the Chart.js chart
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20], // X-axis labels
        datasets: [
          {
            label: 'Temperature in Celsius',
            data: [21, 21.5, 21.3, 21, 20.5, 20, 21, 21.7, 21.5, 22, 22.3], // Y-axis data
            borderColor: '#2a9df4',
            backgroundColor: 'rgba(42, 157, 244, 0.2)', // Light blue fill
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#2a9df4',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Flight Run Time, Seconds',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature in Celsius',
            },
            min: 19,
            max: 22.5,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => chart.destroy();
  }, []);

  return (
    <div style={{ width: '600px', margin: '20px auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
