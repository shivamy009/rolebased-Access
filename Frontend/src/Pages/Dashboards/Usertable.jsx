import React, { useState } from "react";
import { FaTasks, FaTrash, FaUserEdit } from "react-icons/fa";
import TaskForm from "./AssignTask";

// Dummy data
const users = [
  { id: 1, fullname: "Shivam", email: "wetr@pti" },
  { id: 2, fullname: "Rahul", email: "rahul@example.com" },
  { id: 3, fullname: "Aditi", email: "aditi@example.com" },
  { id: 4, fullname: "Kavya", email: "kavya@example.com" },
];

const UserTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to open the modal and set the selected user
  const handleAssignTask = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle other actions (e.g., Delete, Update Role)
  const handleDeleteUser = (user) => {
    alert(`Delete User: ${user.fullname}`);
    console.log(`Deleted user: ${user}`);
  };

  const handleUpdateRole = (user) => {
    alert(`Update Role for: ${user.fullname}`);
    console.log(`Role update triggered for user: ${user}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      {/* Make table responsive with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Serial No</th>
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.fullname}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex justify-center space-x-4">
                    {/* Assign Task */}
                    <button
                      onClick={() => handleAssignTask(user)}
                      className="flex items-center text-green-600 hover:text-green-700 transition"
                    >
                      <FaTasks className="mr-2" />
                      Assign Task
                    </button>

                    {/* Update Role */}
                    <button
                      onClick={() => handleUpdateRole(user)}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition"
                    >
                      <FaUserEdit className="mr-2" />
                      Update Role
                    </button>

                    {/* Delete User */}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="flex items-center text-red-600 hover:text-red-700 transition"
                    >
                      <FaTrash className="mr-2" />
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Task Assignment */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg p-6 bg-white">
            <h2 className="text-xl font-bold mb-4">
              Assign Task to {selectedUser?.fullname}
            </h2>
            {/* Task Form */}
            <TaskForm user={selectedUser} onClose={closeModal} />
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
