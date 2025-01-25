import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";

function Customers() {
  const navigate = useNavigate();

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

  const handleEdit = (customer) => {
    navigate("/customers/edit", { state: { customer } });
  };

  const handleAdd = () => {
    navigate("/customers/edit");
  };
  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold text-center py-4">Customers Page</h1>
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
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date Added
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(customer.addedDate)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      onClick={() => {
                        handleEdit(customer);
                      }}
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={"py-4"}>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAdd}
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customers;
