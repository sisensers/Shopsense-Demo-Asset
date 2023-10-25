import React from "react";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import HoverTooltip from "components/SisenseTooltip/HoverTooltip";
import HoverTooltipVersace from "components/SisenseTooltip/HoverTooltipVersace";
import TooltipContent from "components/SisenseTooltip/TooltipContent";
import TooltipContentVersace from "components/SisenseTooltip/TooltipContentVersace";
import DataTable from "examples/Tables/DataTable";
import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import ReviewCell from "layouts/ecommerce/products/product-page/components/ReviewCell";
import DefaultCell from "layouts/ecommerce/products/product-page/components/DefaultCell";
import blackChair from "assets/images/ecommerce/AdidasUltraboostRunningShoes.png";
import chairPink from "assets/images/ecommerce/VersaceMedusaHeadHighTopSneakers.png";
import chairSteel from "assets/images/ecommerce/adidas-hoodie.jpeg";
import chairWood from "assets/images/ecommerce/Adidas.png";
import HoverTooltipAdidas from "components/SisenseTooltip/HoverTooltipAdidas";
import TooltipContentAdidas from "components/SisenseTooltip/TooltipContentAdidas";
import HoverTooltipAdidasShoes from "components/SisenseTooltip/HoverTooltipAdidasShoes";
import TooltipContentAdidasShoes from "components/SisenseTooltip/TooltipContentAdidasShoes";
import FollowCursorTooltips from "components/SisenseTooltip/FollowCursorTooltips";

const dataTableData = {
  columns: [
    { Header: "product", accessor: "product", width: "50%" },
    { Header: "price", accessor: "price", width: "10%" },
    { Header: "review", accessor: "review", align: "center" },
    { Header: "availability", accessor: "availability", align: "center", width: "40%" },
    { Header: "id", accessor: "id", align: "center" },
  ],

  rows: [
    {
      product: (
        <>
          <>
            {/* Add the HoverTooltip component here */}
            <HoverTooltip tooltipContent={TooltipContent}>
              <span>
                <ProductCell image={blackChair} name="Columbia Shoes" />
              </span>
            </HoverTooltip>
          </>
        </>
      ),
      price: <DefaultCell>$89.53</DefaultCell>,
      review: (
        <span>
          <ReviewCell rating={4.5} />
        </span>
      ),
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={80} color="success" />
        </MDBox>
      ),
      id: (
        <>
          <DefaultCell>230019</DefaultCell>
        </>
      ),
    },
    {
      product: (
        <>
          <>
            {/* Add the HoverTooltip component here */}
            <HoverTooltipVersace TooltipContentVersace={TooltipContentVersace}>
              <span>
                <ProductCell image={chairPink} name="Versace Shoes" />
              </span>
            </HoverTooltipVersace>
          </>
        </>
      ),
      price: <DefaultCell>$99.99</DefaultCell>,
      review: <ReviewCell rating={5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={90} color="success" />
        </MDBox>
      ),
      id: <DefaultCell>87120</DefaultCell>,
    },
    {
      product: (
        <>
          <>
            {/* Add the HoverTooltip component here */}
            <HoverTooltipAdidas tooltipContentadidas={TooltipContentAdidas}>
              <span>
                <ProductCell image={chairSteel} name="Adidas Hoodie" />
              </span>
            </HoverTooltipAdidas>
          </>
        </>
      ),
      price: <DefaultCell>$129.00</DefaultCell>,
      review: <ReviewCell rating={4.5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={60} color="warning" />
        </MDBox>
      ),
      id: <DefaultCell>412301</DefaultCell>,
    },
    {
      product: (
        <>
          <>
            {/* Add the HoverTooltip component here */}
            <HoverTooltipAdidasShoes tooltipContentadidasshoes={TooltipContentAdidasShoes}>
              <span>
                <ProductCell image={chairWood} name="Adidas Shoes" />
              </span>
            </HoverTooltipAdidasShoes>
          </>
        </>
      ),
      price: <DefaultCell>$59.99</DefaultCell>,
      review: <ReviewCell rating={4.5} />,
      availability: (
        <MDBox width="8rem">
          <MDProgress variant="gradient" value={40} color="warning" />
        </MDBox>
      ),
      id: <DefaultCell>001992</DefaultCell>,
    },
  ],
};

export default dataTableData;
