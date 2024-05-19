import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BankAccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/bank-accounts/"
        );
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching accounts");
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-10 text-center">Bank Accounts</h2>
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <ul>
          {accounts.map((account) => (
            <li
              key={account.id}
              className="mb-4 p-4 border rounded shadow hover:shadow-xl"
            >
              <p className="mb-5">
                <strong>ID:</strong> {account.id}
              </p>
              <p>
                <strong>Name:</strong> {account.name}
              </p>
              <div className="mt-10">
                <Link
                  to={`/${account.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white hover:shadow-md px-3 py-2 rounded-md text-sm font-medium"
                >
                  Show Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BankAccountList;
