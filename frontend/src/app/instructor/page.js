"use client";

import { useEffect, useState } from "react";

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, user_name: "Amit Verma", bio: "Expert in Python and AI." },
      { id: 2, user_name: "Sneha Sharma", bio: "Frontend developer with React expertise." },
      { id: 3, user_name: "Rahul Mehta", bio: "Backend specialist in Django and Node.js." },
      { id: 4, user_name: "Priya Iyer", bio: "Full Stack trainer with 8 years experience." },
      { id: 5, user_name: "Karan Singh", bio: "ML engineer and data scientist." },
      { id: 6, user_name: "Neha Gupta", bio: "UI/UX designer and mentor." }
    ];
    setInstructors(data);
    setFilteredInstructors(data);
  }, []);

  useEffect(() => {
    const filtered = instructors.filter(
      (i) =>
        i.user_name.toLowerCase().includes(search.toLowerCase()) ||
        i.bio.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredInstructors(filtered);
  }, [search, instructors]);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Instructors</h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search instructor name or bio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredInstructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {instructor.user_name}
            </h3>
            <p className="text-gray-600 mt-2">{instructor.bio}</p>
          </div>
        ))}
        {filteredInstructors.length === 0 && (
          <p className="text-gray-500">No instructors found.</p>
        )}
      </div>
    </div>
  );
}