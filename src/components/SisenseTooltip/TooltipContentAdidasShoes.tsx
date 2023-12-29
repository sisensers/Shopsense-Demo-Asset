// TooltipContent.tsx
import React from "react";
import MDBox from "components/MDBox";

import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";

// Sisense
import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import MDButton from "components/MDButton";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import HoverTooltipAdidasShoes from "./HoverTooltipAdidasShoes";
import chairWood from "assets/images/ecommerce/Adidas.png";

function TooltipContentAdidasShoes() {
  const tooltipContentadidasshoes = () => (
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
        <MDBox mb={5}>
          <ProductCell image={chairWood} name="Adidas Shoes" />
        </MDBox>
        <MDBox mb={1}>
          <DayOfWeek />
        </MDBox>
      </MDBox>
      <HoverTooltipAdidasShoes tooltipContentadidasshoes={tooltipContentadidasshoes}>
        <span></span>
      </HoverTooltipAdidasShoes>
    </div>
  );
}

export default TooltipContentAdidasShoes;
