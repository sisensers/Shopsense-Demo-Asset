import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

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
          <MDTypography variant="h5">Actual Sales VS Potential Sales</MDTypography>
          <MDTypography variant="p">
            The total Actual Sales value is $62M. T-Strap Shoes makes the most significant
            contribution ($2.4M), which constitutes 3.86% of the overall total. Oxfords has the
            lowest Actual Sales ($2M), which comprises 3.2% of the total Actual Sales. The average
            value of Actual Sales per Category Name is $2.2M. Potential Sales Statistical Analysis
            The total Potential Sales value is $60.3M. Category Name There are 28 Category Names.
            Slippers has the highest Potential Sales ($2.4M), which constitutes 3.92% of the overall
            total. Ballet Flats has the lowest ($2M), which comprises 3.24% of the total Potential
            Sales. The average value of Potential Sales per Category Name is $2.2M.
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}
