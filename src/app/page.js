"use client";
import { useState } from "react";

export default function Home() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/compareAddresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address1, address2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to compare addresses");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error comparing addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Address Comparator</h1>

        <input
          type="text"
          placeholder="Enter Address 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-3 text-black"
        />
        <input
          type="text"
          placeholder="Enter Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-3 text-black"
        />
        <button
          onClick={handleCompare}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Comparing..." : "Compare Addresses"}
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {result && (
          <div className="mt-4 p-4 border border-gray-400 rounded">
            <h2 className="text-lg font-semibold text-black">Result:</h2>
            <p className="text-black"><strong>Match:</strong> {result.match ? "Yes ✅" : "No ❌"}</p>
            <p className="text-black"><strong>Confidence:</strong> {result.confidence}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
