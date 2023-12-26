import React from "react";
import { Filter } from "@sisense/sdk-data";
import { Button, Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CountryFilter, DateFilter, AgeRangeFilter } from "./filters";
import * as DM from "sisense/Schemas/ecommerce-master";

interface FiltersComponentProps {
  filters: { type: string; filter: Filter | null }[];
  onChange: (index: number, newFilter: Filter | null) => void;
  onDelete: (index: number) => void;
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({ filters, onChange, onDelete }) => {
  return (
    <div>
      {filters.map(({ filter, type }, index) => (
        <Card key={index} style={{ marginTop: "8px" }}>
          <CardContent>
            {renderFilterComponent(type, filter, index, onChange)}
            <IconButton onClick={() => onDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const renderFilterComponent = (
  type: string,
  filter: Filter | null,
  index: number,
  onChange: (index: number, newFilter: Filter | null) => void
): JSX.Element => {
  switch (type.toLowerCase()) {
    case "countryfilter":
      return (
        <CountryFilter
          title="Country Filter"
          onChange={(newFilter) => onChange(index, newFilter)}
        />
      );
    case "datefilter":
      return (
        <DateFilter title="Date Filter" onChange={(newFilter) => onChange(index, newFilter)} />
      );
    case "agerangefilter":
      return (
        <AgeRangeFilter
          title="AgeRange Filter"
          onChange={(newFilter) => onChange(index, newFilter)}
        />
      );
    default:
      return <div>Filter not found</div>;
  }
};

export default FiltersComponent;
function handleFilterChange(newFilter: Filter): void {
  throw new Error("Function not implemented.");
}
