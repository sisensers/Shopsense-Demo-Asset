import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { styled } from "@mui/material/styles";

export default function FollowCursorTooltips() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("I got clicked");
  };
  const id = open ? "simple-popover" : undefined;

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  return (
    <CustomWidthTooltip
      title={
        <MDTypography color="white" variant="h5" fontWeight="medium">
          This analysis measures Revenue by transaction dates. Total Revenue was 830.31 across all
          four transaction dates. Values ranged from 100.15 (2/6/21) to 405.84 (4/2/21). Revenue
          improved by 114% over the course of the series and ended on a good note, increasing
          significantly in the final transaction dates. The largest single increase occurred in
          4/2/21 (+305%).
        </MDTypography>
      }
      followCursor
    >
      <MDButton
        variant="gradient"
        color="info"
        fullWidth
        aria-describedby={id}
        onClick={handleClick}
      >
        Tooltip Hover
      </MDButton>
    </CustomWidthTooltip>
  );
}
