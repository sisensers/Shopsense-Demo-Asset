import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import image1 from "assets/images/products/NikeAirForce1Sneakers.png";
import image2 from "assets/images/products/NikeFreeRNFlyknitRunningShoes.png";
import image6 from "assets/images/products/VersaceMedusaHeadHighTopSneakers.png";
import image7 from "assets/images/products/UnderArmourCrossTrainingShoes.png";
import image4 from "assets/images/products/NikeRosheRunSneakers.png";
import image5 from "assets/images/products/UnderArmourRunningShoes.png";
import HoverTooltipAdidas from "./SisenseTooltip/HoverTooltipAdidas";
import HoverTooltipAdidasShoes from "./SisenseTooltip/HoverTooltipAdidasShoes";
import ProductCell from "layouts/dashboards/sales/components/ProductCell";
import TooltipContentAdidasShoes from "./SisenseTooltip/TooltipContentAdidasShoes";
import BasicPopover from "./SisensePopover/BasicPopover";
import InfoPopover from "./SisensePopover/InfoPopover";

export default function TitlebarImageList() {
  return (
    <ImageList sx={{ width: "auto", height: "auto" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Gallery</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={<InfoPopover />}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: image1,
    title: "Nike Air Force 1 Sneakers",
    author: "$99",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: image2,
    title: "Nike Free Fit Running Shoes",
    author: "$120",
  },
  {
    img: image6,
    title: "Versace Medusa Head High",
    author: "$200",
  },
  {
    img: image7,
    title: "Under Armor Training Shoes",
    author: "$115",
    cols: 2,
  },
  {
    img: image4,
    title: "Nike Rosh",
    author: "$135",
    cols: 2,
  },
  {
    img: image5,
    title: "Under Armour Shoes",
    author: "$225",
    rows: 2,
    cols: 2,
    featured: true,
  },
];
