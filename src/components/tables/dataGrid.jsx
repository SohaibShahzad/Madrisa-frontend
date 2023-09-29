function DataGrid({
  data,
  headers,
  renderRow,
  onEdit,
  onDelete,
  onView,
  showViewButton,
  showEditButton,
}) {
  return (
    <div className="mt-5">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-2 py-1">
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {renderRow(item).map((cell, index) => (
                <td key={index} className="border border-gray-300 px-2 py-1">
                  {cell}
                </td>
              ))}
              <td className="border border-gray-300 px-2 py-1">
                <div className="flex justify-evenly gap-3">

                {showEditButton && (
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded transition duration-300"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(item)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded transition duration-300"
                >
                  Delete
                </button>
                {showViewButton && (
                  <button
                    onClick={() => onView(item)}
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-300"
                  >
                    View
                  </button>
                )}{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
