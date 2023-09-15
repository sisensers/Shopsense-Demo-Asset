/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as DM from "../Schemas/old-ecommerce";
import { ExecuteQuery, useExecuteQuery } from "@sisense/sdk-ui";
import { Data, measures, DimensionalAttribute, DimensionalBaseMeasure } from "@sisense/sdk-data";

export default function GetDefaultLineChartData() {
  const { data, isLoading, isError } = useExecuteQuery({
    dataSource: DM.DataSource,
    dimensions: [DM.Commerce.Date.Months, DM.Commerce.Gender],
    measures: [
      measures.sum(DM.Commerce.Revenue, "Total Revenue"),
      measures.sum(DM.Commerce.Cost, "Total Cost"),
    ],
    filters: [],
  });
  if (isLoading) {
    console.log("Loading");
    //return <div>Loading...</div>;
  }
  if (isError) {
    console.log("Error");
    //return <div>Error</div>;
  }
  if (data) {
    const defaultLineChartDataSisense: Types = {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Organic Search",
          color: "info",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
        {
          label: "Referral",
          color: "dark",
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
        },
        {
          label: "Direct",
          color: "primary",
          data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
        },
      ],
    };
    return defaultLineChartDataSisense;
  }
}

// types
interface Types {
  labels: any;
  datasets: any;
}

// const defaultLineChartDataSisense: Types = {
//   labels: [],
//   datasets: [],
// };

// function TranslateSisenseToChartJS(data: Data) {
//   console.log(data);
//   return defaultLineChartDataSisense;
// }
