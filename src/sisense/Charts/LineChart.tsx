import React from "react";
import { BarChart, Chart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, filterFactory, measureFactory } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SisenseLineChart() {
  return (
    <>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[DM.Commerce.Transaction_Date.Years]}
        measures={[measureFactory.sum(DM.Commerce.Revenue, "Total Sales")]}
        filters={[filterFactory.thisYear(DM.Commerce.Transaction_Date)]}
      >
        {(data: Data) => {
          return (
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
        }}
      </ExecuteQuery>
    </>
  );
}
