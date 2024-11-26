import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaClipboardList, FaRegCalendarAlt, FaCommentDots, FaFlag } from "react-icons/fa";
import { setAdmin } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const TaskForm = ({ user, onClose, token }) => {
  const baseurl = import.meta.env.VITE_SERVER_DOMAIN;
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseurl}/task/addTask`,
        {
          title: formData.title,
          taskmessage: formData.message,
          priority: formData.priority,
          endDate: formData.lastDate,
          userid: user._id,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      alldata()
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error assigning task");
    }
  };

  const alldata=async()=>{
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/task/getallTasks",
      {
        headers:{
          'authorization': `${access_token}`
        }
      }
      
    ).then((data)=>{
      dispatch(setAdmin(data));
      return;
    })
    .catch(({response})=>{
       console.log(response)
       return;
      
    })

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-trnasparent bg-opacity-80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Assign Task to {user.fullname}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Task Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                <FaClipboardList className="mr-2 text-purple-500" /> Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter task title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-shadow"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                <FaCommentDots className="mr-2 text-purple-500" /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                required
                placeholder="Enter task details"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-shadow resize-none"
              ></textarea>
            </div>
{/* Priority */}
<div>
  <span className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
    <FaFlag className="mr-2 text-purple-500" /> Priority
  </span>
  <div className="flex items-center justify-between space-x-4">
    {["low", "medium", "high"].map((priority) => {
      const isSelected = formData.priority === priority;
      const priorityStyles = {
        low: isSelected
          ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
          : "bg-gradient-to-r from-green-100 to-green-300 text-green-800 shadow-sm",
        medium: isSelected
          ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg"
          : "bg-gradient-to-r from-orange-100 to-orange-300 text-orange-800 shadow-sm",
        high: isSelected
          ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
          : "bg-gradient-to-r from-red-100 to-red-300 text-red-800 shadow-sm",
      };
      return (
        <button
          key={priority}
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, priority }))}
          className={`py-2 px-4 rounded-lg font-semibold ${priorityStyles[priority]} hover:opacity-90 transition transform hover:scale-105`}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </button>
      );
    })}
  </div>
</div>


            {/* Last Date */}
            <div>
              <label
                htmlFor="lastDate"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                <FaRegCalendarAlt className="mr-2 text-purple-500" /> Last Date
              </label>
              <input
                type="date"
                id="lastDate"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-shadow"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-transform transform hover:scale-105 font-semibold"
              >
                Assign Task
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
