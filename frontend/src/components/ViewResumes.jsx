import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Resumes() {
  const hardcodedResume = {
    id: "1234",
    name: "Philkhana Sidharth",
    title: "Software Engineer",
    email: "sidharth@gmail.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    linkedin: "linkedin.com/in/p-sidharth",
    github: "github.com/psidh",
    summary:
      "Experienced Software Engineer with a passion for building scalable web applications and distributed systems.",
    experience: [
      {
        company: "XYZ Corp",
        role: "Senior Software Engineer",
        duration: "Jan 2020 - Present",
        description:
          "Developed and maintained backend services using Rust, Axum, and PostgreSQL. Led a team of 5 engineers to optimize microservices architecture, reducing response time by 30%.",
      },
      {
        company: "ABC Tech",
        role: "Software Engineer",
        duration: "June 2017 - Dec 2019",
        description:
          "Worked on full-stack development using React, Node.js, and MongoDB. Implemented caching strategies, improving API response time by 40%.",
      },
    ],
    skills: ["Rust", "Axum", "SQLx", "PostgreSQL", "Microservices", "Docker"],
    education: {
      degree: "B.Sc. in Computer Science",
      university: "MIT",
      year: "2013 - 2017",
    },
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById("resume-container");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${hardcodedResume.name}_Resume.pdf`);
    });
  };

  return (
    <div className="py-32 p-6 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100 flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Professional Resume
      </h2>

      <div
        id="resume-container"
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-medium">{hardcodedResume.name}</h1>
          <p className="text-neutral-500 font-light">{hardcodedResume.title}</p>
          <p className="text-neutral-500 font-light">
            {hardcodedResume.email} | {hardcodedResume.phone}
          </p>
          <p className="text-neutral-500 font-light">
            {hardcodedResume.location} |
            <a
              href={`https://${hardcodedResume.linkedin}`}
              className="text-blue-500 ml-1"
            >
              {hardcodedResume.linkedin}
            </a>{" "}
            |
            <a
              href={`https://${hardcodedResume.github}`}
              className="text-blue-500 ml-1"
            >
              {hardcodedResume.github}
            </a>
          </p>
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Summary</h3>
          <p className="text-neutral-500 font-light">{hardcodedResume.summary}</p>
        </div>

        {/* Experience */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Experience</h3>
          {hardcodedResume.experience.map((job, index) => (
            <div key={index} className="mt-3">
              <h4 className="text-lg font-medium">
                {job.role} - {job.company}
              </h4>
              <p className="text-neutral-500 font-light">{job.duration}</p>
              <p className="text-neutral-500 font-light">{job.description}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Skills</h3>
          <p className="text-neutral-500 font-light">{hardcodedResume.skills.join(", ")}</p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Education</h3>
          <p className="text-lg">{hardcodedResume.education.degree}</p>
          <p className="text-neutral-500 font-light">
            {hardcodedResume.education.university} (
            {hardcodedResume.education.year})
          </p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Download Resume as PDF
        </button>
      </div>
    </div>
  );
}
