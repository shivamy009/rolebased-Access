import React, { useState, useEffect } from "react";
import { FaTasks, FaTrash, FaUserEdit, FaPlus } from "react-icons/fa";
import TaskForm from "./AssignTask";
import axios from "axios"; // For API calls
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";


const UserTable = ({accessToken}) => {
  // console.log(accessToken,"iop")
  const [users, setUsers] = useState([]); // Store real-time user data
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ fullname: "", email: "", password: "" });
  const userData = useSelector((state) => state.user);
  // Fetch users data from API
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("/api/users"); // Replace with actual API endpoint
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const baseurl = import.meta.env.VITE_SERVER_DOMAIN;
  const access_token = userData?.access_token;
  // useEffect(() => {
  //   if (!userData?.access_token) {
  //     navigate("/"); // Redirect to the homepage if no access_token
  //   }
  // }, [userData, navigate]);
  const handleAddUser = async () => {
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/auth/createuser",{...newUser},
      {
        headers:{
          'authorization': `${access_token}`
        }
      }
      
    ).then((data)=>{
      // console.log(data.data.message)
      toast.success(data.data.message)
      setShowAddUserModal(false);
      return;
    })
    .catch(({response})=>{
       console.log(response)
       return;
      
    })

  };

  const handleAssignTask = (user) => {
    setSelectedUser(user);
    setShowAssignTaskModal(true);
  };

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`/api/users/${userId}`); // Replace with actual API endpoint
  //     fetchUsers(); // Refresh user list
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };
  // console.log(localStorage.getItem('access_token'))

  return (
    <div className="p-4">
      <Toaster/>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <button
        onClick={() => setShowAddUserModal(true)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
      >
        <FaPlus className="mr-2" />
        Add User
      </button>

      {/* Table */}
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
            {users.length >0 && users?.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.fullname}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleAssignTask(user)}
                      className="flex items-center text-green-600 hover:text-green-700 transition"
                    >
                      <FaTasks className="mr-2" />
                      Assign Task
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                value={newUser.fullname}
                onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded-lg"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded-lg"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add User
              </button>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Task Modal */}
      {showAssignTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Assign Task to {selectedUser?.fullname}</h2>
            <TaskForm user={selectedUser} onClose={() => setShowAssignTaskModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
