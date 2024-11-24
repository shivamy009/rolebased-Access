import React, { useState } from "react";
import TaskList from "./TaskList";
import { FaTasks, FaUser } from "react-icons/fa";

// Sidebar categories
const categories = [
  { id: "tasks", name: "Tasks", icon: <FaTasks className="text-lg" /> },
  { id: "users", name: "Users", icon: <FaUser className="text-lg" /> },
];

const TaskManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("tasks");

  return (
    <div className="pt-16">
      <div className="h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/6 bg-gray-100 p-4 shadow-md md:block">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Admin Panel</h2>
          <nav>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer py-2 px-4 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50">
          {/* Conditionally render based on selected category */}
          {selectedCategory === "tasks" ? (
            <TaskList />
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-700">Users Section</h2>
              <p className="text-gray-500">This is where user management would go.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TaskManagement;
