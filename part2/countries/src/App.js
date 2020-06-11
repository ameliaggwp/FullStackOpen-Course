import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, searchTerm }) => {
  const countriesList = [];
  if (searchTerm) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
        const countryObject = {
          name: countries[i].name,
          id: countriesList.length,
          capital: countries[i].capital,
          population: countries[i].population,
          languages: countries[i].languages,
          flag: countries[i].flag,
        };
        countriesList.push(countryObject);
      }
    }
    if (countriesList.length > 9) {
      return <div> Too many matches, be more specific</div>;
    }
    if (countriesList.length === 1) {
      const single = countriesList[0];
      return (
        <div>
          <h1>{single.name}</h1>
          <div>Capital: {single.capital}</div>
          <div>Population: {single.population}</div>
          <h2>Languages</h2>

          <ul>
            {single.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img style={{ height: 100 }} src={single.flag} />
        </div>
      );
    }
    return (
      <div>
        {countriesList.map((country) => (
          <div key={country.id}>{country.name}</div>
        ))}
      </div>
    );
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
