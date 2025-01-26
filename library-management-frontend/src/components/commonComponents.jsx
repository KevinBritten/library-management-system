export const PageTitle = ({ children }) => {
  return <h1 className="text-xl font-bold text-center py-4">{children}</h1>;
};

export const ConfirmButton = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SubmitButtonWithLoading = ({ children, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-2 text-white rounded cursor-pointer mr-1 ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {children}{" "}
    </button>
  );
};

export const CancelButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
    >
      {children}
    </button>
  );
};
