import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./Pages/UploadPage";
import ValidatePage from "./Pages/ValidatePage";
import ReviewPage from "./Pages/ReviewPage";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage setCsvData={setCsvData} />} />
        <Route path="/validate" element={<ValidatePage csvData={csvData} setValidatedData={setValidatedData} />} />
        <Route path="/review" element={<ReviewPage validatedData={validatedData} />} />
      </Routes>
    </Router>
  );
};

export default App;
