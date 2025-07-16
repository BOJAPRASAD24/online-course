"use client";

import { useEffect, useState } from "react";

const staticUsers = [
  {
    id: 1,
    username: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
  },
  {
    id: 2,
    username: "Jane Smith",
    email: "jane@example.com",
    mobile: "9876543210",
  },
  {
    id: 3,
    username: "Alice Brown",
    email: "alice@example.com",
    mobile: "9988776655",
  },
  {
    id: 4,
    username: "Bob Martin",
    email: "bob@example.com",
    mobile: "8877665544",
  },
  {
    id: 5,
    username: "Charlie White",
    email: "charlie@example.com",
    mobile: "7766554433",
  },
  {
    id: 6,
    username: "Emily Davis",
    email: "emily@example.com",
    mobile: "6655443322",
  },
];

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setUsers(staticUsers);
    setFilteredUsers(staticUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      username: data.username,
      email: data.email,
      mobile: data.mobile,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setData({ username: "", email: "", mobile: "", password: "" });
    setShowModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      {/* Search and Items Per Page */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2"
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full bg-white shadow rounded-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.mobile}</td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Register User</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                placeholder="Name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Mobile"
                value={data.mobile}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
