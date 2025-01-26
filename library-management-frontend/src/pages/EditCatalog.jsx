import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance.js";

import {
  PageTitle,
  SubmitButtonWithLoading,
  CancelButton,
} from "../components/commonComponents.jsx";

function EditCatalog() {
  const location = useLocation();
  const navigate = useNavigate();

  const { catalog } = location.state || {};
  const [name, setName] = useState(catalog ? catalog.name : "");
  const [isbn, setIsbn] = useState(catalog ? catalog.isbn : "");
  const [category, setCategory] = useState(catalog ? catalog.category : "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateCatalog = async () => {
    axiosInstance.put(`/material/update/${catalog.id}`, {
      name,
      isbn,
      category,
    });
  };

  const createCatalog = async () => {
    axiosInstance.post(`/material/create`, { name, isbn, category });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      if (catalog?.id) {
        await updateCatalog();
      } else {
        await createCatalog();
      }
      navigate("/catalog");
    } catch (e) {
      setError("An error occurred while saving the catalog.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/catalog");
  };
  return (
    <div className="p-4">
      <PageTitle>{catalog ? "Edit Catalog" : "Create Catalog"}</PageTitle>

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
            placeholder="Enter catalog's name"
            required
          />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-lg font-medium mb-2">
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter catalog's ISBN"
            required
          />
        </div>
        <div>
          <p className="text-lg font-medium mb-2">Category:</p>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value="book"
                checked={!category || category === "book"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Book
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value="article"
                checked={category === "article"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Article
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value="paper"
                checked={category === "paper"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Paper
            </label>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex space-x-4">
          <SubmitButtonWithLoading>
            {loading ? "Saving..." : "Save Catalog"}
          </SubmitButtonWithLoading>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </div>
      </form>
    </div>
  );
}
export default EditCatalog;
