import React, { useState } from "react";
import { FaClipboardList, FaRegCalendarAlt, FaCommentDots, FaFlag } from "react-icons/fa";

const TaskForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "low",
    lastDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Task assigned to ${user.fullname}:`, formData);
    alert(`Task successfully assigned to ${user.fullname}`);
    onClose(); // Close modal after submission
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Assign Task to {user.fullname}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-1 flex items-center">
            <FaClipboardList className="mr-2 text-blue-500" /> Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter task title"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-1 flex items-center">
            <FaCommentDots className="mr-2 text-blue-500" /> Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="3"
            required
            placeholder="Enter task details or instructions"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <span className="block text-gray-700 font-semibold mb-2 flex items-center">
            <FaFlag className="mr-2 text-blue-500" /> Priority
          </span>
          <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priority"
                value="low"
                checked={formData.priority === "low"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-green-600 font-medium">Low</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={formData.priority === "medium"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-orange-500 font-medium">Medium</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priority"
                value="high"
                checked={formData.priority === "high"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-red-500 font-medium">High</span>
            </label>
          </div>
        </div>

        {/* Last Date */}
        <div className="mb-4">
          <label htmlFor="lastDate" className="block text-gray-700 font-semibold mb-1 flex items-center">
            <FaRegCalendarAlt className="mr-2 text-blue-500" /> Last Date
          </label>
          <input
            type="date"
            id="lastDate"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition font-semibold mt-4"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
