import React, { useMemo, useState } from "react";
import CodeHighlight from "components/CodeHighlight";
import { ButtonGroup } from "components/ButtonGroup";
import SubTitle from "components/SubTitle";
import Header from "components/Header";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  ExecuteQuery,
  BarChart,
  LineChart,
  PieChart,
  IndicatorChart,
  ColumnChart,
  MemberFilterTile,
  Chart,
  IndicatorStyleOptions,
  LineStyleOptions,
  PieStyleOptions,
  ThemeProvider,
  DrilldownWidget,
} from "@sisense/sdk-ui";
import { Data, measureFactory, filterFactory, Filter } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SalesByCountryTable from "./components/SalesByCountry";
import { Popover } from "@mui/material";
import CodeBlock from "components/CodeBlock";
import { dashboardCodeExample } from "./dashboardCodeExample";

const theme = {
  chart: {
    general: "#348CEC",
    textColor: "#3C3C44",
    secondaryTextColor: "#348CEC",
    variantColors: ["#348CEC", "#B1D4E0", "#0C2D48", "#050A30", "#7EC8E3"],
  },
  typography: {
    fontFamily: "roboto",
  },
};

type DataPointEventHandler = (point: { category: any; breakBy: any[] }) => void;

export default function Dashboard() {
  const [view, setView] = useState("Preview");
  const [categoryFilter, setCategoryFilter] = useState<Filter | null>(null);
  const [brandFilter, setBrandFilter] = useState<Filter | null>(null);

  const filters = useMemo(() => {
    const appliedFilters: Filter[] = [];

    if (categoryFilter) {
      appliedFilters.push(categoryFilter);
    }

    if (brandFilter) {
      appliedFilters.push(brandFilter);
    }

    return appliedFilters;
  }, [categoryFilter, brandFilter]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        {/* Indicators */}

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Cost</Typography>
              <ThemeProvider theme={theme}>
                <Chart
                  dataSet={DM.DataSource}
                  chartType={"indicator"}
                  dataOptions={{
                    value: [measureFactory.sum(DM.Commerce.Cost, "Total Cost")],
                  }}
                  filters={filters}
                />
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue</Typography>
              <ThemeProvider theme={theme}>
                <Chart
                  dataSet={DM.DataSource}
                  chartType={"indicator"}
                  dataOptions={{
                    value: [measureFactory.sum(DM.Commerce.Revenue, "Orders Revenue")],
                  }}
                  filters={filters}
                />
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders Filled</Typography>
              <ThemeProvider theme={theme}>
                <Chart
                  dataSet={DM.DataSource}
                  chartType={"indicator"}
                  dataOptions={{
                    value: [measureFactory.sum(DM.Commerce.Quantity, "Quantty")],
                  }}
                  filters={filters}
                />
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={1} sm={1} md={3}>
          <Card
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <CardContent style={{ flex: 1, padding: 0 }}>
              <ThemeProvider theme={theme}>
                <MemberFilterTile
                  title={"Category"}
                  dataSource={DM.DataSource}
                  attribute={DM.Category.CategoryName}
                  filter={categoryFilter}
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setCategoryFilter(newFilter as Filter | null)
                  }
                />
              </ThemeProvider>
            </CardContent>
            <CardContent style={{ flex: 1, padding: 0 }}>
              <ThemeProvider theme={theme}>
                <MemberFilterTile
                  title={"Brand"}
                  dataSource={DM.DataSource}
                  attribute={DM.Brand.BrandName}
                  filter={brandFilter}
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setBrandFilter(newFilter as Filter | null)
                  }
                />
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales By Age Demographic</Typography>
              <ThemeProvider theme={theme}>
                <div style={{ height: "300px" }}>
                  <Chart
                    dataSet={DM.DataSource}
                    chartType={"bar"}
                    dataOptions={{
                      category: [DM.Commerce.AgeRange],
                      value: [measureFactory.sum(DM.Commerce.Revenue, "Revenue")],
                      breakBy: [],
                    }}
                    filters={filters}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales By Year</Typography>
              <ThemeProvider theme={theme}>
                <div style={{ height: "300px" }}>
                  <Chart
                    dataSet={DM.DataSource}
                    chartType={"pie"}
                    dataOptions={{
                      category: [DM.Commerce.Transaction_Date.Years],
                      value: [measureFactory.sum(DM.Commerce.Revenue, "Revenue")],
                      breakBy: [],
                    }}
                    filters={filters}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales By Country</Typography>
              <ThemeProvider theme={theme}>
                <div style={{ height: "300px" }}>
                  <Chart
                    dataSet={DM.DataSource}
                    chartType={"column"}
                    dataOptions={{
                      category: [DM.Commerce.Country],
                      value: [measureFactory.sum(DM.Commerce.Revenue, "Revenue")],
                      breakBy: [],
                    }}
                    filters={filters}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales By Country Over Time</Typography>
              <ThemeProvider theme={theme}>
                <div style={{ height: "300px" }}>
                  <Chart
                    dataSet={DM.DataSource}
                    chartType={"area"}
                    dataOptions={{
                      category: [DM.Commerce.Transaction_Date.Months],
                      value: [measureFactory.sum(DM.Commerce.Quantity, "Orders Filled")],
                      breakBy: [DM.Commerce.Country],
                    }}
                    filters={filters}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Over Time</Typography>
              <ThemeProvider theme={theme}>
                <div style={{ height: "300px" }}>
                  <Chart
                    dataSet={DM.DataSource}
                    chartType={"line"}
                    dataOptions={{
                      category: [DM.Commerce.Transaction_Date.Months],
                      value: [measureFactory.sum(DM.Commerce.Revenue, "Revenue")],
                      breakBy: [],
                    }}
                    filters={filters}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      )
    </DashboardLayout>
  );
}
