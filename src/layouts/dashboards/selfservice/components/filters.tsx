// File: charts.tsx

import React, { useState } from "react";
import { ExecuteQuery, Chart, MemberFilterTile, ThemeProvider } from "@sisense/sdk-ui";
import { Data, measures, filters, Filter } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

const theme = {
  chart: {
    textColor: "#3C3C44",
  },
  general: {
    brandColor: "#2196f3",
    primaryButtonTextColor: "white",
  },
  palette: {
    variantColors: ["#2196f3", "#0d47a1", "#050A30", "#7EC8E3"],
  },
  typography: {
    fontFamily: "roboto",
  },
};

const [countryFilter, setCountryFilter] = useState<Filter | null>(null);

interface MemberFilterTileProps {
  title: string;
  date: string;
}
export const CountryFilter: React.FC<MemberFilterTileProps> = ({ title, date }) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.Transaction_Date.Years, DM.Commerce.Transaction_Date.Months]}
      measures={[measures.sum(DM.Commerce.Quantity, "Total Quantity")]}
    >
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <MemberFilterTile
            title={"Country"}
            dataSource={DM.DataSource}
            attribute={DM.Commerce.Country}
            filter={countryFilter}
            onChange={setCountryFilter}
          />
        </ThemeProvider>
      )}
    </ExecuteQuery>
  );
};
