import React from "react";
import { Box } from "@mui/material";
import CustomTextField from "./CustomTextfield";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Call the parent function with the input value
  };

  return (
    <Box mb={2} width="100%">
      <CustomTextField
        label="Search Users"
        type="text"
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchBar;
