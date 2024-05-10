import "./styles/global.scss";
import { FC } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

const App: FC = () => {
  return (
    <>
      <nav className="bg-gray-800 p-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to={"/"} className="text-white font-bold text-xl">
              My Logo
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to={"/"}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to={"/test"}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
