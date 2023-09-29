/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @react-jvectormap components
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import SalesTable from "examples/Tables/SalesTable";

// Assets
// Countries flags
import US from "assets/images/icons/flags/US.png";
import DE from "assets/images/icons/flags/DE.png";
import GB from "assets/images/icons/flags/GB.png";
import BR from "assets/images/icons/flags/BR.png";

// Data
import salesTableData from "layouts/dashboards/analytics/components/SalesByCountry/data/salesTableData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";

function SalesByCountry(): JSX.Element {
  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">
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
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Sales by Country
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={7} lg={6}>
            <ExecuteQuery
              dataSource={DM.DataSource}
              dimensions={[DM.Commerce.Country]}
              measures={[
                measures.count(DM.Commerce.Transaction_ID, "Total Quantity"),
                measures.sum(DM.Commerce.Revenue, "Total Revenue"),
                measures.sum(DM.Commerce.Cost, "Total Cost"),
              ]}
              filters={[
                filters.members(DM.Commerce.Country, [
                  "United States",
                  "Germany",
                  "United Kingdom",
                  "Brazil",
                ]),
              ]}
            >
              {(data: Data) => {
                console.log(data);
                const sisenseTableData = TranslateSisenseDataToTable(data);
                return <SalesTable rows={sisenseTableData} shadow={false} />;
              }}
            </ExecuteQuery>
          </Grid>
          <Grid item xs={12} md={5} lg={6} sx={{ mt: { xs: 5, lg: 0 } }}>
            <VectorMap
              map={worldMerc}
              zoomOnScroll={false}
              zoomButtons={false}
              markersSelectable
              backgroundColor="transparent"
              containerStyle={{
                height: "100px",
              }}
              containerClassName="map"
              selectedMarkers={["1", "3"]}
              markers={[
                {
                  name: "USA",
                  latLng: [40.71296415909766, -74.00437720027804],
                },
                {
                  name: "Germany",
                  latLng: [51.17661451970939, 10.97947735117339],
                },
                {
                  name: "Brazil",
                  latLng: [-7.596735421549542, -54.781694323779185],
                },
                {
                  name: "Russia",
                  latLng: [62.318222797104276, 89.81564777631716],
                },
                {
                  name: "China",
                  latLng: [22.320178999475512, 114.17161225541399],
                },
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
              style={{
                marginTop: "-1.5rem",
              }}
              onRegionTipShow={() => false}
              onMarkerTipShow={() => false}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

interface Row {
  [key: string]: any;
}
interface Column {
  [key: string]: any;
}
interface TableRow {
  [key: string]: string | number | (string | number)[];
}

function TranslateSisenseDataToTable(data: Data) {
  const salesTable: Array<TableRow> = [];
  data.rows.forEach((row: Row) => {
    var countryWithFlag;
    if (row[0].text === "Brazil") {
      countryWithFlag = [BR, "brazil"];
    } else if (row[0].text === "Germany") {
      countryWithFlag = [DE, "germany"];
    } else if (row[0].text === "United Kingdom") {
      countryWithFlag = [GB, "great britain"];
    } else if (row[0].text === "United States") {
      countryWithFlag = [US, "united states"];
    } else {
      console.log("Error: Data not retrieved or flag values werent changed");
    }
    const tableRow: TableRow = {
      country: countryWithFlag,
      sales: Math.floor(row[1].data),
      value: "$".concat(row[2].data.toLocaleString("en-US", { maximumFractionDigits: 2 })),
      cost: "$".concat(row[3].data.toLocaleString("en-US", { maximumFractionDigits: 2 })),
    };
    salesTable.push(tableRow);
  });
  console.log(salesTable);
  return salesTable;
}

export default SalesByCountry;
