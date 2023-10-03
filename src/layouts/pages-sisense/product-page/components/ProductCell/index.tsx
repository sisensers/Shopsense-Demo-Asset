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

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import * as React from "react";
import TransitionModal from "components/SisenseModal/TransitionModal";
import BasicPopOver from "components/SisensePopover/BasicPopover";
import blackChair from "assets/images/ecommerce/AdidasUltraboostRunningShoes.png";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import Popover from "@mui/material/Popover";

// Declaring props types for ProductCell
interface Props {
  image: string;
  name: string;
}

function ProductCell({ image, name }: Props): JSX.Element {
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
    <MDBox display="flex" alignItems="center" pr={2}>
      <MDButton fullWidth aria-describedby={id} onClick={handleClick}>
        <MDBox mr={2}>
          <MDAvatar src={image} alt={name} />
        </MDBox>
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MDBox>
          <MDBox mb={5}>
            <ProductCell image={image} name={name} />
          </MDBox>
          <MDBox mb={1}>
            <DayOfWeek />
          </MDBox>
        </MDBox>
      </Popover>
    </MDBox>
  );
}

export default ProductCell;
