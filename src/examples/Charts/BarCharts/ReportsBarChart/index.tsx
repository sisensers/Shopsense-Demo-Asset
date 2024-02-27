import React, { useMemo } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";

interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  title: string;
  description?: string | React.ReactNode;
  date: string;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    };
  };
  [key: string]: any;
}

function ReportsBarChart({ color, title, description, date, chart }: Props): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "400px" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="auto"
            >
              <Bar data={data} options={options} placeholder={undefined} />
            </MDBox>
          ),
          [chart, color]
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ReportsBarChart.defaultProps = {
  color: "dark",
  description: "",
};

export default ReportsBarChart;
