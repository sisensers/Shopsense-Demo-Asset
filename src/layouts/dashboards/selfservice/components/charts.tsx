// File: charts.tsx

import React from "react";
import { ExecuteQuery, Chart, ThemeProvider, Table, DashboardWidget } from "@sisense/sdk-ui";
import { Data, measures, Filter } from "@sisense/sdk-data";
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

// Update BarChartProps
interface BarChartProps {
  title: string;
  date: string;
  filters: Filter[]; // Add this line
}

// Update BarChart component
export const BarChart: React.FC<BarChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Years, DM.Commerce.Transaction_Date.Months]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"65737c3019622d0033e7d705"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters} // Update this line
            drilldownOptions={{
              drilldownDimensions: [DM.Commerce.AgeRange, DM.Commerce.DayOfWeek],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface LineChartProps {
  title: string;
  date: string;
  filters: Filter[];
}

export const LineChart: React.FC<LineChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Years, DM.Commerce.Transaction_Date.Months]}
      measures={[measures.sum(DM.Commerce.Revenue, "Total Revenue")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"656f87eb19622d0033e7d6c1"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters}
            drilldownOptions={{
              drilldownDimensions: [DM.Commerce.AgeRange, DM.Category.CategoryName],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface PieChartProps {
  title: string;
  date: string;
  filters: Filter[];
}

export const PieChart: React.FC<PieChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"656f974b19622d0033e7d6d3"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters}
            drilldownOptions={{
              drilldownDimensions: [
                DM.Commerce.AgeRange,
                DM.Category.CategoryName,
                DM.Brand.BrandName,
                DM.Commerce.Country,
              ],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface ColumnChartProps {
  title: string;
  date: string;
  filters: Filter[];
}

export const ColumnChart: React.FC<ColumnChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Revenue, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"656f7d0219622d0033e7d6b7"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters}
            drilldownOptions={{
              drilldownDimensions: [
                DM.Commerce.AgeRange,
                DM.Brand.BrandName,
                DM.Product.ProductName,
                DM.CustomerReviews.Sentiment,
                DM.Commerce.Transaction_Date.Days,
              ],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface PolarChartProps {
  title: string;
  date: string;
  filters: Filter[];
}

export const PolarChart: React.FC<PolarChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"656f7c6d19622d0033e7d6b5"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters}
            drilldownOptions={{
              drilldownDimensions: [
                DM.Commerce.AgeRange,
                DM.Category.CategoryName,
                DM.Brand.BrandName,
                DM.Product.ProductName,
              ],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};

interface TableChartProps {
  title: string;
  date: string;
  filters: Filter[];
}

export const TableChart: React.FC<TableChartProps> = ({ title, date, filters }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Category.CategoryName]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <DashboardWidget
            widgetOid={"656f9a5919622d0033e7d6d7"}
            dashboardOid={"656f7a6a19622d0033e7d69d"}
            filters={filters}
            drilldownOptions={{
              drilldownDimensions: [
                DM.Commerce.AgeRange,
                DM.Category.CategoryName,
                DM.Brand.BrandName,
                DM.Product.ProductName,
              ],
            }}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};
// Add more components as needed...
