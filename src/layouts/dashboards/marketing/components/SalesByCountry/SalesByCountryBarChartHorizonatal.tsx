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

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadgeDot from "components/MDBadgeDot";

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";
import SisensePieChart from "sisense/Charts/sisensePirChart";
import RerouteButton from "components/Reroute";
import SisenseLineChart from "sisense/Charts/LineChart";
import SalesBarChart from "./SalesByCountryBarChart";

function SalesByCountryBar(): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">Age Demographic</MDTypography>
        <Tooltip
          title="Sales
          Statistical Analysis
          For year 2023, Sales are 3M.
          
          Trend Analysis
          For the period between January 2023 and December 2023, Sales rose from 251.7K to 255.5K, reaching a high of 269K in October 2023.
          
          Time Variance Analysis
          Compared to the previous period, the overall Sales increased by 24.5K (10.6%) from 231K to 255.5K between November 2023 and December 2023 "
          placement="bottom"
          arrow
        >
          <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={20}>
            <SalesBarChart />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      ></MDBox>
    </Card>
  );
}

export default SalesByCountryBar;
