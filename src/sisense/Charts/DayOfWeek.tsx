import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, filterFactory } from "@sisense/sdk-data";

export default function DayOfWeek(): JSX.Element {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.DayOfWeek]}
      measures={[measureFactory.sum(DM.AdReport.Purchases, "Unique Purchases From Ad")]}
      filters={[filterFactory.dateRange(DM.Commerce.Transaction_Date.Months, "2024-01", "2024-02")]}
    >
      {(data: Data) => {
        console.log(data);
        const transformedData = TranslateSisenseDataToChartJS(data);
        return (
          <ReportsBarChart
            color="info"
            title="Purchases From Ads"
            description="Purchases made from online Ad's by day last month"
            date="Updated Monday"
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
