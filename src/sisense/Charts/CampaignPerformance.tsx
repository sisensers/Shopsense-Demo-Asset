import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

import MDBox from "components/MDBox";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { FormControl, FormLabel, FormGroup, FormControlLabel } from "@mui/material";
import MDProgress from "components/MDProgress";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function CampaignPerformance(): JSX.Element {
  const { tasks } = reportsLineChartData;
  return (
    <MDBox mb={3}>
      <MDBox mb={3}>
        <ReportsLineChart
          color="dark"
          title="completed tasks"
          description="Last Campaign Performance"
          date="just updated"
          chart={tasks}
        />
      </MDBox>
      <MDBox mb={3}>
        <MDProgress variant="gradient" value={60} color="warning" />
      </MDBox>
      <MDBox mb={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="forecast"
              control={<Switch color="primary" />}
              label="Forecast"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="pulse"
              control={<Switch color="success" />}
              label="Pulse"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="notify"
              control={<Switch color="primary" />}
              label="Notify"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="disable"
              control={<Switch color="primary" />}
              label="Disable"
              labelPlacement="bottom"
            />
          </FormGroup>
        </FormControl>
      </MDBox>
    </MDBox>
  );
}
