import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-bl from-green-300 to-blue-600 p-4 shadow-md">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold flex items-center">
          {" "}
          Terra Voyager
        </div>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/random-country"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Random Country
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
