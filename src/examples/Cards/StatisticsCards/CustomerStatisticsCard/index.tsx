import { ReactNode, useEffect, useState } from "react";
import { ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, Filter, Cell, filterFactory } from "@sisense/sdk-data";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Popover from "@mui/material/Popover";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Transactions from "layouts/pages/account/billing/components/Transactions";

interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  title: string;
  icon: ReactNode;
  percentage?: {
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "white";
    amount: string | number;
    label: string;
  };
}

const measure1 = measureFactory.sum(DM.Commerce.Revenue);
const measure2 = measureFactory.sum(DM.Commerce.Cost);
const measureDifference = measureFactory.subtract(measure1, measure2);

function CustomerStatisticsCard({ color, title, icon, percentage }: Props): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {}, []);

  const handleMoneyIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
  };

  const formatCurrencyCondensed = (value: number): string => {
    const suffixes = ["", "K", "M", "B", "T"];
    const order = Math.floor(Math.log10(value) / 3);
    const suffix = suffixes[order];
    const shortValue = value / Math.pow(10, order * 3);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Change this to your desired currency code
      minimumFractionDigits: 0,
      maximumFractionDigits: order === 0 ? 0 : 2, // Add this line
    });

    return formatter.format(shortValue) + suffix;
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
            measures={[measureDifference]}
            filters={[filterFactory.contains(DM.Commerce.Transaction_Date.Months, "2024-02")]}
          >
            {(queryState: QueryState) => {
              if (queryState.isLoading) {
                return <div>Loading...</div>;
              }

              if (queryState.error) {
                return <div>Error: {queryState.error.message}</div>;
              }

              const data: Data = queryState.data;
              const dynamicCount = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : 0;

              setCount(Number(dynamicCount));

              return (
                <MDTypography variant="h4">{formatCurrencyCondensed(dynamicCount)}</MDTypography>
              );
            }}
          </ExecuteQuery>
        </MDBox>
        <IconButton
          style={{ position: "absolute", bottom: 8, right: 8 }}
          onClick={handleMoneyIconClick}
          color="success"
        >
          <AttachMoneyIcon />
        </IconButton>
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
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Transactions />
      </Popover>
    </Card>
  );
}

CustomerStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    label: "Growth Rate 2%",
  },
};

export default CustomerStatisticsCard;
