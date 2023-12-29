// HoverTooltip.tsx
import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import MDTypography from "components/MDTypography";
import { styled } from "@mui/material/styles";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    background: "linear-gradient(to bottom, #EDF2F3, #F0F2F3)",
  },
});

interface HoverTooltipProps {
  tooltipContentadidas: () => React.ReactNode;
  children: React.ReactElement; // Use React.ReactElement for children
}

const HoverTooltipAdidas: React.FC<HoverTooltipProps> = ({ children, tooltipContentadidas }) => {
  const content = tooltipContentadidas();

  return (
    <CustomWidthTooltip title={content} followCursor>
      {children}
    </CustomWidthTooltip>
  );
};

export default HoverTooltipAdidas;
