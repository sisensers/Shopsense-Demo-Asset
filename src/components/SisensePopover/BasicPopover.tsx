import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";

import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import blackChair from "assets/images/ecommerce/AdidasUltraboostRunningShoes.png";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MDButton
        variant="gradient"
        color="info"
        fullWidth
        aria-describedby={id}
        onClick={handleClick}
      >
        Open Popover
      </MDButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MDBox>
          <MDBox mb={5}>
            <ProductCell image={blackChair} name="Columbia Shoes" />
          </MDBox>
          <MDBox mb={1}>
            <DayOfWeek />
          </MDBox>
        </MDBox>
      </Popover>
    </div>
  );
}
