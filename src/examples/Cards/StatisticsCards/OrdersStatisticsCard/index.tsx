import { ReactNode, useEffect, useState } from "react";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, Filter, Cell } from "@sisense/sdk-data";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  title: string;
  icon: ReactNode;
  percentage?: {
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "white";
    amount: string | number;
    label: string;
  };
  filters: Filter;
}

function OrderStatisticsCard({ color, title, icon, percentage, filters }: Props): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {}, []);

  const formatNumber = (value: number): string => {
    const suffixes = ["", "K", "M", "B", "T"];
    const order = Math.floor(Math.log10(value) / 3);
    const suffix = suffixes[order];
    const shortValue = value / Math.pow(10, order * 3);
    return shortValue.toFixed(2) + suffix;
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[]}
            measures={[measureFactory.sum(DM.Commerce.Quantity, "Total")]}
            filters={[filters]}
          >
            {(data: Data) => {
              const dynamicCount = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : 0;

              setCount(Number(dynamicCount));

              return <MDTypography variant="h4">{formatNumber(dynamicCount)}</MDTypography>;
            }}
          </ExecuteQuery>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.label}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </Card>
  );
}

OrderStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    label: "Growth Rate 7%",
  },
};

export default OrderStatisticsCard;
