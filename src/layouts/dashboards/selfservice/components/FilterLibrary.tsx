import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { AgeRangeFilter, CountryFilter, DateFilter } from "./filters";
import { Filter } from "@sisense/sdk-data";

interface FilterLibraryProps {
  filters: string[];
  onSelectFilters: (selectedFilters: string[]) => void;
  onClose: () => void;
}

const FilterLibrary: React.FC<FilterLibraryProps> = ({ filters, onSelectFilters, onClose }) => {
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);

  const handleToggleFilter = (filterType: string) => {
    setSelectedFilterTypes((prevSelectedFilterTypes) => {
      if (prevSelectedFilterTypes.includes(filterType)) {
        return prevSelectedFilterTypes.filter((type) => type !== filterType);
      } else {
        return [...prevSelectedFilterTypes, filterType];
      }
    });
  };

  const handleAddToDashboard = () => {
    onSelectFilters(selectedFilterTypes);
    onClose();
  };

  const handleFilterChange = (newFilter: Filter): void => {
    console.log("Filter changed:", newFilter);
  };

  const renderFilterComponent = (filterType: string): JSX.Element => {
    switch (filterType.toLowerCase()) {
      case "countryfilter":
        return (
          <CountryFilter
            title="Country Filter"
            onChange={(newFilter: Filter) => handleFilterChange(newFilter)}
          />
        );
      case "datefilter":
        return (
          <DateFilter title="Date Filter" onChange={(newFilter) => handleFilterChange(newFilter)} />
        );
      case "agerangefilter":
        return (
          <AgeRangeFilter
            title="AgeRange Filter"
            onChange={(newFilter) => handleFilterChange(newFilter)}
          />
        );
      default:
        return <div>Filter not found</div>;
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Choose a Filter</DialogTitle>
      <DialogContent>
        {filters.map((filterType) => (
          <div key={filterType}>
            {renderFilterComponent(filterType)}
            <Button onClick={() => handleToggleFilter(filterType)}>
              {selectedFilterTypes.includes(filterType) ? "Deselect" : "Select"}
            </Button>
          </div>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAddToDashboard} color="primary">
          Add to Dashboard
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterLibrary;
