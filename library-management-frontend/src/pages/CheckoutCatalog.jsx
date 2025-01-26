import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance.js";

import {
  PageTitle,
  SubmitButtonWithLoading,
  CancelButton,
} from "../components/commonComponents.jsx";

function CheckoutCatalog() {
  const location = useLocation();
  const navigate = useNavigate();

  const { catalog } = location.state || {};
  const [customer, setCustomer] = useState();
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customer/getAll");
        setCustomers(response.data.customers);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.message);
        setCustomers(["Unable to load customers"]);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleChangeCustomer = (customerId) => {
    const selectedCustomer = customers.find((cust) => cust.id == customerId);
    setCustomer(selectedCustomer);
  };

  const handleCheckout = async () => {
    try {
      await axiosInstance.patch(`/material/borrow/${catalog.id}`, {
        customer,
      });
      navigate("/catalog");
    } catch (e) {
      console.error(e);
      alert("Unable to checkout item");
    }
  };

  const handleCancel = () => {
    navigate("/catalog");
  };
  return (
    <div className="p-4">
      <PageTitle>{"Checkout Catalog"}</PageTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            value={catalog.name}
            className="border border-gray-300 px-4 py-2 rounded w-full cursor-not-allowed bg-gray-200"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-lg font-medium mb-2">
            ISBN:
          </label>
          <input
            type="text"
            value={catalog.isbn}
            className="border border-gray-300 px-4 py-2 rounded w-full cursor-not-allowed bg-gray-200"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-lg font-medium mb-2  ">
            Category:
          </label>
          <input
            type="text"
            value={catalog.category}
            className="border border-gray-300 px-4 py-2 rounded w-full cursor-not-allowed bg-gray-200"
            readOnly
          />
        </div>

        <select
          value={customer?.id || ""}
          onChange={(e) => {
            handleChangeCustomer(e.target.value);
          }}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        >
          <option value="" disabled>
            Select a customer
          </option>

          {customers.map((customer, index) => (
            <option key={index} value={customer.id}>
              {customer.name} (id:{customer.id})
            </option>
          ))}
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex space-x-4">
          <SubmitButtonWithLoading>
            {loading ? "Saving..." : "Checkout Catalog"}
          </SubmitButtonWithLoading>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </div>
      </form>
    </div>
  );
}
export default CheckoutCatalog;
