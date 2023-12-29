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
import PieChart from "examples/Charts/PieChart";

// Data
import channelChartData from "layouts/dashboards/sales/components/ChannelsChart/data";

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";
import SisensePieChart from "sisense/Charts/sisensePirChart";
import RerouteButton from "components/Reroute";
import SalesLineChart from "../SalesLineChart";

function ChannelsChart(): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">Age Demographic</MDTypography>
        <Tooltip
          title="Total Revenue
Total Revenue for these five Age Ranges is $9M. Percentage contributions to the total lie between 16.2% and 31.9% for the different Age Ranges.

The Age Range values, in order of importance, are as follows:

41-50, $2.9M (31.9% of the total)
30-35, $1.7M (19.1%)
36-40, $1.5M (16.5%)
20-24, $1.5M (16.3%)
25-29, $1.5M (16.2%)"
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
            <SisensePieChart />
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

export default ChannelsChart;
