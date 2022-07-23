import { useState } from "react";

import { AsyncPaginate } from "react-select-async-paginate";

import axios from "axios";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

    const geoApiOptions = {
      method: "GET",
      url: `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_GEO_API_KEY}`,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
      }
    };

    return axios
      .request(geoApiOptions)
      .then((response) => {
        console.log(response.data.data);
        return {
          options: response.data.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            };
          })
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="h">
      <AsyncPaginate
        placeholder="search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
