import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance.js";

function EditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { customer } = location.state || {};
  const [name, setName] = useState(customer ? customer.name : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateCustomer = async () => {
    axiosInstance.put(`/customer/update/${customer.id}`, { name });
  };

  const createCustomer = async () => {
    axiosInstance.post(`/customer/create`, { name });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      if (customer?.id) {
        await updateCustomer();
      } else {
        await createCustomer();
      }
      navigate("/customers");
    } catch (e) {
      setError("An error occurred while saving the customer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {customer ? "Edit Customer" : "Create Customer"}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter customer's name"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save Customer"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditCustomer;
