import React, { useState } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ChartLibrary from "./components/ChartLibrary";
import ChartComponent from "./components/chartcomponent";
import ChatComponent from "./components/ChatComponent"; // Import ChatComponent

function SelfService(): JSX.Element {
  const validChartTypes = ["bar", "pie", "line", "column", "polar", "table"];
  const [isChartLibraryOpen, setIsChartLibraryOpen] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<
    { type: string; position: { x: number; y: number } }[]
  >([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChartLibrary = () => {
    setIsChartLibraryOpen(true);
  };

  const closeChartLibrary = () => {
    setIsChartLibraryOpen(false);
  };

  const handleChartSelection = (chartType: string) => {
    if (validChartTypes.includes(chartType.toLowerCase())) {
      setSelectedCharts([
        ...selectedCharts,
        { type: chartType.toLowerCase(), position: { x: 0, y: 0 } },
      ]);
    }
    closeChartLibrary();
  };

  const handleDeleteChart = (index: number) => {
    const updatedCharts = [...selectedCharts];
    updatedCharts.splice(index, 1);
    setSelectedCharts(updatedCharts);
  };

  const handleDragStop = (index: number, data: { x: number; y: number }) => {
    const updatedCharts = [...selectedCharts];
    updatedCharts[index] = {
      ...updatedCharts[index],
      position: { x: data.x, y: data.y },
    };
    setSelectedCharts(updatedCharts);
  };

  const openChat = () => {
    // Toggle the chat state
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);

    // Close the chart library when opening the chat
    closeChartLibrary();
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <div style={{ flex: 1, position: "relative" }}>
          {/* Content of your page */}
          <Button
            onClick={openChartLibrary}
            variant="contained"
            color="primary"
            style={{ color: "white", marginBottom: "16px" }}
          >
            Build Your Report
          </Button>

          {/* Button to open the chat */}
          <Button
            onClick={() => {
              openChat();
              closeChartLibrary(); // Close chart library when opening chat
            }}
            variant="contained"
            color="primary"
            style={{
              color: "white",
              marginLeft: "8px", // Add margin to separate buttons
              marginBottom: "16px", // Add margin to match styling
            }}
          >
            Help
          </Button>

          {/* Render selected charts with drag and resize */}
          {selectedCharts.map((chart, index) => (
            <Draggable
              key={index}
              position={chart.position}
              bounds="parent"
              onStop={(e, data) => handleDragStop(index, data)}
            >
              <ChartComponent
                chartType={chart.type}
                position={chart.position}
                onDelete={() => handleDeleteChart(index)}
                onDragStop={(position) => handleDragStop(index, position)}
              />
            </Draggable>
          ))}

          {/* Render Chart Library only if open */}
          {isChartLibraryOpen && (
            <ChartLibrary
              charts={validChartTypes}
              onSelectChart={handleChartSelection}
              onClose={closeChartLibrary}
            />
          )}

          {/* Render ChatComponent only if open */}
          {isChatOpen && <ChatComponent />}
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default SelfService;
