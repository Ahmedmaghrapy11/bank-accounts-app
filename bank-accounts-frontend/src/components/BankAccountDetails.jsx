import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BankAccountDetail = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/bank-accounts/details/${accountId}/`
        );
        setAccount(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching account details");
        setLoading(false);
      }
    };

    fetchAccount();
  }, [accountId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      {account && (
        <>
          <p>
            <strong>ID:</strong> {account.id}
          </p>
          <p>
            <strong>Name:</strong> {account.name}
          </p>
          <p>
            <strong>Balance:</strong> ${account.balance}
          </p>
        </>
      )}
    </div>
  );
};

export default BankAccountDetail;
