import React, { useState } from "react";
import axios from "axios";

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    const formData = new FormData();
    formData.append("report", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload-report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setSummary(data.summary);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to upload and summarize report."
      );
    }
    setLoading(false);
  };

  return (
    <section className="dashboard page" style={{ padding: "2rem" }}>
      <h2>Upload Medical Report</h2>

      <div
        style={{
          margin: "20px 0",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          maxWidth: "500px",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#8884d8",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload & Summarize"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            <strong>Error:</strong> {error}
          </p>
        )}

        {summary && (
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Summary</h3>
            <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadReport;
