import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";

import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import ReactLogo from "assets/images/ReactLogo.png";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import CodeReference from "components/TooltipCodeSnippet";

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
        Width="20px"
        aria-describedby={id}
        onClick={handleClick}
      >
        Code Example
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
        <MDBox mb={5}>
          <MDBox mb={0} style={{ backgroundColor: "white", borderRadius: "8px 8px 0 0" }}>
            <ProductCell
              image={ReactLogo}
              name={
                // Use `as string` to cast the JSX element to a string
                // Use `as string` to cast the JSX element to a string
                (
                  <a
                    href="https://www.sisense.com/blog/take-control-of-your-data-visualizations/?utm_source=linkedin&utm_medium=organic_social"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Connecting Sisense to third-party visualizations
                  </a>
                ) as unknown as string
              }
            />
          </MDBox>

          <MDBox>
            <CodeReference />
          </MDBox>
        </MDBox>
      </Popover>
    </div>
  );
}
