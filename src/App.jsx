import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import RandomCountryByContinent from "./components/RandomCountryByContinent";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/random-country"
          element={<RandomCountryByContinent />}
        />{" "}
        {/* Ajout de la route */}
      </Routes>
    </div>
  );
}

export default App;
