import RandomCountryByContinent from "../components/RandomCountryByContinent";

// Exemple d'utilisation dans Home.jsx
const Home = () => {
  return (
    <div className="text-center justify-center">
      <h1 className=" bg-black px-4 py-2 m-8 text-center text-white inline-block items-center">
        Welcome to Terra Voyager
      </h1>
      <RandomCountryByContinent />
    </div>
  );
};

export default Home;
