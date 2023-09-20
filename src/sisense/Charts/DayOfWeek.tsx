import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";

export default function DayOfWeek(): JSX.Element {
  return (
    <ReportsBarChart
      color="info"
      title="website views"
      description="Last Campaign Performance"
      date="campaign sent 2 days ago"
      chart={reportsBarChartData}
    />
  );
}
