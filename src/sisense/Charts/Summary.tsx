import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

export default function Summary(): JSX.Element {
  const { tasks } = reportsLineChartData;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        <MDBox mb={3}>
          <MDTypography variant="h5">Marketing</MDTypography>
          <MDProgress variant="gradient" value={60} color="warning" />
        </MDBox>
        <MDBox mb={3}>
          <MDTypography variant="h5">Sales</MDTypography>
          <MDProgress variant="gradient" value={90} color="success" />
        </MDBox>
        <MDBox mb={3}>
          <MDTypography variant="h5">Reviews</MDTypography>
          <MDProgress variant="gradient" value={30} color="error" />
        </MDBox>
      </MDBox>
    </Card>
  );
}
