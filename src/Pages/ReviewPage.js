import React from "react";

const ReviewPage = ({ validatedData }) => {
  const validRows = validatedData.filter(
    (row) => !row.errors || Object.keys(row.errors).length === 0
  );
  const invalidRows = validatedData.filter(
    (row) => row.errors && Object.keys(row.errors).length > 0
  );
  return (
    <div>
      <h2>Data Import Review</h2>
      <p>Valid Rows: {validRows.length}</p>
      <p>Invalid Rows: {invalidRows.length}</p>

      {invalidRows.length > 0 && (
        <div>
          <h3>Invalid Rows Details</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(validatedData[0]).map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {validatedData.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((field, fieldIndex) => {
                      return (
                        <td
                          key={fieldIndex}
                          style={{ color: row.errors[field] ? "red" : "black" }}
                        >
                          {field !== "errors" ? (
                            row[field] !== undefined &&
                            Object.keys(row[field]).length !== 0 ? (
                              row[field]
                            ) : (
                              <span style={{ color: "red" }}>
                                Empty value error
                              </span>
                            )
                          ) : (
                            <>
                            {Object.keys(row[field]).length > 0 ? (
                              Object.keys(row[field]).map((key, index) => (
                                <React.Fragment  key={index}>
                                 <div> {key} - {row[field][key]}{"   "}</div>
                                </React.Fragment>
                              ))
                            ) : (
                              "No error"
                            )}
                          </>
                          
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
