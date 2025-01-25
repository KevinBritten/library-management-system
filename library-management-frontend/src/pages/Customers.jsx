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
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button>Add Customer</button>
      </div>
    </div>
  );
}

export default Customers;
