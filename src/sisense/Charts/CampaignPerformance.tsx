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
import { Data, measureFactory } from "@sisense/sdk-data";

const label = { inputProps: { "aria-label": "Color switch demo" } };

// types
interface Types {
  labels: any;
  datasets: Dataset;
}
interface Dataset {
  label: any;
  data: any;
}
interface Row {
  [key: string]: any;
}

export default function CampaignPerformance(): JSX.Element {
  const { tasks } = reportsLineChartData;

  return (
    <MDBox mb={3}>
      <MDBox mb={3}>
        <ExecuteQuery
          dataSource={DM.DataSource}
          dimensions={[DM.Commerce.Transaction_Date.Months]}
          measures={[measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")]}
          filters={[]}
        >
          {(data: Data) => {
            console.log(data);
            // const translatedMarket = TranslateSisenseDataToChartJS(data)
            return (
              <ReportsLineChart
                color="dark"
                title="Ad Impressions Over Time"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            );
          }}
        </ExecuteQuery>
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
function TranslateSisenseDataToChartJS(data: Data) {
  throw new Error("Function not implemented.");
}
// function TranslateSisenseDataToChartJS(data: Data) {
//   const lineNames: Array<string> = [];
//   const xAxisLabels: Array<string> = [];
//   const datasets: Array<Dataset> = [];
//   //gets a color from predefined options set in colors ts
//   var colorPos = 0;
//   data.rows.forEach((row: Row) => {
//     //If empty add first element with Id
//     if (lineNames.length === 0 || !lineNames.includes(row[0].text)) {
//       const dataset: Dataset = {
//         label: row[0].text,
//         data: [row[1].text],
//       };
//       lineNames.push(row[0].text);
//       datasets.push(dataset);
//       //update x axis label tracker
//       if (xAxisLabels.length === 0 || !xAxisLabels.includes(row[0].text)) {
//         xAxisLabels.push(row[0].text);
//       }
//     } else {
//       //if id for breakby already exists then add to that list
//       const pos = lineNames.indexOf(row[0].text);
//       datasets[pos].data.push(row[1].text);
//       if (xAxisLabels.length === 0 || !xAxisLabels.includes(row[0].text)) {
//         xAxisLabels.push(row[0].text);
//       }
//     }
//   });
//   const translatedData: Types = {
//     labels: xAxisLabels,
//     datasets: datasets,
//   };
//   console.log("Translated Data");
//   console.log(translatedData);
//   return translatedData;
// }
