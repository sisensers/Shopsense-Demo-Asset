import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SalesTable from "examples/Tables/SalesTable";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, filterFactory, Filter } from "@sisense/sdk-data";
import US from "assets/images/icons/flags/US.png";
import DE from "assets/images/icons/flags/DE.png";
import GB from "assets/images/icons/flags/GB.png";
import BR from "assets/images/icons/flags/BR.png";

type Props = {
  filters: Filter;
};

function SalesByCountry(props: Props): JSX.Element {
  const handleCountryClick = (countryName: string) => {
    const encodedCountryName = encodeURIComponent(countryName);
    // Simulate navigation by updating the window location
    window.location.href = `/sisense/table/basic/${encodedCountryName}`;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex" alignItems="center" p={2}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            language
          </Icon>
        </MDBox>
        <MDTypography variant="h6" sx={{ ml: 2 }}>
          Sales By Region Last Month
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={6}>
            <ExecuteQuery
              dataSource={DM.DataSource}
              dimensions={[DM.Commerce.Country]}
              measures={[
                measureFactory.count(DM.Commerce.Transaction_ID, "Total Quantity"),
                measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
                measureFactory.sum(DM.Commerce.Cost, "Total Cost"),
              ]}
              filters={[
                props.filters,
                filterFactory.contains(DM.Commerce.Transaction_Date.Months, "2024-01"),
              ]}
            >
              {(data: Data) => {
                console.log(data);
                const sisenseTableData = TranslateSisenseDataToTable(data);
                return <SalesTable rows={sisenseTableData} shadow={false} />;
              }}
            </ExecuteQuery>
          </Grid>
          <Grid item xs={12} md={5} lg={6}>
            <VectorMap
              map={worldMerc}
              zoomOnScroll={false}
              zoomButtons={false}
              markersSelectable
              backgroundColor="transparent"
              containerStyle={{ height: "300px" }}
              containerClassName="map"
              selectedMarkers={["1", "3"]}
              markers={[
                { name: "USA", latLng: [40.71296415909766, -74.00437720027804] },
                { name: "Germany", latLng: [51.17661451970939, 10.97947735117339] },
                { name: "Brazil", latLng: [-7.596735421549542, -54.781694323779185] },
                { name: "Russia", latLng: [62.318222797104276, 89.81564777631716] },
                { name: "China", latLng: [22.320178999475512, 114.17161225541399] },
              ]}
              regionStyle={{
                initial: {
                  fill: "#dee2e7",
                  "fill-opacity": 1,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 0,
                },
              }}
              markerStyle={{
                initial: {
                  fill: "#e91e63",
                  stroke: "#ffffff",
                  "stroke-width": 5,
                  "stroke-opacity": 0.5,
                  r: 7,
                },
                hover: {
                  fill: "E91E63",
                  stroke: "#ffffff",
                  "stroke-width": 5,
                  "stroke-opacity": 0.5,
                },
                selected: {
                  fill: "E91E63",
                  stroke: "#ffffff",
                  "stroke-width": 5,
                  "stroke-opacity": 0.5,
                },
              }}
              style={{ marginTop: "-1.5rem" }}
              onRegionTipShow={() => false}
              onMarkerTipShow={() => false}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

interface TableRow {
  country: [string, string];
  sales: number;
  value: string;
  cost: string;
}

function TranslateSisenseDataToTable(
  data: Data
): { [key: string]: string | number | (string | number)[] }[] {
  const salesTable: { [key: string]: string | number | (string | number)[] }[] = [];
  data.rows.forEach((row: any) => {
    const countryMappings: Record<string, [string, string]> = {
      Brazil: [BR, "brazil"],
      Germany: [DE, "germany"],
      "United Kingdom": [GB, "great britain"],
      "United States": [US, "united states"],
    };

    const countryName = row[0].text;
    const countryWithFlag = countryMappings[countryName];

    if (countryWithFlag) {
      const tableRow: { [key: string]: string | number | (string | number)[] } = {
        country: countryWithFlag,
        sales: Math.floor(row[1].data),
        value: `$${row[2].data.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
        cost: `$${row[3].data.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
      };
      salesTable.push(tableRow);
    } else {
      console.error(
        `Error: Data not retrieved or flag values weren't changed for country: ${countryName}`
      );
    }
  });

  console.log(salesTable);
  return salesTable;
}

export default SalesByCountry;
