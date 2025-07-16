'use client';

import { useEffect, useState } from 'react';

export default function Course() {
  const [data, setData] = useState({ name: '', fees: '', duration: '' });
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadCourses = () => {

    const staticCourses = [
      { id: 1, name: 'Python Full Stack', fees: '12000', duration: '4 months' },
      { id: 2, name: 'Java Backend', fees: '10000', duration: '3 months' },
      { id: 3, name: 'React Frontend', fees: '8000', duration: '2 months' },
      { id: 4, name: 'Django REST API', fees: '9500', duration: '2.5 months' },
      { id: 5, name: 'AI & ML', fees: '15000', duration: '6 months' },
      { id: 6, name: 'Web Design', fees: '7000', duration: '1.5 months' }
    ];
    setCourses(staticCourses);
    setFilteredCourses(staticCourses);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [search, courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...data,
    };
    setCourses((prev) => [...prev, newCourse]);
    setFilteredCourses((prev) => [...prev, newCourse]);
    setData({ name: '', fees: '', duration: '' });
    setShowModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Course
        </button>
      </div>

      {/* Search and pagination selector */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2"
        >
          {[5, 10, 15].map(n => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Course Name</th>
              <th className="border px-4 py-2">Fees</th>
              <th className="border px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => (
              <tr key={course.id} className="text-center">
                <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">₹{course.fees}</td>
                <td className="border px-4 py-2">{course.duration}</td>
              </tr>
            ))}
            {currentCourses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
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
              <h3 className="text-xl font-bold text-gray-800">Add Course</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600 text-xl font-bold">×</button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                placeholder="Course Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border px-4 py-2 rounded"
                required
              />
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
              <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

