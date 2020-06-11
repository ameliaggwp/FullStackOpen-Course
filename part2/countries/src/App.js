import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, searchTerm }) => {
  const countriesList = [];
  if (searchTerm) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
        countriesList.push(countries[i].name);
      }
    }
    return <div>{countriesList}</div>;
  }
  return <div>No search entered</div>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <form>
        Find countries: <input value={newSearch} onChange={handleSearch} />
        <CountryList countries={countries} searchTerm={newSearch} />
      </form>
    </div>
  );
};

export default App;
