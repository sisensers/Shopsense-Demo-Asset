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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultLineChart from "sisense/Charts/LineCharts/DefaultLineChart";
import GradientLineChart from "sisense/Charts/LineCharts/GradientLineChart";
import VerticalBarChart from "sisense/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "sisense/Charts/BarCharts/HorizontalBarChart";
import MixedChart from "sisense/Charts/MixedChart";
import BubbleChart from "sisense/Charts/BubbleChart";
import DefaultDoughnutChart from "sisense/Charts/DoughnutCharts/DefaultDoughnutChart";
import PieChart from "sisense/Charts/PieChart";
import RadarChart from "sisense/Charts/RadarChart";
import PolarChart from "sisense/Charts/PolarChart";

// Dropdown
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../../sisense/Schemas/old-ecommerce";
import { Data, filters, measures } from "@sisense/sdk-data";
import { useState } from "react";
import { DateRangeFilterTile } from "@sisense/sdk-ui";

//Nivo
import NivoLine from "../../../sisense/Charts/NivoCharts/NivoLineExample";
import NivoBump from "../../../sisense/Charts/NivoCharts/NivoBumpExample";
import NivoHeapMap from "../../../sisense/Charts/NivoCharts/NivoHeapMapExample";
import NivoRadialBar from "../../../sisense/Charts/NivoCharts/NivoRadialBarExample";

function SisenseCharts(): JSX.Element {
  const [dateRangeFilter, setDateRangeFilter] = useState(filters.dateRange(DM.Commerce.Date.Days));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <MDTypography variant="h5">Filters</MDTypography>
              <MDTypography variant="button" color="text">
                Sisense Filters that easily interact with all visualizations on page.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div>
                <DateRangeFilterTile
                  title="Date Range"
                  dataSource="Sample ECommerce"
                  attribute={DM.Commerce.Date.Days}
                  filter={dateRangeFilter}
                  onChange={(filter) => {
                    setDateRangeFilter(filter);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <MDTypography variant="h5">Charts</MDTypography>
              <MDTypography variant="button" color="text">
                Charts on this page use Nivo - Simple yet flexible JavaScript charting for designers
                & developers.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <NivoLine filters={dateRangeFilter} />
            </Grid>
            <Grid item xs={12} md={6}>
              <NivoBump filters={dateRangeFilter} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <NivoHeapMap filters={dateRangeFilter} />
            </Grid>
            <Grid item xs={12} md={6}>
              <NivoRadialBar filters={dateRangeFilter} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

// types
interface Types {
  labels: any;
  datasets: any;
}
interface Dataset {
  label: any;
  color: any;
  data: any;
}
interface Row {
  [key: string]: any;
}

const colorList = ["info", "dark", "primary", "secondary", "success", "error", "light"];

function TranslateSisenseDataToChartJS(data: Data) {
  const lineNames: Array<string> = [];
  const xAxisLabels: Array<string> = [];
  const datasets: Array<Dataset> = [];
  //gets a color from predefined options set in colors ts
  var colorPos = 0;
  data.rows.forEach((row: Row) => {
    //If empty add first element with Id
    if (lineNames.length === 0 || !lineNames.includes(row[1].text)) {
      const dataset: Dataset = {
        label: row[1].text,
        color: colorList[colorPos],
        data: [row[2].text],
      };
      //get color from list and update breakby checker
      colorPos++;
      lineNames.push(row[1].text);
      datasets.push(dataset);
      //update x axis label tracker
      if (xAxisLabels.length === 0 || !xAxisLabels.includes(row[0].text)) {
        xAxisLabels.push(row[0].text);
      }
    } else {
      //if id for breakby already exists then add to that list
      const pos = lineNames.indexOf(row[1].text);
      datasets[pos].data.push(row[2].text);
      if (xAxisLabels.length === 0 || !xAxisLabels.includes(row[0].text)) {
        xAxisLabels.push(row[0].text);
      }
    }
  });

  const translatedData: Types = {
    labels: xAxisLabels,
    datasets: datasets,
  };
  console.log("Translated Data");
  console.log(translatedData);
  return translatedData;
}

export default SisenseCharts;
