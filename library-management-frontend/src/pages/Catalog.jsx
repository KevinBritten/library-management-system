import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import { PageTitle, ConfirmButton } from "../components/commonComponents.jsx";
import { Table, TableHead, TableCell } from "../components/tableComponents.jsx";

function Catalog() {
  const navigate = useNavigate();

  const [catalogs, setCatalogs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchCatalogItems();
  }, []);

  const handleEdit = (catalog) => {
    navigate("/catalog/edit", { state: { catalog } });
  };

  const handleAdd = () => {
    navigate("/catalog/edit");
  };
  return (
    <div>
      <div className="p-4">
        <PageTitle>Catalog Page</PageTitle>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : catalogs.length === 0 ? (
          <h1>No catalogs found.</h1>
        ) : (
          <Table>
            <TableHead headers={["Name", "ISBN", "Category", "Edit"]} />{" "}
            <tbody>
              {catalogs.map((catalog) => (
                <tr key={catalog.id}>
                  <TableCell>{catalog.name}</TableCell>
                  <TableCell>{catalog.isbn}</TableCell>
                  <TableCell>{catalog.category}</TableCell>

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
