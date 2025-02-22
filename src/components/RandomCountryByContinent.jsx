import { useState, useEffect } from "react";
import axios from "axios";
import CountryImages from "./CountryImages"; // Assure-toi d'importer ce nouveau composant

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
    const randomIndex = Math.floor(Math.random() * 5); // Choisit un continent aléatoire (pas "Random")
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
    <div>
      <h1>Découvrir un pays aléatoire</h1>
      <div>
        <label htmlFor="continent">Choisir un continent : </label>
        <select
          id="continent"
          value={continent}
          onChange={handleContinentChange}
        >
          <option value="">-- Sélectionner un continent --</option>
          {continents.map((continentOption, index) => (
            <option key={index} value={continentOption}>
              {continentOption === "Random"
                ? "Continent Aléatoire"
                : continentOption}
            </option>
          ))}
        </select>
      </div>

      {continent && !loading && continent !== "Random" && (
        <div>
          <p>
            <strong>Continent choisi :</strong> {continent}
          </p>
          <button onClick={getRandomCountry}>Choisir un pays aléatoire</button>
        </div>
      )}

      {loading && <p>Chargement des pays...</p>}

      {country && !loading && (
        <div>
          <h2>Pays choisi :</h2>
          <p>{country}</p>
          <CountryImages country={country} />
        </div>
      )}
    </div>
  );
};

export default RandomCountryByContinent;
