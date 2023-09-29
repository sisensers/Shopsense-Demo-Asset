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

export default function Discuss(): JSX.Element {
  const { tasks } = reportsLineChartData;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        <MDBox mb={3}>
          <MDTypography variant="h5">Paid</MDTypography>
          <MDTypography variant="p">
            Total Revenue was 7,909 across all 12 quarters. Revenue fell by 41% over the course of
            the series and ended on a disappointing note, decreasing significantly in the final
            quarters. The largest single decline on a percentage basis occurred in 2021 Q3 and 2022
            Q2 (-100%). However, the largest single decline on an absolute basis occurred in 2021 Q3
            and 2022 Q2 (-1,748). The largest net decline was from 2022 Q4 to 2023 Q4, when Revenue
            decreased by 1,855 (85%).
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}
