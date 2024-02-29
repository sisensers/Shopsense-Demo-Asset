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

function RevenueStatisticsCard({ color, title, icon, percentage, filters }: Props): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Fetch and set the count value dynamically here
    // For example, you can use the ExecuteQuery component to fetch data from Sisense
  }, []); // Add dependencies if needed

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
            dimensions={[] /* Add your dimensions */}
            measures={[measureFactory.sum(DM.Commerce.Revenue, "Total")]}
            filters={[filters]}
          >
            {(data: Data) => {
              const dynamicCount = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : "0";
              const formattedCount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                compactDisplay: "short",
              }).format(Number(dynamicCount));

              setCount(Number(dynamicCount));

              return <MDTypography variant="h4">{formattedCount}</MDTypography>;
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

RevenueStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    label: "Growth Rate 5%",
  },
};

export default RevenueStatisticsCard;
