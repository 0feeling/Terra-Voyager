import { useState, useEffect } from "react";
import axios from "axios";
import CountryImages from "./CountryImages";
import MapComponent from "./MapComponent";

const RandomCountryByContinent = () => {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState(null); // Ajouter l'état pour les coordonnées
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevCoordinates, setPrevCoordinates] = useState(null);

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
    getCoordinates(randomCountry.name.common); // Appeler la fonction pour obtenir les coordonnées
  };

  const getCoordinates = async (countryName) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(countryName)}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        const newCoordinates = { lat, lng };

        // Vérifie si les nouvelles coordonnées sont différentes des précédentes
        if (
          !prevCoordinates ||
          JSON.stringify(newCoordinates) !== JSON.stringify(prevCoordinates)
        ) {
          setCoordinates(newCoordinates); // Mise à jour des coordonnées
          setPrevCoordinates(newCoordinates); // Mise à jour des coordonnées précédentes
        }
      } else {
        console.error("No coordinates found for this country.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
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
      <h1 className="bg-gradient-to-tr pacifico-regular border-2 border-black from-yellow-400 via-pink-500 to-blue-600 px-8 py-6 m-8 text-center text-black text-6xl font-bold inline-block items-center rounded-full shadow-lg relative">
        Discover information about a random country
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
          <h2 className="text-white bg-black">Chosen country : {country}</h2>
          <CountryImages country={country} />

          {/* Afficher l'iframe Wikipedia */}
          <div className="my-8 text-white">
            <h3>Learn more about {country}</h3>
            <iframe
              src={`https://en.wikipedia.org/wiki/${encodeURIComponent(country)}`}
              width="100%"
              height="500"
              frameBorder="0"
              title={`Wikipedia about ${country}`}
            />
          </div>

          {/* Afficher la carte seulement si les coordonnées sont disponibles et non dans CountryImages */}
          {coordinates && (
            <MapComponent
              coordinates={coordinates}
              key={JSON.stringify(coordinates)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RandomCountryByContinent;
