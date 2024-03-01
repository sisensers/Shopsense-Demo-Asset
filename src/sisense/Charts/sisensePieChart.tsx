import React from "react";
import { PieChart, ExecuteQuery, PieStyleOptions, ThemeProvider } from "@sisense/sdk-ui";
import { Data, measureFactory } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

export default function SisensePieChart() {
  // Define your PieStyleOptions with legend display set to false
  const pieStyleOptions: PieStyleOptions = {
    legend: {
      enabled: true, // Use enabled property instead of display
    },
    labels: {
      enabled: false,
    },

    // Other style options...
  };

  return (
    <>
      <ThemeProvider>
        <PieChart
          dataSet={DM.DataSource}
          dataOptions={{
            category: [DM.Commerce.AgeRange],
            value: [measureFactory.sum(DM.Commerce.Revenue)],
          }}
          styleOptions={pieStyleOptions} // Pass the style options to the PieChart component
        />
      </ThemeProvider>
      );
    </>
  );
}
