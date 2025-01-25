import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";

function Customers() {
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogItems = async () => {
      try {
        const response = await axiosInstance.get("/customer/getAll");
        console.log(response);
        setCustomers(response.data.customers);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogItems();
  }, []);
  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold">Customers Page</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : customers.length === 0 ? (
          <h1>No customers found.</h1>
        ) : (
          customers.map((c) => (
            <h1 key={c.id} className="text-lg">
              {c.name}
            </h1>
          ))
        )}
      </div>
    </div>
  );
}

export default Customers;
