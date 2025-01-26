import { Link } from "react-router-dom";

import { PageTitle } from "../components/commonComponents";
function Home() {
  return (
    <div className="container p-6">
      <PageTitle>Welcome to the Library Management System</PageTitle>
      <div className="flex flex-col items-center space-y-2">
        <Link
          to="/login"
          className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
