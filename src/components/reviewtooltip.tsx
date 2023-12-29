// TooltipContent.tsx
import React from "react";
import MDBox from "components/MDBox";

import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import chairSteel from "assets/images/ecommerce/adidas-hoodie.jpeg";
import HoverTooltip from "./SisenseTooltip/HoverTooltip";

function reviewtooltip() {
  const reviewtooltip = () => (
    <div>
      <p>
        This analysis measures Revenue by transaction dates. Total Revenue was 830.31 across all
        transaction dates. Values ranged from 100.15 (2/6/21) to 405.84 (4/2/21). Revenue improved
        by // eslint-disable-next-line prettier/prettier by by 114% over the course of the series
        and ended on a good note, increasing significantly final transaction dates. The largest
        single increase occurred in 4/2/21 (+305%).
      </p>
    </div>
  );

  return (
    <div>
      <MDBox>
        <HoverTooltip tooltipContent={reviewtooltip}>
          <span></span>
        </HoverTooltip>
      </MDBox>
    </div>
  );
}

export default reviewtooltip;
