import React, { useState } from "react";
import axios from "axios";

function SOPForm() {
    const [formData, setFormData] = useState({
      fullName: "",
      purposeStatement: "",
      academicInfo: [{ degree: "", university: "", year: "", gpa: "" }],
      experience: [{ role: "", company: "", duration: "", description: "" }],
    });
    const [generatedSOP, setGeneratedSOP] = useState("");
    const [format, setFormat] = useState("pdf");  // Default format
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, field, arrayName) => {
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? { ...item, [field]: e.target.value } : item
    );
    setFormData({ ...formData, [arrayName]: updatedArray });
    };

    const handleAddItem = (arrayName) => {
    const newItem =
      arrayName === "academicInfo"
        ? { degree: "", university: "", year: "", gpa: "" }
        : { role: "", company: "", duration: "", description: "" };
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], newItem] });
    };

    const validateFormData = () => {
        if (!formData.fullName || !formData.purposeStatement) {
        setError("Full Name and Purpose Statement are required.");
        return false;
    }
    for (const info of formData.academicInfo) {
      if (!info.degree || !info.university || !info.year || !info.gpa) {
        setError("All academic information fields are required.");
        return false;
      }
    }
    for (const exp of formData.experience) {
      if (!exp.role || !exp.company || !exp.duration || !exp.description) {
        setError("All experience fields are required.");
        return false;
      }
    }
    setError(""); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    setLoading(true);
    setGeneratedSOP("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.post("http://localhost:8000/generate_sop", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGeneratedSOP(response.data.sop_content);
    } catch (error) {
      console.error("Failed to generate SOP:", error);
      setError("Failed to generate SOP. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "/download_sop",
        { sop_content: generatedSOP, format: format },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `sop.${format}`);
      document.body.appendChild(link);  
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download SOP.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">SOP Generator</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Purpose Statement</label>
          <textarea
            name="purposeStatement"
            value={formData.purposeStatement}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <h3 className="text-lg font-semibold mt-4">Academic Info</h3>
        {formData.academicInfo.map((info, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
            <input
              type="text"
              placeholder="Degree"
              value={info.degree}
              onChange={(e) => handleArrayChange(e, index, "degree", "academicInfo")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="University"
              value={info.university}
              onChange={(e) => handleArrayChange(e, index, "university", "academicInfo")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Year"
              value={info.year}
              onChange={(e) => handleArrayChange(e, index, "year", "academicInfo")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="GPA"
              value={info.gpa}
              onChange={(e) => handleArrayChange(e, index, "gpa", "academicInfo")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("academicInfo")} className="bg-green-500 text-white px-4 py-2 rounded">
          Add More Academic Info
        </button>

        <h3 className="text-lg font-semibold mt-4">Work Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleArrayChange(e, index, "role", "experience")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleArrayChange(e, index, "company", "experience")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleArrayChange(e, index, "duration", "experience")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleArrayChange(e, index, "description", "experience")}
              className="w-full mb-2 p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("experience")} className="bg-green-500 text-white px-4 py-2 rounded">
          Add More Experience
        </button>

        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Generating..." : "Generate SOP"}
          </button>
        </div>
      </form>

      {generatedSOP && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Generated SOP:</h3>
          <textarea
            value={generatedSOP}
            onChange={(e) => setGeneratedSOP(e.target.value)}
            className="w-full border p-2 rounded"
            rows="10"
          />
          <div className="mt-4">
            <label>Select Format: </label>
            <select onChange={(e) => setFormat(e.target.value)} value={format}>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="txt">TXT</option>
            </select>
            <button onClick={handleDownload} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
              Download SOP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SOPForm;
