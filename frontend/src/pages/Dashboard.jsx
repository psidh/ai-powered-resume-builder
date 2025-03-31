import React from "react";
import { Link } from "react-router-dom"; // adjust if using a different router
import { FilePlus, FileText } from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-4xl font-normal  mb-8">
        Welcome to the Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          to="/dashboard/create"
          className="bg-yellow-500 hover:bg-yellow-400 transition duration-200 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FilePlus size={48} className="text-white mb-4" />
          <h2 className="text-2xl font-seminormal text-white">
            Create Resume
          </h2>
        </Link>
        <Link
          to="/dashboard/resumes"
          className="bg-yellow-500 hover:bg-yellow-400 transition duration-200 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FileText size={48} className="text-white mb-4" />
          <h2 className="text-2xl font-seminormal text-white">
            View Resumes
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
