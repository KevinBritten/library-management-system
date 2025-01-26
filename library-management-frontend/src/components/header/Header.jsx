import { useUser } from "../../contexts/UserContext";

import { HeaderLink } from "./headerComponents.jsx";

function Header() {
  const { user } = useUser();

  return (
    <header className="bg-gray-800 p-4">
      {user ? (
        <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
          <div className="text-lg font-medium">Welcome, {user.username}</div>

          <div className="flex space-x-8">
            <HeaderLink to="/catalog">Catalog</HeaderLink>
            <HeaderLink to="/customers">Customers</HeaderLink>
          </div>

          <div className="text-lg font-medium">User role: {user.role}</div>
        </nav>
      ) : (
        <nav className="flex justify-center space-x-8">
          <HeaderLink to="/login">Login </HeaderLink>
          <HeaderLink to="/signup">Signup </HeaderLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
