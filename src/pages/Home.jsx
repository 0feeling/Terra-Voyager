import RandomCountryByContinent from "../components/RandomCountryByContinent";

// Exemple d'utilisation dans Home.jsx
const Home = () => {
  return (
    <div className="">
      <h1 className=" bg-black m-7 text-center text-white">
        Welcome to Terra Voyager
      </h1>
      <RandomCountryByContinent />
    </div>
  );
};

export default Home;
