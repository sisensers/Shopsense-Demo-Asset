import React from "react";
import MDBox from "components/MDBox";
import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import blackChair from "assets/images/ecommerce/AdidasUltraboostRunningShoes.png";
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import HoverTooltip from "./HoverTooltip";

function TooltipContent() {
  const tooltipContent = () => (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: `
        This analysis measures Revenue by transaction dates. Total Revenue was 830.31 across all
        transaction dates. Values ranged from 100.15 (2/6/21) to 405.84 (4/2/21). Revenue improved
        by // eslint-disable-next-line prettier/prettier by 114% over the course of the series
        and ended on a good note, increasing significantly final transaction dates. The largest
        single increase occurred in 4/2/21 (+305%).
      `,
        }}
      />
    </div>
  );

  return (
    <div>
      <HoverTooltip tooltipContent={tooltipContent}>
        <span></span>
      </HoverTooltip>
    </div>
  );
}

export default TooltipContent;
