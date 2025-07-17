"use client";

import { useEffect, useState } from "react";

export default function Student() {
  const [data, setData] = useState({
    name: "",
    course_name: "",
    enrollment_date: "",
  });

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadStudents = () => {
    const staticStudents = [
      {
        id: 1,
        name: "Raj Kumar",
        course_name: "Python Full Stack",
        enrollment_date: "2024-01-15",
      },
      {
        id: 2,
        name: "Priya Sharma",
        course_name: "React Frontend",
        enrollment_date: "2024-01-20",
      },
      {
        id: 3,
        name: "Arjun Patel",
        course_name: "Java Backend",
        enrollment_date: "2024-01-25",
      },
    ];
    setStudents(staticStudents);
    setFilteredStudents(staticStudents);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.course_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [search, students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      ...data,
    };
    setStudents((prev) => [...prev, newStudent]);
    setFilteredStudents((prev) => [...prev, newStudent]);
    setData({ name: "", course_name: "", enrollment_date: "" });
    setShowModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Enrollments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Enrollment
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2"
        >
          {[5, 10, 15].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-md w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Course</th>
              <th className="border px-4 py-2 text-left">Enrolled On</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.course_name}</td>
                <td className="border px-4 py-2">
                  {formatDate(student.enrollment_date)}
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add Enrollment</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                placeholder="Course Name"
                value={data.course_name}
                onChange={(e) =>
                  setData({ ...data, course_name: e.target.value })
                }
                className="border px-4 py-2 rounded"
                required
              />
              <input
                type="date"
                value={data.enrollment_date}
                onChange={(e) =>
                  setData({ ...data, enrollment_date: e.target.value })
                }
                className="border px-4 py-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
