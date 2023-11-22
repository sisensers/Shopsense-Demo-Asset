// Import necessary dependencies and chart components
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { BarChart, LineChart, PieChart, ColumnChart, PolarChart, TableChart } from "./charts";

interface ChartLibraryProps {
  charts: string[];
  onSelectChart: (chartType: string) => void;
  onClose: () => void;
}

const ChartLibrary: React.FC<ChartLibraryProps> = ({ charts, onSelectChart, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Choose a Chart</DialogTitle>
      <DialogContent
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", // Adjust the width
          gridTemplateRows: `repeat(${Math.ceil(charts.length * 1)}, minmax(500px, 1fr))`, // Adjust the height
          gap: "25px",
        }}
      >
        {/* Display actual renders of chart components for each chart type */}
        {charts.map((chartType) => (
          <div key={chartType} onClick={() => onSelectChart(chartType)}>
            {renderChartComponent(chartType)}
            <Typography variant="body2">{chartType}</Typography>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Helper function to render the correct chart component based on the chart type
const renderChartComponent = (chartType: string): JSX.Element => {
  switch (chartType.toLowerCase()) {
    case "bar":
      return <BarChart title={"Sales By Age Group"} date={""} />;
    case "line":
      return <LineChart title={"Sales Over Time"} date={""} />;
    case "pie":
      return <PieChart title={"Orders By Year"} date={""} />;
    case "column":
      return <ColumnChart title={"Sales By Age Group"} date={""} />;
    case "polar":
      return <PolarChart title={"Sales By Age Group"} date={""} />;
    case "table":
      return <TableChart title={"Sales By Age Group"} date={""} />;
  }
};

export default ChartLibrary;
