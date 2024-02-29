import React, { useState } from "react";
import { Chart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
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
import { ResizableBox } from "react-resizable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { measureFactory, Attribute } from "@sisense/sdk-data";

// Define ChartType
type ChartType = "bar" | "column" | "line" | "pie";

interface ChartBuilderProps {
  chartType: ChartType;
}

const chartOptions: ChartType[] = ["bar", "column", "line", "pie"];

const ChartBuilderComponent: React.FC<ChartBuilderProps> = ({ chartType }) => {
  const [dimension, setDimension] = useState<Attribute>(DM.Category.CategoryName);
  const [measure, setMeasure] = useState(measureFactory.sum(DM.Commerce.Quantity, "Total Quantity"));
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [localChartType, setLocalChartType] = useState<ChartType>(chartType);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // ...

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      onResize={(e, { size }) => {
        setSize({ width: size.width, height: size.height });
      }}
      minConstraints={[300, 200]}
      maxConstraints={[Infinity, Infinity]}
      handle={
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            cursor: "se-resize",
          }}
        >
          <ExpandMoreIcon fontSize="small" />
        </div>
      }
    >
      <Card style={{ width: "auto", height: "auto" }}>
        <CardContent style={{ position: "relative" }}>
          {/* ExecuteQuery for chart preview */}
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[dimension]}
            measures={[measure]}
            filters={[]}
          >
            {(data) => (
              // Render dynamically selected chart type
              <Chart
                dataSet={data}
                chartType={localChartType}
                dataOptions={{
                  category: [{ name: dimension.name, type: "datetime" }],
                  value: [{ name: measure.name }],
                  breakBy: [],
                }}
              />
            )}
          </ExecuteQuery>

          {/* UI for selecting chart options */}
          <div>
            <Button onClick={handleOpenDialog} variant="contained" color="primary">
              Change Chart Type
            </Button>
          </div>

          {/* Dialog for changing chart type */}
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Change Chart Type</DialogTitle>
            <DialogContent>
              <Select
                value={localChartType}
                onChange={(e) => setLocalChartType(e.target.value as ChartType)}
              >
                {chartOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)} Chart
                  </MenuItem>
                ))}
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
  );
};

export default ChartBuilderComponent;
