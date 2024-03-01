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

// Data
import defaultLineChartData from "sisense/ChartData/defaultLineChartData";
import gradientLineChartData from "sisense/ChartData/gradientLineChartData";
import verticalBarChartData from "sisense/ChartData/verticalBarChartData";
import horizontalBarChartData from "sisense/ChartData/horizontalBarChartData";
import mixedChartData from "sisense/ChartData/mixedChartData";
import bubbleChartData from "sisense/ChartData/bubbleChartData";
import defaultDoughnutChartData from "sisense/ChartData/defaultDoughnutChartData";
import pieChartData from "sisense/ChartData/pieChartData";
import radarChartData from "sisense/ChartData/radarChartData";
import polarChartData from "sisense/ChartData/polarChartData";

// Sisense
import { ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory } from "@sisense/sdk-data";

function SisenseCharts(): JSX.Element {
  console.log(defaultLineChartData);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <MDTypography variant="h5">Charts</MDTypography>
              <MDTypography variant="button" color="text">
                Charts on this page use Chart.js - Simple yet flexible JavaScript charting for
                designers & developers.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ExecuteQuery
                dataSource={DM.DataSource}
                dimensions={[DM.Commerce.Transaction_Date.Months, DM.CustomerReviews.Sentiment]}
                measures={[
                  measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
                  measureFactory.sum(DM.Commerce.Cost, "Total Cost"),
                ]}
                filters={[]}
              >
                {(queryState: QueryState) => {
                  if (queryState.isLoading) {
                    return <div>Loading...</div>;
                  }

                  if (queryState.error) {
                    return <div>Error: {queryState.error.message}</div>;
                  }

                  const data: Data = queryState.data;

                  // Your rendering logic here
                  console.log(data);
                  const translatedData = TranslateSisenseDataToChartJS(data);

                  return (
                    <DefaultLineChart
                      icon={{ component: "insights" }}
                      title="Line chart"
                      description="Product insights"
                      chart={translatedData}
                    />
                  );
                }}
              </ExecuteQuery>
            </Grid>
            <Grid item xs={12} md={6}>
              <ExecuteQuery
                dataSource={DM.DataSource}
                dimensions={[DM.Commerce.Transaction_Date.Months, DM.CustomerReviews.Sentiment]}
                measures={[
                  measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
                  measureFactory.sum(DM.Commerce.Cost, "Total Cost"),
                ]}
                filters={[]}
              >
                {(queryState: QueryState) => {
                  if (queryState.isLoading) {
                    return <div>Loading...</div>;
                  }

                  if (queryState.error) {
                    return <div>Error: {queryState.error.message}</div>;
                  }

                  const data: Data = queryState.data;

                  // Your rendering logic here
                  console.log(data);
                  const translatedGradientData = TranslateSisenseDataToChartJS(data);

                  return (
                    <GradientLineChart
                      icon={{ component: "show_chart" }}
                      title="Line chart with gradient"
                      description="Visits from devices"
                      chart={translatedGradientData}
                    />
                  );
                }}
              </ExecuteQuery>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VerticalBarChart
                icon={{ color: "dark", component: "leaderboard" }}
                title="Bar chart"
                description="Sales related to age average"
                chart={verticalBarChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <HorizontalBarChart
                icon={{ color: "dark", component: "splitscreen" }}
                title="Bar chart horizontal"
                description="Sales related to age average"
                chart={horizontalBarChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MixedChart
                icon={{ color: "primary", component: "auto_graph" }}
                title="Mixed chart"
                description="Analytics Insights"
                height="19.75rem"
                chart={mixedChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BubbleChart
                icon={{ color: "primary", component: "multiline_chart" }}
                title="Bubble chart"
                description="Users divided by regions"
                chart={bubbleChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultDoughnutChart
                icon={{ color: "success", component: "donut_small" }}
                title="Doughnut chart"
                description="Affiliates program"
                chart={defaultDoughnutChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChart
                icon={{ color: "success", component: "donut_small" }}
                title="Pie chart"
                description="Analytics Insights"
                chart={pieChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RadarChart
                icon={{ color: "warning", component: "data_saver_on" }}
                title="Radar chart"
                description="Sciences score"
                chart={radarChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PolarChart
                icon={{ color: "warning", component: "scatter_plot" }}
                title="Polar chart"
                description="Analytics Insights"
                chart={polarChartData}
              />
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
