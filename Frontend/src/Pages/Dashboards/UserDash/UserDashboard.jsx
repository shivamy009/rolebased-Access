import React, { useState } from "react";
import { FaCheck, FaTrash, FaExclamationCircle, FaRedo, FaClipboardCheck } from "react-icons/fa";
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the ArcElement
Chart.register(ArcElement);

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: <FaRedo /> },
    { id: "completed", name: "Completed", icon: <FaCheck /> },
    { id: "pending", name: "Pending", icon: <FaExclamationCircle /> },
    { id: "overdue", name: "Overdue", icon: <FaExclamationCircle /> },
    { id: "submitReview", name: "Submit for Review", icon: <FaClipboardCheck /> },
  ];

  // Dummy task data for different categories
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Plan Weekend Trip",
      description: "Plan a weekend trip itinerary, including places to visit.",
      created: "4 days ago",
      priority: "low",
      status: "pending",
    },
    {
      id: 2,
      title: "Team Meeting",
      description: "Discuss project updates in the team meeting.",
      created: "Yesterday",
      priority: "high",
      status: "completed",
    },
    {
      id: 3,
      title: "Update Resume",
      description: "Revise and update your resume with recent work experience.",
      created: "Today",
      priority: "medium",
      status: "pending",
    },
  ]);

  const data = {
    labels: ["Completed", "Pending", "Overdue", "Submit for Review"],
    datasets: [
      {
        data: [
          tasks.filter((task) => task.status === "completed").length,
          tasks.filter((task) => task.status === "pending").length,
          tasks.filter((task) => task.status === "overdue").length,
          tasks.filter((task) => task.status === "submitReview").length,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336", "#2196F3"],
        hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#E57373", "#64B5F6"],
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
  };

  // Function to change task status to 'Submit for Review'
  const handleSubmitForReview = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: "submitReview" }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-auto bg-gray-100 p-4 md:block flex-none md:flex-col">
        <div className="flex md:flex-col space-x-4 md:space-x-0 flex-wrap justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full sm:rounded-none text-sm font-semibold transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                    : "bg-gray-20 text-gray-00"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks
            .filter((task) =>
              selectedCategory === "all" ? true : task.status === selectedCategory
            )
            .map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">Created at: {task.created}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      task.priority === "low"
                        ? "bg-green-100 text-green-600"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <div className="flex space-x-2">
                    <FaCheck className="text-green-500 cursor-pointer" />
                    <FaTrash className="text-red-500 cursor-pointer" />
                    {task.status === "pending" && (
                      <button
                        onClick={() => handleSubmitForReview(task.id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                      >
                        Submit for Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-600">
          Add New Task
        </button>
      </main>

      {/* Task Analysis */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 mt-4 md:mt-0">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-center">Task Analysis</h3>
          <Doughnut data={data} options={chartOptions} />
        </div>
        <div className="mt-4 space-y-2">
          <p>Total Tasks: <span className="font-bold">{tasks.length}</span></p>
          <p>Open Tasks: <span className="font-bold">{tasks.filter(task => task.status === "pending").length}</span></p>
          <p>Completed: <span className="font-bold">{tasks.filter(task => task.status === "completed").length}</span></p>
          <p>Overdue: <span className="font-bold">{tasks.filter(task => task.status === "overdue").length}</span></p>
          <p>Submit for Review: <span className="font-bold">{tasks.filter(task => task.status === "submitReview").length}</span></p>
        </div>
      </aside>
    </div>
  );
};

export default UserDashboard;
