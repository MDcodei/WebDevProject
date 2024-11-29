"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import LocationForm from "./LocationForm";
import HomeMapsNew from "../components/googlemap_new";

const NewBody: React.FC = () => {
  const [searchedPlace, setSearchedPlace] = useState("");

  const handleSearch = (query: string) => {
    setSearchedPlace(query); // Pass the search query to HomeMapsNew
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* <LocationForm /> */}
      <HomeMapsNew searchedPlace={searchedPlace} />
    </div>
  );
};

export default NewBody;
