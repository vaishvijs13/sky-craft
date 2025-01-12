import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

const SensorGraph: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Ensure backgroundColor is here
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Ensure backgroundColor is here
        fill: true,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://<Raspberry-Pi-IP>:5000/data");
      const result = await response.json();

      const runTime = result.timestamps.map((timestamp: string, index: number) => 
        `T+${index * 2}s` // Data is collected every 2 seconds
      );

      setChartData({
        labels: runTime, // Timestamps
        datasets: [
          {
            label: "Temperature (°C)",
            data: result.temperature,
            borderColor: "red",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
          {
            label: "Humidity (%)",
            data: result.humidity,
            borderColor: "blue",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch on component mount
    const interval = setInterval(fetchData, 2000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>DHT11 Sensor Data</h2>
      <p>Flight Run Time is displayed on the x-axis.</p>
      <Line data={chartData} />
    </div>
  );
};

export default SensorGraph;
