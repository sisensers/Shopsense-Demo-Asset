import React, { useState } from "react";
import { ExecuteQuery, MemberFilterTile, ThemeProvider } from "@sisense/sdk-ui";
import { Data, Filter } from "@sisense/sdk-data";
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
      {(data: Data) => (
        <ThemeProvider theme={theme}>
          <MemberFilterTile
            title={title}
            dataSource={DM.DataSource}
            attribute={attribute}
            filter={filter}
            onChange={(newFilter) => {
              setFilter(newFilter);
              onChange(newFilter);
            }}
          />
        </ThemeProvider>
      )}
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
