import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaTrash,
  FaRedo,
  FaExclamationCircle,
  FaClipboardCheck,
} from "react-icons/fa";

// Categories for task selection (All, Completed, Pending, Overdue, For Review)
const categories = [
  { id: "all", name: "All", icon: <FaRedo className="text-lg" /> },
  { id: "completed", name: "Completed", icon: <FaCheck className="text-lg" /> },
  { id: "pending", name: "Pending", icon: <FaExclamationCircle className="text-lg" /> },
  { id: "overdue", name: "Overdue", icon: <FaExclamationCircle className="text-lg text-red-500" /> },
  { id: "review", name: "For Review", icon: <FaClipboardCheck className="text-lg text-blue-500" /> },
];

const dummyTasks = [
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
  {
    id: 4,
    title: "Submit Expense Report",
    description: "Submit the expense report for last month.",
    created: "1 week ago",
    priority: "high",
    status: "overdue",
  },
  {
    id: 5,
    title: "Review Project Plan",
    description: "Review the project plan and provide feedback.",
    created: "2 days ago",
    priority: "medium",
    status: "review",
  },
];

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility
  const [currentTask, setCurrentTask] = useState(null); // Track selected task for popup

  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch tasks based on category
    setTimeout(() => {
      // Filter tasks by selectedCategory (if it's "all", show all tasks)
      if (selectedCategory === "all") {
        setTasks(dummyTasks);
      } else {
        setTasks(dummyTasks.filter((task) => task.status === selectedCategory));
      }
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

  // Handle opening the popup for a specific task
  const handleOpenPopup = (task) => {
    setCurrentTask(task);
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentTask(null);
  };

  // Handle updating the task status
  const handleStatusUpdate = (newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id ? { ...task, status: newStatus } : task
      )
    );
    handleClosePopup();
  };

  return (
    <div className="pt-16">
      {/* Categories at the top */}
      <div className="bg-white p-4 shadow-md flex justify-around mb-4 space-x-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 text-gray-700 cursor-pointer py-2 px-4 rounded-full hover:bg-gray-200 ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* Task Section */}
      <div>
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white shadow-md p-4 rounded-lg flex flex-col"
              >
                <h3 className="font-bold text-gray-700">{task.title}</h3>
                <p className="text-sm text-blue-500">Created at: {task.created}</p>
                <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
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
                    {task.status === "review" && (
                      <button
                        onClick={() => handleOpenPopup(task)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>

      {/* Popup for Updating Status */}
      {showPopup && currentTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Task Status</h2>
            <p className="mb-4">
              Task: <strong>{currentTask.title}</strong>
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleStatusUpdate("completed")}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusUpdate("pending")}
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              >
                Mark as Pending
              </button>
              <button
                onClick={() => handleStatusUpdate("overdue")}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Mark as Overdue
              </button>
            </div>
            <button
              onClick={handleClosePopup}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
