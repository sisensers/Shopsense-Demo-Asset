import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BarChart, LineChart, PieChart, ColumnChart, PolarChart, TableChart } from "./charts";

interface ChartLibraryProps {
  charts: string[];
  onSelectCharts: (selectedCharts: string[]) => void;
  onClose: () => void;
}

const ChartLibrary: React.FC<ChartLibraryProps> = ({ charts, onSelectCharts, onClose }) => {
  const [selectedChartTypes, setSelectedChartTypes] = useState<string[]>([]);

  const handleToggleChart = (chartType: string) => {
    setSelectedChartTypes((prevSelectedChartTypes) => {
      if (prevSelectedChartTypes.includes(chartType)) {
        return prevSelectedChartTypes.filter((type) => type !== chartType);
      } else {
        return [...prevSelectedChartTypes, chartType];
      }
    });
  };

  const handleAddToDashboard = () => {
    onSelectCharts(selectedChartTypes);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Choose a Chart</DialogTitle>
      <DialogContent
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
          gridAutoRows: "minmax(300px, auto)", // Use minHeight for grid rows
          gap: "10px",
          width: "500px",
          minWidth: "500px",
          height: "600px", // Set a fixed height for the content
          overflow: "auto",
        }}
      >
        {charts.map((chartType) => (
          <React.Fragment key={chartType}>
            <div key={`${chartType}-chart`} style={{ boxSizing: "border-box" }}>
              {renderChartComponent(chartType)}
              <Typography variant="body2">{chartType}</Typography>
            </div>
            <div
              key={`${chartType}-checkbox`}
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedChartTypes.includes(chartType)}
                    onChange={() => handleToggleChart(chartType)}
                  />
                }
                label={""}
              />
            </div>
          </React.Fragment>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAddToDashboard} color="primary">
          Add to Dashboard
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const renderChartComponent = (chartType: string): JSX.Element => {
  switch (chartType.toLowerCase()) {
    case "bar":
      return <BarChart title={""} date={""} filters={[]} />;
    case "line":
      return <LineChart title={""} date={""} filters={[]} />;
    case "pie":
      return <PieChart title={""} date={""} filters={[]} />;
    case "column":
      return <ColumnChart title={""} date={""} filters={[]} />;
    case "polar":
      return <PolarChart title={""} date={""} filters={[]} />;
    case "table":
      return <TableChart title={""} date={""} filters={[]} />;
    default:
      return <div>Chart not found</div>;
  }
};

export default ChartLibrary;
