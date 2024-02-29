import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";

export default function Sentiment(): JSX.Element {
  const { tasks } = reportsLineChartData;

  return (
    <MDBox>
      <MDBox>
        <ReportsLineChart
          color="warning"
          title="Customer Review Sentiment"
          description={
            <>
              (<strong>+52%</strong>) increase in positive reviews.
            </>
          }
          date="updated 35 min ago"
          chart={tasks}
        />
      </MDBox>
      <MDBox>
        <MDProgress variant="gradient" value={52} color="error" />
      </MDBox>
    </MDBox>
  );
}
