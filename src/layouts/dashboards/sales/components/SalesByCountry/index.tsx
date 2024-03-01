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

// Sisense
import { ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measureFactory, filterFactory } from "@sisense/sdk-data";

function SalesByCountryTable(): JSX.Element {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <MDBox display="flex">
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Sales by Country
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={15} md={10} lg={12}>
            <ExecuteQuery
              dataSource={DM.DataSource}
              dimensions={[DM.Commerce.Country]}
              measures={[
                measureFactory.count(DM.Commerce.Transaction_ID, "Total Quantity"),
                measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
                measureFactory.sum(DM.Commerce.Cost, "Total Cost"),
              ]}
              filters={[
                filterFactory.members(DM.Commerce.Country, [
                  "United States",
                  "Germany",
                  "United Kingdom",
                  "Brazil",
                ]),
              ]}
            >
              {(queryState: QueryState) => {
                if (queryState.isLoading) {
                  return <div>Loading...</div>;
                }

                if (queryState.error) {
                  return <div>Error: {queryState.error.message}</div>;
                }

                const data: Data = queryState.data;
                console.log(data);
                const sisenseTableData = TranslateSisenseDataToTable(data);

                return <SalesTable rows={sisenseTableData} shadow={false} />;
              }}
            </ExecuteQuery>
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

export default SalesByCountryTable;
