// File: charts.tsx

import React, { useState } from "react";
import { ExecuteQuery, Chart, ThemeProvider, Table } from "@sisense/sdk-ui";
import { Data, measures, filters } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

const theme = {
  chart: {
    textColor: "#3C3C44",
  },
  general: {
    brandColor: "#2196f3",
    primaryButtonTextColor: "white",
  },
  palette: {
    variantColors: ["#2196f3", "#0d47a1", "#050A30", "#7EC8E3"],
  },
  typography: {
    fontFamily: "roboto",
  },
};

interface BarChartProps {
  title: string;
  date: string;
}
export const BarChart: React.FC<BarChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Years, DM.Commerce.Transaction_Date.Months]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Chart
            dataSet={DM.DataSource}
            chartType={"bar"}
            dataOptions={{
              category: [DM.Commerce.AgeRange],
              value: [measures.sum(DM.Commerce.Revenue, "Total Sales")],
              breakBy: [],
            }}
            filters={[]}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface LineChartProps {
  title: string;
  date: string;
}

export const LineChart: React.FC<LineChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Years, DM.Commerce.Transaction_Date.Months]}
      measures={[measures.sum(DM.Commerce.Revenue, "Total Revenue")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Chart
            dataSet={DM.DataSource}
            chartType={"line"}
            dataOptions={{
              category: [DM.Commerce.Transaction_Date.Months],
              value: [measures.sum(DM.Commerce.Revenue, "Total Revenue")],
              breakBy: [],
            }}
            filters={[]}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface PieChartProps {
  title: string;
  date: string;
}

export const PieChart: React.FC<PieChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Chart
            dataSet={DM.DataSource}
            chartType={"pie"}
            dataOptions={{
              category: [DM.Commerce.Transaction_Date.Years],
              value: [measures.sum(DM.Commerce.Quantity, "Total Quantity")],
            }}
            filters={[]}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface ColumnChartProps {
  title: string;
  date: string;
}

export const ColumnChart: React.FC<ColumnChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Chart
            dataSet={DM.DataSource}
            chartType={"column"}
            dataOptions={{
              category: [DM.Commerce.AgeRange],
              value: [measures.sum(DM.Commerce.Quantity, "Total Quantity")],
            }}
            filters={[]}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface PolarChartProps {
  title: string;
  date: string;
}

export const PolarChart: React.FC<PolarChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Chart
            dataSet={DM.DataSource}
            chartType={"polar"}
            dataOptions={{
              category: [DM.Commerce.AgeRange],
              value: [measures.count(DM.CustomerReviews.Sentiment, "Sentiment")],
            }}
            filters={[]}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface TableChartProps {
  title: string;
  date: string;
}

export const TableChart: React.FC<TableChartProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <Table
            dataSet={DM.DataSource}
            dataOptions={{
              columns: [
                DM.Commerce.AgeRange,
                DM.Commerce.Revenue,
                DM.Commerce.Cost,
                DM.Commerce.Revenue,
              ],
            }}
            styleOptions={{ width: 600, height: 750 }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};
// Add more components as needed...
