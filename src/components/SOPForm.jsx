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
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");
      
      const response = await axios.post("/generate_sop", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setGeneratedSOP(response.data.sop_content);
    } catch (error) {
      alert("Failed to generate SOP. Please check your data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">SOP Generator</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Generated SOP:</h3>
          <pre>{generatedSOP}</pre>
          {downloadLink && (
            <a href={downloadLink} className="text-blue-500 underline mt-2 block" download>
              Download SOP as PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default SOPForm;
