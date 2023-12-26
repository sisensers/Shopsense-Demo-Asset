import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { BarChart, LineChart, PieChart, ColumnChart, PolarChart, TableChart } from "./charts";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { Filter } from "@sisense/sdk-data";

interface ChartComponentProps {
  chartType: string;
  onDelete: () => void;
  position: { x: number; y: number };
  onDragStop: (position: { x: number; y: number }) => void;
  appliedFilters: Filter[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  chartType,
  onDelete,
  position,
  onDragStop,
  appliedFilters,
}) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [selectedChartType, setSelectedChartType] = useState(chartType);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleLock = () => {
    setIsLocked((prevIsLocked) => !prevIsLocked);
    setIsExpanding(false);
  };

  const handleToggleExpand = () => {
    if (!isLocked) {
      setIsExpanding((prevIsExpanding) => !prevIsExpanding);
    }
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeEnd = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setIsResizing(false);
    setSize({ width: data.size.width, height: data.size.height });
  };

  return (
    <Draggable
      position={position}
      bounds="parent"
      onStop={(e, data) => !isLocked && onDragStop({ x: data.x, y: data.y })}
      disabled={isLocked}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResizeStart={handleResizeStart}
        onResizeStop={handleResizeEnd}
        minConstraints={[300, 200]}
        maxConstraints={[Infinity, Infinity]}
        handle={
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "20px",
              height: "20px",
              cursor: isLocked ? "not-allowed" : "se-resize",
              background: isResizing ? "#2196f3" : "#0d47a1",
            }}
          />
        }
      >
        <Card style={{ width: "auto", height: "auto" }}>
          <CardContent style={{ position: "relative" }}>
            {renderChart()}

            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "8px",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <IconButton size="small" onClick={handleOpenDialog} aria-label="Change Chart Type">
                <BarChartIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={onDelete} aria-label="Remove Chart">
                <CloseIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleToggleLock}
                aria-label={isLocked ? "Unlock" : "Lock"}
              >
                {isLocked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
              </IconButton>
            </div>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Change Chart Type</DialogTitle>
              <DialogContent>
                <Select
                  value={selectedChartType}
                  onChange={(e) => setSelectedChartType(e.target.value)}
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="column">Column Chart</MenuItem>
                  <MenuItem value="line">Line Chart</MenuItem>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                  <MenuItem value="polar">Polar Chart</MenuItem>
                  <MenuItem value="table">Table Chart</MenuItem>
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </ResizableBox>
    </Draggable>
  );

  function renderChart() {
    switch (selectedChartType.toLowerCase()) {
      case "bar":
        return <BarChart title="" date="" filters={appliedFilters} />;
      case "column":
        return <ColumnChart title="" date="" filters={appliedFilters} />;
      case "line":
        return <LineChart title="" date="" filters={appliedFilters} />;
      case "pie":
        return <PieChart title="" date="" filters={appliedFilters} />;
      case "polar":
        return <PolarChart title="" date="" filters={appliedFilters} />;
      case "table":
        return <TableChart title="" date="" filters={appliedFilters} />;
      default:
        return null;
    }
  }
};

export default ChartComponent;
