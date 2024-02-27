import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import RevenueStatisticsCard from "examples/Cards/StatisticsCards/RevenueStatisticsCard";
import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Images
import booking1 from "assets/images/ecommerce/Adidas.png";
import booking2 from "assets/images/ecommerce/ColumbiaShoes.png";
import booking3 from "assets/images/products/VersaceMedusaHeadHighTopSneakers.png";

import DayOfWeek from "sisense/Charts/DayOfWeek";
import SalesByAgeLine from "sisense/Charts/SalesByAgeLine";
import { DateRangeFilterTile } from "@sisense/sdk-ui";
import { Data, filters, measures } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";
import { useState } from "react";
import CustomerStatisticsCard from "examples/Cards/StatisticsCards/CustomerStatisticsCard";
import CostStatisticsCard from "examples/Cards/StatisticsCards/CostStatisticsCard";
import OrderStatisticsCard from "examples/Cards/StatisticsCards/OrdersStatisticsCard";

function Analytics(): JSX.Element {
  const { sales, tasks } = reportsLineChartData;
  const [dateRangeFilter, setDateRangeFilter] = useState(
    filters.dateRange(DM.Commerce.Transaction_Date.Days)
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
              onChange={(filter) => {
                setDateRangeFilter(filter);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <MDBox py={3}>
        <Grid container>
          <SalesByCountry filters={dateRangeFilter} />
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
                <CustomerStatisticsCard
                  title={"Total Customers"}
                  icon={"leaderboard"}
                  filters={dateRangeFilter}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <CostStatisticsCard
                  title={"Total Cost"}
                  icon={"warning"}
                  filters={dateRangeFilter}
                />
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
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Adidas Superstars!"
                  description="Adidas Superstar shoes effortlessly marry elegance with comfort, boasting a timeless design that effortlessly elevates any look, while their cushioned insoles and supportive structure make each step a luxurious and comfortable experience. Whether you are strolling down the street or making a fashion statement, these iconic sneakers provide a perfect blend of style and coziness."
                  price="$99/Pair"
                  location="Barcelona, Spain"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Columbia Running"
                  description="Columbia running shoes redefine the essence of comfort and versatility, enveloping each step with a harmonious blend of cushioned support that caters to the unique demands of both the track and daily activities, and their adaptable design seamlessly fuses performance with style, making them not just athletic essentials but also a statement of enduring comfort in any dynamic lifestyle."
                  price="$79/Pair"
                  location="London, UK"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Versace"
                  description="Versace shoes redefine the pinnacle of opulence and comfort, as sumptuous cushioning wraps each step in a cocoon of luxury that transcends mere functionality, and their versatile designs seamlessly transition from upscale events to everyday settings, ensuring an enduring symbol of lavish comfort that becomes an integral part of one's distinctive lifestyle, where every stride is a statement of sophistication and ease."
                  price="$129/Pair"
                  location="Milan, Italy"
                  action={actionButtons}
                />
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
