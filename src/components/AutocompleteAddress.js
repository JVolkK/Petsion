import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

const loadOptions = async (inputValue) => {
  try {
    const apiUrl = "https://nominatim.openstreetmap.org/search";
    const params = {
      q: inputValue,
      format: "json", // specify the desired format of the response
    };

    // Making GET request to the API
    const response = await axios.get(apiUrl, { params });

    // Extracting display_name from each object in the response data
    const options = response.data.map((item) => ({
      value: item.display_name,
      label: item.display_name,
    }));

    return options;
  } catch (error) {
    // Handling errors
    console.error("Error occurred while fetching data:", error);
    return null; // or handle the error in a different way, like throwing it
  }
};

const AutocompleteAddress = ({ onSelect, selectedAddress }) => (
  <AsyncSelect loadOptions={loadOptions} onChange={onSelect} />
);

export default AutocompleteAddress;
