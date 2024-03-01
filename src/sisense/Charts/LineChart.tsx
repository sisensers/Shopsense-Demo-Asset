import React from "react";
import { BarChart, Chart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, filterFactory, measureFactory } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SisenseLineChart() {
  return (
    <>
      <Chart
        dataSet={DM.DataSource}
        chartType={"line"}
        dataOptions={{
          category: [DM.Commerce.Transaction_Date.Months],
          value: [measureFactory.sum(DM.Commerce.Revenue, "Revenue")],
          breakBy: [],
        }}
      />
      );
    </>
  );
}
