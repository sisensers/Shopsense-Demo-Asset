import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "components/MDButton";

export default function FollowCursorTooltips() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("I got clicked");
  };
  const id = open ? "simple-popover" : undefined;

  return (
    <Tooltip title="You don't have permission to do this" followCursor>
      <MDButton
        variant="gradient"
        color="info"
        fullWidth
        aria-describedby={id}
        onClick={handleClick}
      >
        Tooltip Hover
      </MDButton>
    </Tooltip>
  );
}
