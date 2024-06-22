import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

const UploadPage = ({ setCsvData }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data;
          const requiredFields = [
            "Name",
            "Email",
            "Phone number",
            "City",
            "Address",
            "GPA",
          ];

          const headers = results.meta.fields;
          const missingFields = requiredFields.filter(
            (field) => !headers.includes(field)
          );
          if (missingFields.length > 0) {
            setError(`Missing required fields: ${missingFields.join(", ")}`);
            return;
          }

          setCsvData(data);
          navigate("/validate");
        },
        error: function (err) {
          setError("Error reading file");
        },
      });
    } else {
      setError("Please upload a CSV file");
    }
  };

  return (
    <div className="center upload-page">
      <div className="file-upload-container">
        <h2>Upload CSV File</h2>
        <label className="file-upload">
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          Choose file
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
