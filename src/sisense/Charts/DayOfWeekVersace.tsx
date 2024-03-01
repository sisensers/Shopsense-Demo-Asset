import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";

// Sisense
import { ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, filterFactory } from "@sisense/sdk-data";

export default function DayOfWeekVersace(): JSX.Element {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.DayOfWeek]}
      measures={[measureFactory.sum(DM.Commerce.Revenue, "Revenue")]}
      filters={[filterFactory.equals(DM.Brand.BrandName, "Versace")]}
    >
      {(queryState: QueryState) => {
        if (queryState.isLoading) {
          return <div>Loading...</div>;
        }

        if (queryState.error) {
          return <div>Error: {queryState.error.message}</div>;
        }

        const data: Data = queryState.data;
        console.log(data);

        const transformedData = TranslateSisenseDataToChartJS(data);

        return (
          <ReportsBarChart
            color="info"
            title="website views"
            description="Last Campaign Performance"
            date="campaign sent 2 days ago"
            chart={transformedData}
          />
        );
      }}
    </ExecuteQuery>
  );
}

interface daysOfWeek {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  };
}

interface Row {
  [key: string]: any;
}

function TranslateSisenseDataToChartJS(data: Data) {
  const dayNames: Array<string> = ["M", "T", "W", "T", "F", "S", "S"];
  const dayNamesFull: Array<string> = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const datasets: Array<number> = [0, 0, 0, 0, 0, 0, 0];
  //Set matching data. Add function here in real life
  data.rows.forEach((row: Row) => {
    if (row[0].text === "monday") {
      datasets[0] = row[1].data;
    }
    if (row[0].text === "tuesday") {
      datasets[1] = row[1].data;
    }
    if (row[0].text === "wednesday") {
      datasets[2] = row[1].data;
    }
    if (row[0].text === "thursday") {
      datasets[3] = row[1].data;
    }
    if (row[0].text === "friday") {
      datasets[4] = row[1].data;
    }
    if (row[0].text === "saturday") {
      datasets[5] = row[1].data;
    }
    if (row[0].text === "sunday") {
      datasets[6] = row[1].data;
    }
  });

  const transformedData: daysOfWeek = {
    labels: dayNames,
    datasets: {
      label: "Revenue",
      data: datasets,
    },
  };

  return transformedData;
}
