import { Link } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

function Header() {
  const { user } = useUser();

  return (
    <header className="bg-gray-800 p-4">
      {user ? (
        <nav className="flex justify-center space-x-8">
          <Link
            to="/catalog"
            className="text-white text-lg font-medium hover:text-blue-400"
          >
            Catalog
          </Link>
          <Link
            to="/customers"
            className="text-white text-lg font-medium hover:text-blue-400"
          >
            Customers
          </Link>
        </nav>
      ) : (
        <nav className="flex justify-center space-x-8">
          <Link
            to="/login"
            className="text-white text-lg font-medium hover:text-blue-400"
          >
            Login{" "}
          </Link>
          <Link
            to="/signup"
            className="text-white text-lg font-medium hover:text-blue-400"
          >
            Signup{" "}
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
