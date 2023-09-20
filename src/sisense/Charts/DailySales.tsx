import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";

export default function DailySales(): JSX.Element {
  const { sales } = reportsLineChartData;
  return (
    <ReportsLineChart
      color="success"
      title="daily sales"
      description={
        <>
          (<strong>+15%</strong>) increase in today sales.
        </>
      }
      date="updated 4 min ago"
      chart={sales}
    />
  );
}
