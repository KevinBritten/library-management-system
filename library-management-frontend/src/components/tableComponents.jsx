export const Table = ({ children }) => {
  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      {children}
    </table>
  );
};

export const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr className="bg-gray-200">
        {headers.map((header) => (
          <th
            className="border border-gray-300 px-4 py-2 text-left"
            key={header}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableCell = ({ children }) => {
  return <td className="border border-gray-300 px-4 py-2">{children}</td>;
};
