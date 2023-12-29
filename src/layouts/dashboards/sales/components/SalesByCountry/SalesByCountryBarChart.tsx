import React from "react";
import { BarChart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, measures, filters } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SalesBarChart() {
  return (
    <>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[DM.Commerce.DayOfWeek]}
        measures={[measures.sum(DM.Commerce.Quantity)]}
        filters={[]}
      >
        {(data: Data) => {
          return (
            <BarChart
              dataSet={data}
              dataOptions={{
                category: [DM.Commerce.DayOfWeek],
                value: [measures.sum(DM.Commerce.Quantity)],
                breakBy: [],
              }}
            />
          );
        }}
      </ExecuteQuery>
    </>
  );
}
