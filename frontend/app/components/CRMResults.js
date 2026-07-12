"use client";

import { useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiSearch,
  FiDownload,
} from "react-icons/fi";

export default function CRMResults({ data }) {
  const [search, setSearch] = useState("");

  if (!data) return null;

  const filtered = data.imported.filter((lead) =>
    Object.values(lead)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(data.imported, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "crm-results.json";

    a.click();
  };

  return (
    <div className="mt-12">

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-500 text-white rounded-3xl p-6 shadow-xl">
          <FiCheckCircle size={40} />
          <h2 className="text-4xl font-bold mt-3">
            {data.totalImported}
          </h2>
          <p>Imported</p>
        </div>

        <div className="bg-red-500 text-white rounded-3xl p-6 shadow-xl">
          <FiXCircle size={40} />
          <h2 className="text-4xl font-bold mt-3">
            {data.totalSkipped}
          </h2>
          <p>Skipped</p>
        </div>

        <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl">
          <FiUsers size={40} />
          <h2 className="text-4xl font-bold mt-3">
            {data.totalImported + data.totalSkipped}
          </h2>
          <p>Total Records</p>
        </div>

      </div>

      {/* Search */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

        <div className="relative w-full md:w-96">

          <FiSearch
            className="absolute left-3 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <button
          onClick={downloadJSON}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          <FiDownload />
          Export JSON
        </button>

      </div>

      {/* Table */}

      <div className="mt-8 bg-white rounded-3xl shadow-xl overflow-auto max-h-[600px]">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-900 text-white">

            <tr>

              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Mobile</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">City</th>
              <th className="px-5 py-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((lead, index) => (

              <tr
                key={index}
                className={`border-b hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                <td className="px-5 py-4">{lead.name}</td>

                <td className="px-5 py-4">{lead.email}</td>

                <td className="px-5 py-4">
                  {lead.mobile_without_country_code}
                </td>

                <td className="px-5 py-4">{lead.company}</td>

                <td className="px-5 py-4">{lead.city}</td>

                <td className="px-5 py-4">

                  <span
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700"
                  >
                    {lead.crm_status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}