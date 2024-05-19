import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file !");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bank-accounts/upload-csv-file/",
        formData,
        {
          headers: {
            "Content-Type": "multiple/form-data",
          },
        }
      );
      setMessage(response.data.success || response.data.error);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setMessage("Error uploading CSV file.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-10">Upload CSV File</h2>
      <form className="flex items-center space-x-6" onSubmit={handleUpload}>
        <label className="block">
          <span className="sr-only">Choose CSV File</span>
          <input
            onChange={handleFileChange}
            type="file"
            className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                "
          />
        </label>
        <button
          type="submit"
          className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default UploadCSV;
