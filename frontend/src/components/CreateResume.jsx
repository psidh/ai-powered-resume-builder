import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function CreateResume() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "", // UUID should be generated or retrieved
    name: "",
    experience: "",
    skills: [], // Array instead of a string
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
    navigate("/dashboard");
    // const token = Cookies.get("auth_token");
    // if (!token) {
    //   setError("User not authenticated");
    //   setLoading(false);
    //   return;
    // }

    // const requestData = {
    //   user_id: formData.user_id, // Ensure this is a valid UUID
    //   name: formData.name,
    //   experience: formData.experience,
    //   skills: formData.skills, // Already an array
    // };

    // try {
    //   const response = await fetch(
    //     "https://ai-powered-resume-builder-x144.onrender.com/generate_resume",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(requestData),
    //     }
    //   );

    //   const data = await response.json();

    //   if (response.ok) {
    //     setSuccessMessage("Resume successfully generated!");
    //   } else {
    //     setError(data.message || "Failed to generate resume");
    //   }
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    // }

    // setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-yellow-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-700 text-center mb-4">Create Resume</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="user_id"
            placeholder="User ID (UUID)"
            value={formData.user_id}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills.join(", ")}
            onChange={handleSkillsChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 px-8 rounded-full hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Generate Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}
