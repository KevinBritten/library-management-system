import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import { PageTitle, ConfirmButton } from "../components/commonComponents.jsx";
import { Table, TableHead, TableCell } from "../components/tableComponents.jsx";

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
        <PageTitle>Customers Page</PageTitle>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : customers.length === 0 ? (
          <h1>No customers found.</h1>
        ) : (
          <Table>
            <TableHead headers={["Name", "Date Added", "Edit"]} />{" "}
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{formatDate(customer.addedDate)}</TableCell>
                  <TableCell>
                    <a
                      className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      onClick={() => {
                        handleEdit(customer);
                      }}
                    >
                      Edit
                    </a>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className={"py-4"}>
          <ConfirmButton onClick={handleAdd}>Add Customer</ConfirmButton>
        </div>
      </div>
    </div>
  );
}

export default Customers;
