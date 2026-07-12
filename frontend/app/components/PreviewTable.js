"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFileText } from "react-icons/fi";

export default function PreviewTable({ headers, rows }) {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 bg-white rounded-3xl shadow-2xl border overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">

        <div className="flex items-center gap-3">
          <FiFileText className="text-white text-3xl" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              CSV Preview
            </h2>
            <p className="text-blue-100 text-sm">
              Review your uploaded data before importing
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 bg-white rounded-xl px-4 py-2 shadow">
          <span className="font-semibold text-blue-700">
            {filteredRows.length}
          </span>{" "}
          Records
        </div>
      </div>

      {/* Search */}
      <div className="p-5 border-b bg-gray-50">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[550px]">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 z-20 bg-slate-900 text-white">

            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left whitespace-nowrap text-sm uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-16 text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredRows.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    border-b
                    ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                    hover:bg-blue-50 transition
                  `}
                >
                  {headers.map((head) => (
                    <td
                      key={head}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {row[head] || (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t">

        <p className="text-gray-600">
          Showing{" "}
          <span className="font-bold">
            {filteredRows.length}
          </span>{" "}
          of{" "}
          <span className="font-bold">
            {rows.length}
          </span>{" "}
          records
        </p>

        <button
          className="mt-3 md:mt-0 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Ready for Import
        </button>

      </div>

    </motion.div>
  );
}