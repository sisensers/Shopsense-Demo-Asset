import React from "react";
import { BarChart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, measureFactory, filterFactory } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SalesBarChart() {
  return (
    <>
      return (
      <BarChart
        dataSet={DM.DataSource}
        dataOptions={{
          category: [DM.Commerce.DayOfWeek],
          value: [measureFactory.sum(DM.Commerce.Quantity)],
          breakBy: [],
        }}
      />
      );
    </>
  );
}
