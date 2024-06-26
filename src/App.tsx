import { FC } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import ProtectedRoute from "./security/ProtectedRoute";
import useAuth from "./security/useAuth";

const App: FC = () => {
  const { token, logout } = useAuth();

  return (
    <>
      <nav className="bg-black_theme p-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to={"/"} className="  text-white font-bold text-xl">
              My Logo
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to={"/"}
              className="text-white hover:text-grey-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to={"/test"}
              className="text-white hover:text-grey-300 transition duration-300"
            >
              About
            </Link>
            <Link
              to={"/payment"}
              className="text-white hover:text-grey-300 transition duration-300"
            >
              Payment
            </Link>
            {token ? (
              <button
                onClick={logout}
                className="text-white hover:text-grey-300 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-grey-300 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
                    <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
