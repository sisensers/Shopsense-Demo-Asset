import React, { useMemo, useState } from "react";
import CodeHighlight from "components/CodeHighlight";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ExecuteQuery, MemberFilterTile, ThemeProvider, DashboardWidget } from "@sisense/sdk-ui";
import { Data, measureFactory, Filter } from "@sisense/sdk-data";
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

/* THIS SECTION DEFINES THE DASHBOARD AND WIDGETS BEING PULLED FROM SISENSE PLATFORM */

const DASHBOARD_ID = "656f7a6a19622d0033e7d69d";
const WIDGET_IDS = {
  WIDGET_1: "656f7d0219622d0033e7d6b7",
  WIDGET_2: "656f974b19622d0033e7d6d3",
  WIDGET_3: "656f7c6d19622d0033e7d6b5",
  WIDGET_4: "65737c3019622d0033e7d705",
  WIDGET_5: "656f87eb19622d0033e7d6c1",
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
      <Grid container spacing={-1}>
        {/* add filters as needed to this column */}
        <Grid item xs={12} md={2} style={{ display: isFilterColumnVisible ? "block" : "none" }}>
          <Card
            style={{
              height: "auto",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
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
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setCategoryFilter(newFilter as Filter | null)
                  }
                />
              </ThemeProvider>

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
            <CardContent style={{ flex: "auto", padding: 0 }}>
              <ThemeProvider theme={theme}>
                <MemberFilterTile
                  title={"Customer Sentiment"}
                  dataSource={DM.DataSource}
                  attribute={DM.CustomerReviews.Sentiment}
                  filter={sentimentFilter}
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setSentimentFilter(newFilter as Filter | null)
                  }
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
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setCountryFilter(newFilter as Filter | null)
                  }
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
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setAgerangeFilter(newFilter as Filter | null)
                  }
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
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setDayofweekFilter(newFilter as Filter | null)
                  }
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
                  onChange={(newFilter: Partial<Filter> | null) =>
                    setProductnameFilter(newFilter as Filter | null)
                  }
                />
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={10}>
          {/* add more charts as needed here */}

          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <DashboardWidget
                      widgetOid={WIDGET_IDS.WIDGET_1}
                      dashboardOid={DASHBOARD_ID}
                      filters={filters}
                      drilldownOptions={{
                        drilldownDimensions: [
                          DM.Brand.BrandName,
                          DM.Product.ProductName,
                          DM.Commerce.Transaction_Date.Months,
                          DM.Commerce.Transaction_Date.Days,
                        ],
                      }}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <DashboardWidget
                      widgetOid={WIDGET_IDS.WIDGET_2}
                      dashboardOid={DASHBOARD_ID}
                      filters={filters}
                      drilldownOptions={{
                        drilldownDimensions: [DM.Commerce.Country, DM.CustomerReviews.Sentiment],
                      }}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <DashboardWidget
                      widgetOid={WIDGET_IDS.WIDGET_3}
                      dashboardOid={DASHBOARD_ID}
                      filters={filters}
                      drilldownOptions={{
                        drilldownDimensions: [DM.Brand.BrandName, DM.Product.ProductName],
                      }}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <DashboardWidget
                      widgetOid={WIDGET_IDS.WIDGET_4}
                      dashboardOid={DASHBOARD_ID}
                      filters={filters}
                      drilldownOptions={{
                        drilldownDimensions: [
                          DM.Category.CategoryName,
                          DM.Product.ProductName,
                          DM.Commerce.Transaction_Date.Days,
                          DM.Commerce.AgeRange,
                        ],
                      }}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <DashboardWidget
                      widgetOid={WIDGET_IDS.WIDGET_5}
                      dashboardOid={DASHBOARD_ID}
                      filters={filters}
                      drilldownOptions={{
                        drilldownDimensions: [DM.Brand.BrandName, DM.Product.ProductName],
                      }}
                    />
                  </ThemeProvider>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
