import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import ChartComponent from "./components/chart";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>DHT11 Sensor Visualization</h1>
      <SensorGraph />
    </div>
  );
};

function App() {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleImageVisibility = () => {
    setIsLoading(true);
    setIsImageVisible(false);
    setTimeout(() => {
      setIsImageVisible(true);
      setIsLoading(false);
    }, 3000);
  };


  const recordTemperatureData = () => {
    console.log("Recording temperature data...");
    setTimeout(() => {
      console.log("Data recorded to Excel...");
      console.log("Generating graph...");
    }, 2000);
  };

  return (
    <div className="w-screen h-screen bg-darkgray-100 relative overflow-hidden">
      <Header />

      <main className="w-full h-full pt-16 flex">
        {/* Sidebar on the left */}
        <div className="flex flex-col w-1/4 p-4">
          <Sidebar />
          <div className="mt-44 ml-44">
            <FileUpload />
          </div>
        </div>

        {/* Main content area */}
        <div className="w-3/4 flex flex-col justify-between p-4">
          {/* Content with the graph and button */}
          <div className="mb-4">
            <button
              onClick={() => {
                recordTemperatureData();
                toggleImageVisibility();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isLoading ? "Generating..." : "Generate Temperature Graph"}
            </button>

            {isImageVisible && (
              <div className="mt-2">
                <ChartComponent />
              </div>
            )}
          </div>

          {/* PlayCanvas iframe */}
          <div className="mt-4 flex justify-center">
            <iframe
              src="https://playcanvas.com/supersplat/editor/" //can be switched with local host that contains playcanvas with personlized details on github repo
              title="PlayCanvas"
              className="w-full h-[500px] border-2 border-gray-300 rounded-md"
              style={{ maxWidth: "1200px" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
