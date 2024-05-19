import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadCSV from "./components/UploadCSV";
import BankAccountList from "./components/BankAccountList";
import Transfer from "./components/Transfer";
import Navbar from "./components/Navbar";
import BankAccountDetails from "./components/BankAccountDetails";

function App() {
  return (
    <Router>
      <div className="App container mx-auto p-4">
        <Navbar />
        <h1 className="text-5xl m-10 font-bold text-center">
          Bank Accounts App
        </h1>
        <Routes>
          <Route path="/" element={<BankAccountList />} />
          <Route path="/upload-csv-file" element={<UploadCSV />} />
          <Route path="/transfer-funds" element={<Transfer />} />
          <Route path="/:accountId" element={<BankAccountDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
