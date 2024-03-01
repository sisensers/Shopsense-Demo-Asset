import React, { useState } from "react";
import { ExecuteQuery, MemberFilterTile, QueryState, ThemeProvider } from "@sisense/sdk-ui";
import { Data, Filter, DimensionalDataModel } from "@sisense/sdk-data";
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

interface CommonFilterProps {
  title: string;
  onChange: (newFilter: Filter | null) => void;
  attribute: any; // Adjust the type accordingly
}

const CommonFilter: React.FC<CommonFilterProps> = ({ title, onChange, attribute }) => {
  const [filter, setFilter] = useState<Filter | null>(null);

  return (
    <ExecuteQuery dataSource={DM.DataSource} dimensions={[attribute]}>
      {(queryState: QueryState) => {
        if (queryState.isLoading) {
          return <div>Loading...</div>;
        }

        if (queryState.error) {
          return <div>Error: {queryState.error.message}</div>;
        }

        // Access queryState.data for Data
        const data: Data = queryState.data;

        return (
          <ThemeProvider theme={theme}>
            <MemberFilterTile
              title={title}
              dataSource={DM.DataSource}
              attribute={attribute}
              filter={filter}
              onChange={(newFilter: Partial<Filter> | null) => {
                setFilter(newFilter as Filter | null);
                onChange(newFilter as Filter | null);
              }}
            />
          </ThemeProvider>
        );
      }}
    </ExecuteQuery>
  );
};

interface CountryFilterProps {
  title: string;
  onChange: (newFilter: Filter | null) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ title, onChange }) => (
  <CommonFilter title={title} onChange={onChange} attribute={DM.Commerce.Country} />
);

interface DateFilterProps {
  title: string;
  onChange: (newFilter: Filter | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ title, onChange }) => (
  <CommonFilter title={title} onChange={onChange} attribute={DM.Commerce.Transaction_Date.Months} />
);

interface AgeRangeFilterProps {
  title: string;
  onChange: (newFilter: Filter | null) => void;
}

const AgeRangeFilter: React.FC<AgeRangeFilterProps> = ({ title, onChange }) => (
  <CommonFilter title={title} onChange={onChange} attribute={DM.Commerce.AgeRange} />
);

export { CountryFilter, DateFilter, AgeRangeFilter };
