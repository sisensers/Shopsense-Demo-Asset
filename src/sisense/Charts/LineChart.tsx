import React from "react";
import { BarChart, Chart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, filters, measures } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SisenseLineChart() {
  return (
    <>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[DM.Commerce.Transaction_Date.Years]}
        measures={[measures.sum(DM.Commerce.Revenue, "Total Sales")]}
        filters={[filters.thisYear(DM.Commerce.Transaction_Date)]}
      >
        {(data: Data) => {
          return (
            <Chart
              dataSet={DM.DataSource}
              chartType={"line"}
              dataOptions={{
                category: [DM.Commerce.Transaction_Date.Months],
                value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
                breakBy: [],
              }}
            />
          );
        }}
      </ExecuteQuery>
    </>
  );
}
