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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/pages-sisense/product-page/components/ProductImages";
import ProductInfo from "layouts/pages-sisense/product-page/components/ProductInfo";

// Data
import dataTableData from "layouts/pages-sisense/product-page/data/dataTableData";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";

// Sisense Components
import BasicPopOver from "components/SisensePopover/BasicPopover";
import TransitionModal from "components/SisenseModal/TransitionModal";
import FollowCursorTooltips from "components/SisenseTooltip/FollowCursorTooltips";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HoverTooltip from "components/SisenseTooltip/HoverTooltip";
import TooltipContent from "components/SisenseTooltip/TooltipContent";
import MapChart from "components/Maps/Map";
import HighChartsDrill from "components/Maps/HighChartsDrill";
import BasicPopover from "components/SisensePopover/BasicPopover";
import tooltipcontent from "components/SisenseTooltip/TooltipContent";
import MyComponent from "components/SisenseTooltip/TooltipContent";

function SisenseProductPage(): JSX.Element {
  const [infoSB, setInfoSB] = useState<boolean>(false);

  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="This analysis measures Revenue by days in transaction_date.
      Total Revenue was 830.31 across all four days in transaction_date.
      Values ranged from 100.15 (2/6/21) to 405.84 (4/2/21).
      Revenue rose by 114% over the course of the series and ended on a good note,
       increasing significantly in the final days in transaction_date.
      The largest single increase occurred in 4/2/21 (+305%)."
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Product Details
              </MDTypography>
            </MDBox>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} xl={5}>
                  <ProductImages />
                </Grid>
                <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                  <ProductInfo />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={4} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Other Products
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SisenseProductPage;
