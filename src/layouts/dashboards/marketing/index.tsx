import React, { useMemo, useState } from "react";
import CodeHighlight from "components/CodeHighlight";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ExecuteQuery, MemberFilterTile, DashboardWidget } from "@sisense/sdk-ui";
import { Data, measureFactory, Filter } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CodeBlock from "components/CodeBlock";
import { dashboardCodeExample } from "./dashboardCodeExample";

const DASHBOARD_ID = "65e2442319622d0033e7f25e";
const WIDGET_IDS = {
  WIDGET_1: "65e2445e19622d0033e7f260",
  WIDGET_2: "65e244cb19622d0033e7f266",
  WIDGET_3: "65e2472819622d0033e7f273",
  WIDGET_4: "65e2473c19622d0033e7f277",
  WIDGET_5: "65e2450919622d0033e7f268",
  WIDGET_6: "65e2486319622d0033e7f280",
  WIDGET_7: "65e2536419622d0033e7f289",
  WIDGET_8: "65e2544b19622d0033e7f290",
  WIDGET_9: "65e254ec19622d0033e7f29b",
  WIDGET_10: "65e2557119622d0033e7f2a2",
  WIDGET_11: "65e256c419622d0033e7f2a9",
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
              width: "255px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <CardContent style={{ flex: "auto", padding: 10, textAlign: "center" }}>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", fontFamily: "Roboto", marginBottom: 15 }}
              >
                Impressions
              </Typography>
              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_6}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />

              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_7}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />
            </CardContent>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontFamily: "Roboto", marginBottom: 15 }}
            >
              Purchases
            </Typography>
            <CardContent style={{ flex: "auto", padding: 0 }}>
              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_8}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />
            </CardContent>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontFamily: "Roboto", marginBottom: 15 }}
            >
              Reach
            </Typography>
            <CardContent style={{ flex: "auto", padding: 0 }}>
              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_9}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />
            </CardContent>
            <CardContent style={{ flex: "auto", padding: 0 }}>
              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_10}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />
            </CardContent>
            <CardContent style={{ flex: "auto", padding: 0 }}>
              <DashboardWidget
                widgetOid={WIDGET_IDS.WIDGET_11}
                dashboardOid={DASHBOARD_ID}
                filters={filters}
              />
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
                  <DashboardWidget
                    widgetOid={WIDGET_IDS.WIDGET_1}
                    dashboardOid={DASHBOARD_ID}
                    filters={filters}
                    drilldownOptions={{
                      drilldownDimensions: [
                        DM.AdReport.AdName,
                        DM.AdReport.Objective,
                        DM.AdReport.Gender,
                        DM.AdReport.Age,
                      ],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <DashboardWidget
                    widgetOid={WIDGET_IDS.WIDGET_2}
                    dashboardOid={DASHBOARD_ID}
                    filters={filters}
                    drilldownOptions={{
                      drilldownDimensions: [DM.Commerce.Country, DM.CustomerReviews.Sentiment],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <DashboardWidget
                    widgetOid={WIDGET_IDS.WIDGET_3}
                    dashboardOid={DASHBOARD_ID}
                    filters={filters}
                    drilldownOptions={{
                      drilldownDimensions: [DM.Brand.BrandName, DM.Product.ProductName],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <DashboardWidget
                    widgetOid={WIDGET_IDS.WIDGET_5}
                    dashboardOid={DASHBOARD_ID}
                    filters={filters}
                    drilldownOptions={{
                      drilldownDimensions: [DM.Brand.BrandName, DM.Product.ProductName],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
