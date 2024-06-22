import React from "react";
import { useNavigate } from "react-router-dom";

const ValidatePage = ({ csvData, setValidatedData }) => {
  const navigate = useNavigate();
  const requiredFields = [
    "Name",
    "Email",
    "Phone number",
    "City",
    "Address",
    "GPA",
  ];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateData = () => {
    const validatedData = csvData.map((row) => {
      const errors = {};
      requiredFields.forEach((field) => {
        if (!row.hasOwnProperty(field) || !row[field]) {
          errors[field] = "Empty value error";
        } else {
          switch (field) {
            case "Email":
              if (!emailRegex.test(row[field])) {
                errors[field] = "Data type mismatch error";
              }
              break;
            case "Phone number":
              const cleanedPhone = row[field].replace(/\D/g, ""); // Remove non-digit characters
              if (!phoneRegex.test(cleanedPhone)) {
                errors[field] = "Data type mismatch error";
              }
              break;
            case "GPA":
              if (isNaN(row[field]) || parseFloat(row[field]) > 10) {
                errors[field] = "Data type mismatch error";
              }
              break;
            default:
              break;
          }
        }
      });
      return { ...row, errors };
    });

    setValidatedData(validatedData);
    navigate("/review");
  };

  return (
    <div>
      <h2>Validate CSV Data</h2>
      <table>
        <thead>
          <tr>
            {requiredFields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {requiredFields.map((field) => (
                <td
                  key={field}
                  style={{
                    color: row.errors && row.errors[field] ? "red" : "black",
                  }}
                >
                  {row[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={validateData}>Validate</button>
    </div>
  );
};

export default ValidatePage;
