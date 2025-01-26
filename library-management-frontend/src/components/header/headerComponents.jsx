import { Link } from "react-router-dom";

export const HeaderLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-white text-lg font-medium hover:text-blue-400"
    >
      {children}
    </Link>
  );
};
