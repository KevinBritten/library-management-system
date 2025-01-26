import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import {
  PageTitle,
  ConfirmButton,
  SubmitButtonWithLoading,
} from "../components/commonComponents.jsx";
import { Table, TableHead, TableCell } from "../components/tableComponents.jsx";

function Catalog() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchMode, setSearchMode] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCatalogItems = async () => {
    try {
      const response = await axiosInstance.get("/material/getAll");
      console.log(response);
      setCatalogs(response.data.materials);
    } catch (err) {
      console.error("Error fetching catalogs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogItems();
  }, []);

  const handleSearch = async () => {
    try {
      await axiosInstance
        .get("/material/search", {
          params: {
            term: searchTerm,
            mode: searchMode,
          },
        })
        .then((res) => {
          setCatalogs(res.data.materials);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchReset = async () => {
    try {
      await fetchCatalogItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async (catalog) => {
    navigate("/catalog/checkout", { state: { catalog } });
  };

  const handleReturn = async (id) => {
    try {
      await axiosInstance.patch(`/material/return/${id}`);
      await fetchCatalogItems();
    } catch (e) {
      console.error(e);
      alert("Unable to return item");
    }
  };

  const handleEdit = (catalog) => {
    navigate("/catalog/edit", { state: { catalog } });
  };

  const handleAdd = () => {
    navigate("/catalog/edit");
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`material/delete/${id}`, { data: { user } });
      await fetchCatalogItems();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="p-4">
        <PageTitle>Catalog Page</PageTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="py-4"
        >
          <input
            type="text"
            placeholder="Search catalog"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 mr-2"
          />
          <SubmitButtonWithLoading className="m-2">
            Search
          </SubmitButtonWithLoading>
          <ConfirmButton
            onClick={(e) => {
              e.preventDefault();
              handleSearchReset();
            }}
          >
            Reset
          </ConfirmButton>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="name"
                name="searchMode"
                value="name"
                checked={searchMode == "name"}
                onChange={(e) => setSearchMode(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="name" className="text-gray-700">
                Name
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="isbn"
                name="searchMode"
                value="isbn"
                checked={searchMode == "isbn"}
                onChange={(e) => setSearchMode(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="isbn" className="text-gray-700">
                ISBN
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="category"
                name="searchMode"
                value="category"
                checked={searchMode == "category"}
                onChange={(e) => setSearchMode(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="category" className="text-gray-700">
                Category
              </label>
            </div>
          </div>
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : catalogs.length === 0 ? (
          <h1>No catalogs found.</h1>
        ) : (
          <Table>
            <TableHead
              headers={
                user.role == "owner"
                  ? [
                      "Name",
                      "ISBN",
                      "Category",
                      "Availability",
                      "Checkout/Return",
                      "Edit",
                      "Delete",
                    ]
                  : [
                      "Name",
                      "ISBN",
                      "Category",
                      "Availability",
                      "Checkout/Return",
                      "Edit",
                    ]
              }
            />{" "}
            <tbody>
              {catalogs.map((catalog) => (
                <tr key={catalog.id}>
                  <TableCell>{catalog.name}</TableCell>
                  <TableCell>{catalog.isbn}</TableCell>
                  <TableCell>{catalog.category}</TableCell>
                  <TableCell>
                    {catalog.borrowingCustomerName
                      ? `Borrowed by: ${catalog.borrowingCustomerName} (user id: ${catalog.borrowingCustomerId})`
                      : "Available"}
                  </TableCell>
                  <TableCell>
                    {catalog.borrowingCustomerId ? (
                      <a
                        onClick={() => {
                          handleReturn(catalog.id);
                        }}
                        className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      >
                        Return
                      </a>
                    ) : (
                      <a
                        onClick={() => {
                          handleCheckout(catalog);
                        }}
                        className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      >
                        Checkout
                      </a>
                    )}
                  </TableCell>

                  <TableCell>
                    <a
                      className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      onClick={() => {
                        handleEdit(catalog);
                      }}
                    >
                      Edit
                    </a>
                  </TableCell>
                  {user.role === "owner" && (
                    <TableCell>
                      <a
                        className="text-red-500 hover:text-red-700 underline text-lg font-medium cursor-pointer"
                        onClick={() => {
                          handleDelete(catalog.id);
                        }}
                      >
                        Delete
                      </a>
                    </TableCell>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className={"py-4"}>
          <ConfirmButton onClick={handleAdd}>Add Catalog</ConfirmButton>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
