import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, searchTerm, setSearch }) => {
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
    //Over 10 countries view
    if (countriesList.length > 9) {
      return <div> Too many matches, be more specific</div>;
    }
    //Single Country view
    if (countriesList.length === 1) {
      return <SingleCountryView country={countriesList[0]} />;
    }
    //Up to 10 countries view
    return (
      <div>
        {countriesList.map((country) => (
          <div key={country.id}>
            {country.name}
            <button onClick={() => setSearch(country.name)}>show</button>
          </div>
        ))}
      </div>
    );
  }
  return <div>No search entered</div>;
};

const SingleCountryView = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img style={{ height: 100 }} alt={country.name} src={country.flag} />
      <Weather country={country} />
    </div>
  );
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const countryCapital = country.capital;
  const API_KEY = process.env.REACT_APP_WEATHER_API;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${countryCapital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [countryCapital, API_KEY]);
  if (weather) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          <strong>temperature:</strong>
          {weather.current.temperature} Celsius
        </p>
        <img
          src={weather.current.weather_icons[0]}
          alt={weather.current.weather_description}
        />
        <p>
          <strong>Wind:</strong> {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  }
  return <div>Loading...</div>;
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
        <CountryList
          countries={countries}
          searchTerm={newSearch}
          setSearch={setNewSearch}
        />
      </form>
    </div>
  );
};

export default App;
