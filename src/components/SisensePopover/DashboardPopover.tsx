import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";

import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import ReactLogo from "assets/images/ReactLogo.png";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import CodeReference from "components/TooltipCodeSnippet";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MDButton
        variant="gradient"
        color="info"
        Width="20px"
        aria-describedby={id}
        onClick={handleClick}
      >
        Code Example
      </MDButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MDBox mb={5}>
          <MDBox mb={0} style={{ backgroundColor: "white", borderRadius: "8px 8px 0 0" }}>
            <ProductCell
              image={ReactLogo}
              name={
                // Use `as string` to cast the JSX element to a string
                // Use `as string` to cast the JSX element to a string
                (
                  <a
                    href="https://www.sisense.com/blog/take-control-of-your-data-visualizations/?utm_source=linkedin&utm_medium=organic_social"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Connecting Sisense to third-party visualizations
                  </a>
                ) as unknown as string
              }
            />
          </MDBox>

          <MDBox style={{ background: "white", padding: "16px", borderRadius: "8px" }}>
            <code>{`
import React, { useMemo, useState } from "react";
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
} from "@sisense/sdk-ui";
import { Data, measures, filters, Filter } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SalesByCountryTable from "./components/SalesByCountry";
import { Popover } from "@mui/material";

type DataPointEventHandler = (point: { category: any; breakBy: any[] }) => void;

export default function Dashboard() {
  const [isDashboardVisible, setDashboardVisible] = useState(true);

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

  const toggleDashboardVisibility = () => {
    setDashboardVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleDashboardVisibility}>
        {isDashboardVisible ? "Hide Dashboard" : "Show Dashboard"}
      </button>
      {isDashboardVisible && (
        <DashboardLayout>
          <DashboardNavbar />
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[
              DM.Commerce.Transaction_Date.Years,
              DM.Commerce.Transaction_Date.Months,
              DM.Category.CategoryName,
              DM.Commerce.AgeRange,
              DM.Commerce.Country,
            ]}
            measures={[
              measures.sum(DM.Commerce.Quantity, "Total Quantity"),
              measures.sum(DM.Commerce.Revenue, "Total Revenue"),
              measures.sum(DM.Commerce.Cost, "Total Cost"),
            ]}
          >
            {(data: Data) => (
              <Grid container spacing={2}>
                {/* Indicators */}
                <Grid item xs={1} sm={1} md={4}>
                  <Card
                    style={{
                      height: "100%",
                      width: "600px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6">Category</Typography>
                      <MemberFilterTile
                        title={"Category"}
                        dataSource={DM.DataSource}
                        attribute={DM.Category.CategoryName}
                        filter={categoryFilter}
                        onChange={setCategoryFilter}
                      />
                    </CardContent>
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6">Brand</Typography>
                      <MemberFilterTile
                        title={"Brand"}
                        dataSource={DM.DataSource}
                        attribute={DM.Brand.BrandName}
                        filter={brandFilter}
                        onChange={setBrandFilter}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Cost</Typography>
                      <Chart
                        dataSet={DM.DataSource}
                        chartType={"indicator"}
                        dataOptions={{
                          value: [measures.sum(DM.Commerce.Cost, "Total Cost")],
                        }}
                        filters={filters}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Revenue</Typography>
                      <Chart
                        dataSet={DM.DataSource}
                        chartType={"indicator"}
                        dataOptions={{
                          value: [measures.sum(DM.Commerce.Revenue, "Orders Revenue")],
                        }}
                        filters={filters}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Orders Filled</Typography>
                      <Chart
                        dataSet={DM.DataSource}
                        chartType={"indicator"}
                        dataOptions={{
                          value: [measures.sum(DM.Commerce.Quantity, "Quantty")],
                        }}
                        filters={filters}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Sales By Age Demographic</Typography>
                      <div style={{ height: "300px" }}>
                        <Chart
                          dataSet={DM.DataSource}
                          chartType={"bar"}
                          dataOptions={{
                            category: [DM.Commerce.AgeRange],
                            value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
                            breakBy: [],
                          }}
                          filters={filters}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Sales By Year</Typography>
                      <div style={{ height: "300px" }}>
                        <Chart
                          dataSet={DM.DataSource}
                          chartType={"pie"}
                          dataOptions={{
                            category: [DM.Commerce.Transaction_Date.Years],
                            value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
                            breakBy: [],
                          }}
                          filters={filters}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Sales By Country</Typography>
                      <div style={{ height: "300px" }}>
                        <Chart
                          dataSet={DM.DataSource}
                          chartType={"column"}
                          dataOptions={{
                            category: [DM.Commerce.Country],
                            value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
                            breakBy: [],
                          }}
                          filters={filters}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <SalesByCountryTable />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Sales Over Time</Typography>
                      <div style={{ height: "300px" }}>
                        <Chart
                          dataSet={DM.DataSource}
                          chartType={"line"}
                          dataOptions={{
                            category: [DM.Commerce.Transaction_Date.Months],
                            value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
                            breakBy: [],
                          }}
                          filters={filters}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </ExecuteQuery>
        </DashboardLayout>
      )}
          `}</code>
          </MDBox>
        </MDBox>
      </Popover>
    </div>
  );
}
