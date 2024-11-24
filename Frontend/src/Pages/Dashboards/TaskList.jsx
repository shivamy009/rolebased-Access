import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash, FaRedo, FaExclamationCircle } from "react-icons/fa";

// Categories for task selection (All, Completed, Pending, Overdue)
const categories = [
  { id: "all", name: "All", icon: <FaRedo className="text-lg" /> },
  { id: "completed", name: "Completed", icon: <FaCheck className="text-lg" /> },
  { id: "pending", name: "Pending", icon: <FaExclamationCircle className="text-lg" /> },
  { id: "overdue", name: "Overdue", icon: <FaExclamationCircle className="text-lg text-red-500" /> },
];

const dummyTasks = {
  all: [
    {
      title: "Plan Weekend Trip",
      description: "Plan a weekend trip itinerary.",
      created: "4 days ago",
      priority: "low",
    },
    {
      title: "Team Meeting",
      description: "Discuss project updates in the team meeting.",
      created: "Yesterday",
      priority: "high",
    },
    {
      title: "Finish Presentation",
      description: "Prepare slides for the upcoming client meeting.",
      created: "Yesterday",
      priority: "medium",
    },
    {
      title: "Submit Assignment",
      description: "Complete and submit the assignment by tonight.",
      created: "Today",
      priority: "high",
    },
  ],
  completed: [
    {
      title: "Grocery Shopping",
      description: "Buy groceries for the week.",
      created: "3 days ago",
      priority: "low",
    },
    {
      title: "Pay Bills",
      description: "Pay utility and internet bills.",
      created: "5 days ago",
      priority: "medium",
    },
  ],
  pending: [
    {
      title: "Prepare Report",
      description: "Compile the sales report for the last quarter.",
      created: "2 days ago",
      priority: "medium",
    },
    {
      title: "Call Client",
      description: "Follow up with the client regarding project details.",
      created: "Yesterday",
      priority: "high",
    },
  ],
  overdue: [
    {
      title: "Submit Expense Report",
      description: "Submit the expense report for last month.",
      created: "1 week ago",
      priority: "high",
    },
    {
      title: "Renew Insurance",
      description: "Renew the car insurance policy.",
      created: "2 weeks ago",
      priority: "high",
    },
  ],
};

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch tasks based on category
    setTimeout(() => {
      setTasks(dummyTasks[selectedCategory]);
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

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
            {tasks.map((task, index) => (
              <div
                key={index}
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
                    <FaCheck className="text-green-500 cursor-pointer hover:scale-110 transition" />
                    <FaTrash className="text-red-500 cursor-pointer hover:scale-110 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
