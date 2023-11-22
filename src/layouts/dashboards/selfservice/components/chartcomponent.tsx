import React, { useState } from "react";
import Draggable from "react-draggable";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Resizable } from "react-resizable";
import { BarChart, LineChart, PieChart, ColumnChart, PolarChart, TableChart } from "./charts";

interface ChartComponentProps {
  chartType: string;
  onDelete: () => void;
  position: { x: number; y: number };
  onDragStop: (position: { x: number; y: number }) => void;
}

const theme = {
  chart: {
    textColor: "#3C3C44",
  },
  general: {
    brandColor: "#2196f3",
    primaryButtonTextColor: "white",
  },
  palette: {
    variantColors: ["#2196f3", "#0d47a1", "#050A30", "#7EC8E3"],
  },
  typography: {
    fontFamily: "roboto",
  },
};

const ChartComponent: React.FC<ChartComponentProps> = ({
  chartType,
  onDelete,
  position,
  onDragStop,
}) => {
  const [size, setSize] = useState({ width: 400, height: 300 });

  return (
    <Draggable
      position={position}
      bounds="parent"
      onStop={(e, data) => onDragStop({ x: data.x, y: data.y })}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={(e, { size }) => {
          setSize({ width: size.width, height: size.height });
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${size.width}px`,
            height: `${size.height}px`,
            overflow: "hidden",
          }}
        >
          {renderChart()}

          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              display: "flex",
              gap: "4px",
            }}
          >
            <IconButton
              size="small"
              onClick={() => {
                setSize((prevSize) => ({
                  width: prevSize.width + 20,
                  height: prevSize.height + 20,
                }));
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setSize((prevSize) => ({ ...prevSize, height: prevSize.height - 20 }));
              }}
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              display: "flex",
              gap: "4px",
            }}
          >
            <Button
              onClick={onDelete}
              variant="contained"
              color="primary"
              style={{ color: "white", fontSize: "0.6rem", padding: "1px 4px" }}
            >
              Remove
            </Button>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );

  function renderChart() {
    switch (chartType.toLowerCase()) {
      case "bar":
        return <BarChart title="" date="" />;
      case "column":
        return <ColumnChart title="" date="" />;
      case "line":
        return <LineChart title="" date="" />;
      case "pie":
        return <PieChart title="" date="" />;
      case "polar":
        return <PolarChart title="" date="" />;
      case "table":
        return <TableChart title="" date="" />;
      default:
        return null;
    }
  }
};

export default ChartComponent;
