import RandomCountryByContinent from "../components/RandomCountryByContinent";

const Home = () => {
  return (
    <div className="justify-center justify-items-center">
      <h1 className="bg-gradient-to-tr pacifico-regular border-2 border-black from-yellow-400 via-pink-500 to-blue-600 px-8 py-6 m-8 text-center text-black text-6xl font-bold inline-block items-center rounded-full shadow-lg relative">
        <span className=" absolute inset-0 bg-black opacity-0 rounded-full"></span>
        Welcome to Terra Voyager
      </h1>
      <RandomCountryByContinent />
    </div>
  );
};

export default Home;
