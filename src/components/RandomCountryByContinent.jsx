import { useState, useEffect } from "react";
import axios from "axios";
import CountryImages from "./CountryImages";

const RandomCountryByContinent = () => {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const continents = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Random"
  ];

  const getRandomContinent = () => {
    const randomIndex = Math.floor(Math.random() * 5);
    setContinent(continents[randomIndex]);
  };

  const getCountriesByContinent = async (continent) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${continent}`
      );
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoading(false);
    }
  };

  const getRandomCountry = () => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    setCountry(randomCountry.name.common);
  };

  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;
    setContinent(selectedContinent);

    if (selectedContinent === "Random") {
      getRandomContinent();
    } else {
      getCountriesByContinent(selectedContinent);
    }
  };

  useEffect(() => {
    if (continent && continent !== "Random") {
      getCountriesByContinent(continent);
    }
  }, [continent]);

  useEffect(() => {
    getRandomContinent();
  }, []);

  return (
    <div className="text-center items-center">
      <h1 className="m-8 text-white bg-black text-center px-4 py-2 inline-block">
        Discover a random country
      </h1>
      <div className="m-8 border-spacing-2 border-blue-800">
        <label>
          <select
            onChange={handleContinentChange}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            <option value="">List of continents</option>
            {continents.map((continentOption, index) => (
              <option key={index} value={continentOption}>
                {continentOption === "Random"
                  ? "Random Continent"
                  : continentOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      {continent && !loading && continent !== "Random" && (
        <div className="m-8">
          <h2 className="text-white bg-black px-4 py-2 items-center justify-center inline-block col-span-1">
            Selected continent : {continent}
          </h2>
          <button onClick={getRandomCountry}>Go for a random country</button>
        </div>
      )}

      {loading && <div>Loading country...</div>}

      {country && !loading && (
        <div className="m-8">
          <h2 className="text-white bg-black">Choosen country : {country}</h2>
          <CountryImages country={country} />
        </div>
      )}
    </div>
  );
};

export default RandomCountryByContinent;
