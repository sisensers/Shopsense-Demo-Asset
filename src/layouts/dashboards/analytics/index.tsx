import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { useState } from "react";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import RevenueStatisticsCard from "examples/Cards/StatisticsCards/RevenueStatisticsCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

//Sisense Powered Components
import DayOfWeek from "sisense/Charts/DayOfWeek";
import SalesByAgeLine from "sisense/Charts/SalesByAgeLine";
import { DateRangeFilterTile } from "@sisense/sdk-ui";
import { filterFactory, Filter } from "@sisense/sdk-data";
import CustomerStatisticsCard from "examples/Cards/StatisticsCards/CustomerStatisticsCard";
import CostStatisticsCard from "examples/Cards/StatisticsCards/CostStatisticsCard";
import OrderStatisticsCard from "examples/Cards/StatisticsCards/OrdersStatisticsCard";

//Data Model
import * as DM from "sisense/Schemas/ecommerce-master";

function Analytics(): JSX.Element {
  const { sales, tasks } = reportsLineChartData;
  const [dateRangeFilter, setDateRangeFilter] = useState(
    filterFactory.dateRange(DM.Commerce.Transaction_Date.Days, "2024-01-01", "2024-12-31")
  );

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <div>
            <DateRangeFilterTile
              title="Date Range"
              dataSource={DM.DataSource}
              attribute={DM.Commerce.Transaction_Date.Days}
              filter={dateRangeFilter}
              onChange={(newFilter: Partial<Filter> | null) =>
                setDateRangeFilter(newFilter as Filter | null)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <RevenueStatisticsCard
                title={"Total Revenue"}
                icon={"store"}
                filters={dateRangeFilter}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CostStatisticsCard title={"Total Cost"} icon={"warning"} filters={dateRangeFilter} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <CustomerStatisticsCard title={"To Be Paid"} icon={"leaderboard"} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <OrderStatisticsCard
                title={"Orders Filled"}
                filters={dateRangeFilter}
                icon={"timeline"}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container>
          <SalesByCountry filters={dateRangeFilter} />
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DayOfWeek />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <MDBox mb={3}>
                <SalesByAgeLine filters={dateRangeFilter} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
