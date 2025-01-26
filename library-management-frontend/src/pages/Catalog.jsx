import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useUser } from "../contexts/UserContext";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import { PageTitle, ConfirmButton } from "../components/commonComponents.jsx";
import { Table, TableHead, TableCell } from "../components/tableComponents.jsx";

function Catalog() {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogItems = async () => {
      try {
        const response = await axiosInstance.get("/material/getAll");
        console.log(response);
        setMaterials(response.data.materials);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogItems();
  }, []);

  const handleEdit = (material) => {
    navigate("/materials/edit", { state: { material } });
  };

  const handleAdd = () => {
    navigate("/materials/edit");
  };
  return (
    <div>
      <div className="p-4">
        <PageTitle>Catalog Page</PageTitle>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : materials.length === 0 ? (
          <h1>No materials found.</h1>
        ) : (
          <Table>
            <TableHead headers={["Name", "ISBN", "Category", "Edit"]} />{" "}
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.isbn}</TableCell>
                  <TableCell>{material.category}</TableCell>

                  <TableCell>
                    <a
                      className="text-blue-500 hover:text-blue-700 underline text-lg font-medium cursor-pointer"
                      onClick={() => {
                        handleEdit(material);
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
          <ConfirmButton onClick={handleAdd}>Add Material</ConfirmButton>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
