export const dashboardCodeExample = `import React, { useMemo, useState } from "react";
import CodeHighlight from "components/CodeHighlight";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ExecuteQuery, MemberFilterTile, Chart, ThemeProvider } from "@sisense/sdk-ui";
import { Data, measures, filters, Filter } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CodeBlock from "components/CodeBlock";
import { dashboardCodeExample } from "./dashboardCodeExample";

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
type DataPointEventHandler = (point: { category: any; breakBy: any[] }) => void;

export default function Dashboard() {
  const [view, setView] = useState("Preview");
  const [categoryFilter, setCategoryFilter] = useState<Filter | null>(null);
  const [brandFilter, setBrandFilter] = useState<Filter | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<Filter | null>(null);
  const [countryFilter, setCountryFilter] = useState<Filter | null>(null);
  const [agerangeFilter, setAgerangeFilter] = useState<Filter | null>(null);
  const [dayofweekFilter, setDayofweekFilter] = useState<Filter | null>(null);
  const [productnameFilter, setProductnameFilter] = useState<Filter | null>(null);

  const filters = useMemo(() => {
    const appliedFilters: Filter[] = [];

    if (categoryFilter) {
      appliedFilters.push(categoryFilter);
    }

    if (brandFilter) {
      appliedFilters.push(brandFilter);
    }

    if (sentimentFilter) {
      appliedFilters.push(sentimentFilter);
    }

    if (countryFilter) {
      appliedFilters.push(countryFilter);
    }

    if (agerangeFilter) {
      appliedFilters.push(agerangeFilter);
    }

    if (dayofweekFilter) {
      appliedFilters.push(dayofweekFilter);
    }

    if (productnameFilter) {
      appliedFilters.push(productnameFilter);
    }
    return appliedFilters;
  }, [
    categoryFilter,
    brandFilter,
    sentimentFilter,
    countryFilter,
    agerangeFilter,
    dayofweekFilter,
    productnameFilter,
  ]);

  const [isFilterColumnVisible, setFilterColumnVisibility] = useState(true);

  const toggleFilterColumn = () => {
    setFilterColumnVisibility(!isFilterColumnVisible);
  };

  const handleButtonClick = (action: string) => {
    if (action === "Preview") {
      setView("Preview");
    } else if (action === "React") {
      setView("React");
    } else if (action === "ToggleFilterColumn") {
      toggleFilterColumn();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CodeHighlight uniqueKey={view}>
        <article className="my-8" id="Render-dashboard-widgets">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "12px",
                backgroundColor: isFilterColumnVisible ? "#2196f3" : "#ecf0f1",
                color: isFilterColumnVisible ? "#ffffff" : "#333",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleButtonClick("ToggleFilterColumn")}
            >
              {isFilterColumnVisible ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "10px",
                marginRight: "8px",
                backgroundColor: view === "Preview" ? "#2196f3" : "#ecf0f1",
                color: view === "Preview" ? "#ffffff" : "#333",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleButtonClick("Preview")}
            >
              Dashboard
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "12px",
                backgroundColor: view === "React" ? "#2196f3" : "#ecf0f1",
                color: view === "React" ? "#ffffff" : "#333",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleButtonClick("React")}
            >
              Code
            </button>
          </div>
          {view === "React" && <CodeBlock language="tsx">{dashboardCodeExample}</CodeBlock>}
        </article>
      </CodeHighlight>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[
          DM.Commerce.Transaction_Date.Years,
          DM.Commerce.Transaction_Date.Months,
          DM.Category.CategoryName,
          DM.Commerce.AgeRange,
          DM.Commerce.Country,
          DM.CustomerReviews.Sentiment,
          DM.Commerce.DayOfWeek,
          DM.Product.ProductName,
        ]}
        measures={[
          measures.sum(DM.Commerce.Quantity, "Total Quantity"),
          measures.sum(DM.Commerce.Revenue, "Total Revenue"),
          measures.sum(DM.Commerce.Cost, "Total Cost"),
        ]}
      >
        {(data: Data) => (
          <Grid container spacing={-1}>
            {/* MemberFilterTile column */}
            <Grid item xs={12} md={2} style={{ display: isFilterColumnVisible ? "block" : "none" }}>
              <Card
                style={{
                  height: "100vh",
                  width: "75%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent style={{ flex: "auto", padding: 25, textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontFamily: "Roboto", marginBottom: 15 }}
                  >
                    Dashboard Filters
                  </Typography>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Category"}
                      dataSource={DM.DataSource}
                      attribute={DM.Category.CategoryName}
                      filter={categoryFilter}
                      onChange={setCategoryFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Brand"}
                      dataSource={DM.DataSource}
                      attribute={DM.Brand.BrandName}
                      filter={brandFilter}
                      onChange={setBrandFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Customer Sentiment"}
                      dataSource={DM.DataSource}
                      attribute={DM.CustomerReviews.Sentiment}
                      filter={sentimentFilter}
                      onChange={setSentimentFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Country"}
                      dataSource={DM.DataSource}
                      attribute={DM.Commerce.Country}
                      filter={countryFilter}
                      onChange={setCountryFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Demographic"}
                      dataSource={DM.DataSource}
                      attribute={DM.Commerce.AgeRange}
                      filter={agerangeFilter}
                      onChange={setAgerangeFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Day Of Week"}
                      dataSource={DM.DataSource}
                      attribute={DM.Commerce.DayOfWeek}
                      filter={dayofweekFilter}
                      onChange={setDayofweekFilter}
                    />
                  </ThemeProvider>
                </CardContent>
                <CardContent style={{ flex: "auto", padding: 0 }}>
                  <ThemeProvider theme={theme}>
                    <MemberFilterTile
                      title={"Product"}
                      dataSource={DM.DataSource}
                      attribute={DM.Product.ProductName}
                      filter={productnameFilter}
                      onChange={setProductnameFilter}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={9}>
              {/* Place your charts here */}

              <Grid container spacing={1}>
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
                              value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
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
                              value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
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
                              value: [measures.sum(DM.Commerce.Revenue, "Revenue")],
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
                      <Typography variant="h6">Sales Over Time</Typography>
                      <ThemeProvider theme={theme}>
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
                      </ThemeProvider>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={5} md={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Cost Over Time By Customer Sentient</Typography>
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "280px" }}>
                          <Chart
                            dataSet={DM.DataSource}
                            chartType={"area"}
                            dataOptions={{
                              category: [DM.Commerce.Transaction_Date.Months],
                              value: [measures.sum(DM.Commerce.Cost, "Revenue")],
                              breakBy: [DM.CustomerReviews.Sentiment],
                            }}
                            filters={filters}
                          />
                        </div>
                      </ThemeProvider>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </ExecuteQuery>
    </DashboardLayout>
  );
}`;
