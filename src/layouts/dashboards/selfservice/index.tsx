import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ChartLibrary from "./components/ChartLibrary";
import ChartComponent from "./components/chartcomponent";
import ChatComponent from "./components/ChatComponent";
import FilterLibrary from "./components/FilterLibrary";
import FiltersComponent from "./components/FiltersComponent";
import { Filter } from "@sisense/sdk-data";
import html2canvas from "html2canvas";

function SelfService(): JSX.Element {
  const validChartTypes = ["bar", "pie", "line", "column", "polar", "table"];
  const [isChartLibraryOpen, setIsChartLibraryOpen] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<
    { type: string; position: { x: number; y: number } }[]
  >([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFiltersLibraryOpen, setIsFiltersLibraryOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; filter: Filter | null }[]>(
    []
  );

  const [appliedChartFilters, setAppliedChartFilters] = useState<Filter[]>([]);

  const exportRef = useRef(null);

  const openChartLibrary = () => {
    setIsChartLibraryOpen(true);
  };

  const closeChartLibrary = () => {
    setIsChartLibraryOpen(false);
  };

  const handleSelectCharts = (selectedCharts: string[]) => {
    const newCharts = selectedCharts.map((chartType) => ({
      type: chartType.toLowerCase(),
      position: { x: 0, y: 0 },
    }));
    setSelectedCharts((prevSelectedCharts) => [...prevSelectedCharts, ...newCharts]);
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
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
    closeChartLibrary();
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openFiltersLibrary = () => {
    setIsFiltersLibraryOpen(true);
  };

  const closeFiltersLibrary = () => {
    setIsFiltersLibraryOpen(false);
  };

  const handleSelectFilters = (selectedFilters: string[]) => {
    const newFilters = selectedFilters
      .filter(
        (filterType) =>
          filterType.toLowerCase() === "countryfilter" ||
          filterType.toLowerCase() === "datefilter" ||
          filterType.toLowerCase() === "agerangefilter"
      )
      .map((filterType) => {
        switch (filterType.toLowerCase()) {
          case "countryfilter":
            return {
              type: "CountryFilter",
              filter: null,
              position: { x: 0, y: 0 },
            };
          case "datefilter":
            return {
              type: "DateFilter",
              filter: null,
              position: { x: 0, y: 0 },
            };
          case "agerangefilter":
            return {
              type: "AgeRangeFilter",
              filter: null,
              position: { x: 0, y: 0 },
            };
          default:
            return null;
        }
      })
      .filter(Boolean);

    setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, ...newFilters]);
  };

  const handleFilterChange = (index: number, newFilter: Filter | null) => {
    const updatedFilters = [...selectedFilters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      filter: newFilter,
    };

    // Update the appliedChartFilters with non-null filters
    setAppliedChartFilters(
      updatedFilters.filter((filter) => filter.filter !== null).map((filter) => filter.filter)
    );

    setSelectedFilters(updatedFilters);
  };

  const handleFilterDelete = (index: number) => {
    const updatedFilters = [...selectedFilters];
    updatedFilters.splice(index, 1);
    setSelectedFilters(updatedFilters);
  };

  const exportToPDF = () => {
    const dashboardContainer = document.getElementById("dashboard-container");

    if (dashboardContainer) {
      // Save the original box shadow style
      const originalBoxShadow = dashboardContainer.style.boxShadow;

      // Remove box shadow for exporting
      dashboardContainer.style.boxShadow = "none";

      html2canvas(dashboardContainer).then((canvas) => {
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "dashboard-export.png"; // Change the filename as needed
          link.click();
        });
      });

      // Restore original box shadow after exporting
      dashboardContainer.style.boxShadow = originalBoxShadow;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ marginBottom: "16px" }}>
            <Button
              onClick={openChartLibrary}
              variant="contained"
              color="primary"
              style={{ color: "white", marginBottom: "16px" }}
            >
              Build Your Report
            </Button>
            <Button
              onClick={() => {
                openChat();
                closeChartLibrary();
              }}
              variant="contained"
              color="primary"
              style={{
                color: "white",
                marginLeft: "8px",
                marginBottom: "16px",
              }}
            >
              Help
            </Button>
            <Button
              onClick={exportToPDF}
              variant="contained"
              color="primary"
              style={{
                color: "white",
                marginLeft: "8px",
                marginBottom: "16px",
              }}
            >
              Export
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: 1,
                marginRight: "16px",
              }}
            >
              <div
                ref={exportRef}
                id="dashboard-container"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "900px",
                  overflow: "auto",
                  backgroundColor: "white",
                  border: "2px solid transparent",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
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
                      appliedFilters={appliedChartFilters}
                    />
                  </Draggable>
                ))}
              </div>

              {isChartLibraryOpen && (
                <ChartLibrary
                  charts={validChartTypes}
                  onSelectCharts={handleSelectCharts}
                  onClose={closeChartLibrary}
                />
              )}

              {isChatOpen && <ChatComponent />}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "300px",
                backgroundColor: "white",
                border: "2px solid transparent",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white", width: "100%" }}
                onClick={openFiltersLibrary}
              >
                Add Filters
              </Button>

              <div style={{ marginTop: "16px" }}>
                <FiltersComponent
                  filters={selectedFilters}
                  onChange={handleFilterChange}
                  onDelete={handleFilterDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFiltersLibraryOpen && (
        <FilterLibrary
          filters={["CountryFilter", "DateFilter", "AgeRangeFilter"]}
          onSelectFilters={handleSelectFilters}
          onClose={closeFiltersLibrary}
        />
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default SelfService;
