"use client";

import { useEffect, useState } from "react";

export default function Student() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    course_name: "",
    fees: "",
    duration: "",
    enrollment_date: "",
  });
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadCourses = () => {
    const staticCourses = [
      {
        id: 1,
        course_name: "Python Full Stack",
        fees: "12000",
        duration: "4 months",
      },
      {
        id: 2,
        course_name: "Java Backend",
        fees: "10000",
        duration: "3 months",
      },
      {
        id: 3,
        course_name: "React Frontend",
        fees: "8000",
        duration: "2 months",
      },
      {
        id: 4,
        course_name: "Django REST API",
        fees: "9500",
        duration: "2.5 months",
      },
      { id: 5, course_name: "AI & ML", fees: "15000", duration: "6 months" },
      {
        id: 6,
        course_name: "Web Design",
        fees: "7000",
        duration: "1.5 months",
      },
    ];
    setCourses(staticCourses);
  };

  const loadStudents = () => {
    const staticStudents = [
      {
        id: 1,
        name: "Raj Kumar",
        mobile: "9876543210",
        course_name: "Python Full Stack",
        fees: "12000",
        duration: "4 months",
        enrollment_date: "2024-01-15",
      },
      {
        id: 2,
        name: "Priya Sharma",
        mobile: "9876543211",
        course_name: "React Frontend",
        fees: "8000",
        duration: "2 months",
        enrollment_date: "2024-01-20",
      },
      {
        id: 3,
        name: "Arjun Patel",
        mobile: "9876543212",
        course_name: "Java Backend",
        fees: "10000",
        duration: "3 months",
        enrollment_date: "2024-01-25",
      },
      {
        id: 4,
        name: "Meera Reddy",
        mobile: "9876543213",
        course_name: "AI & ML",
        fees: "15000",
        duration: "6 months",
        enrollment_date: "2024-02-01",
      },
      {
        id: 5,
        name: "Vikram Singh",
        mobile: "9876543214",
        course_name: "Web Design",
        fees: "7000",
        duration: "1.5 months",
        enrollment_date: "2024-02-05",
      },
      {
        id: 6,
        name: "Vikram",
        mobile: "9863254125",
        course_name: "Web Development",
        fees: "70000",
        duration: "3 months",
        enrollment_date: "2024-02-09",
      },
    ];
    setStudents(staticStudents);
    setFilteredStudents(staticStudents);
  };

  useEffect(() => {
    loadCourses();
    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.course_name.toLowerCase().includes(search.toLowerCase()) ||
        s.mobile.includes(search)
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
    setData({
      name: "",
      mobile: "",
      course_name: "",
      fees: "",
      duration: "",
      enrollment_date: "",
    });
    setShowModal(false);
  };

  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;
    const selectedCourse = courses.find(
      (c) => c.course_name === selectedCourseName
    );

    if (selectedCourse) {
      setData({
        ...data,
        course_name: selectedCourseName,
        fees: selectedCourse.fees,
        duration: selectedCourse.duration,
      });
    } else {
      setData({
        ...data,
        course_name: selectedCourseName,
        fees: "",
        duration: "",
      });
    }
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
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      {/* Search and pagination selector */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search student name, course, or mobile"
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

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Mobile</th>
              <th className="border px-4 py-2 text-left">Course</th>
              <th className="border px-4 py-2 text-left">Fees</th>
              <th className="border px-4 py-2 text-left">Duration</th>
              <th className="border px-4 py-2 text-left">Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.mobile}</td>
                <td className="border px-4 py-2">{student.course_name}</td>
                <td className="border px-4 py-2">₹{student.fees}</td>
                <td className="border px-4 py-2">{student.duration}</td>
                <td className="border px-4 py-2">
                  {formatDate(student.enrollment_date)}
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found.
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
              <h3 className="text-xl font-bold text-gray-800">Add Student</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                placeholder="Student Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                placeholder="Mobile Number"
                value={data.mobile}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
                className="border px-4 py-2 rounded"
                required
              />
              <select
                value={data.course_name}
                onChange={handleCourseChange}
                className="border px-4 py-2 rounded"
                required
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.course_name}>
                    {c.course_name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Fees"
                value={data.fees}
                onChange={(e) => setData({ ...data, fees: e.target.value })}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                placeholder="Duration"
                value={data.duration}
                onChange={(e) => setData({ ...data, duration: e.target.value })}
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