import React from "react";
import GradientLineChart from "sisense/Charts/LineCharts/GradientLineChart";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, Filter } from "@sisense/sdk-data";

const colorList = ["info", "dark", "primary", "secondary", "success", "error", "light"];

interface Types {
  labels: any;
  datasets: any;
}

interface Dataset {
  label: any;
  color: any;
  data: any;
}

interface Row {
  [key: string]: any;
}

type Props = {
  filters: Filter;
};

export default function SalesByAgeLine(props: Props): JSX.Element {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Months, DM.Commerce.Gender]}
      measures={[measureFactory.sum(DM.AdReport.Impressions, "Total Impressions")]}
      filters={[props.filters]}
    >
      {(data: Data) => {
        console.log(data);
        const translatedGradientData = translateSisenseDataToChartJS(data);
        return (
          <GradientLineChart
            icon={{ component: "show_chart" }}
            title="Impressions by Demographic"
            description="A breakdown of Ad Impressions across all platforms by demographic over time"
            chart={translatedGradientData}
          />
        );
      }}
    </ExecuteQuery>
  );
}

function translateSisenseDataToChartJS(data: Data): Types {
  const lineNames: Array<string> = [];
  const xAxisLabels: Array<string> = [];
  const datasets: Array<Dataset> = [];
  // Gets a color from predefined options set in colors ts
  let colorPos = 0;

  data.rows.forEach((row: Row) => {
    const [month, sentiment, revenue, cost] = row.map((item: { text: any }) => item.text);

    // If empty, add the first element with Id
    if (!lineNames.includes(sentiment)) {
      const dataset: Dataset = {
        label: sentiment,
        color: colorList[colorPos],
        data: [revenue],
      };

      // Get color from the list and update the breakby checker
      colorPos++;
      lineNames.push(sentiment);
      datasets.push(dataset);

      // Update x-axis label tracker
      if (!xAxisLabels.includes(month)) {
        xAxisLabels.push(month);
      }
    } else {
      // If id for breakby already exists then add to that list
      const pos = lineNames.indexOf(sentiment);
      datasets[pos].data.push(revenue);

      // Update x-axis label tracker
      if (!xAxisLabels.includes(month)) {
        xAxisLabels.push(month);
      }
    }
  });

  const translatedData: Types = {
    labels: xAxisLabels,
    datasets: datasets,
  };

  console.log("Translated Data");
  console.log(translatedData);

  return translatedData;
}
