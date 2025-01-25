import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Catalog from "./pages/Catalog.jsx";
import Customers from "./pages/Customers.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers" element={<Catalog />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
