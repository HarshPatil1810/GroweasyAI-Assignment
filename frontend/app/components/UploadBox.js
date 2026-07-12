"use client";

import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import PreviewTable from "./PreviewTable";
import CRMResults from "./CRMResults";

export default function UploadBox() {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crmData, setCrmData] = useState(null);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    const csv = acceptedFiles[0];

    if (!csv) return;

    setFile(csv);

    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,

      complete: (result) => {
        setRows(result.data);
        setHeaders(result.meta.fields);

        toast.success("CSV Loaded Successfully");
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },

    multiple: false,

    onDrop,
  });

  const handleImport = async () => {

    try {

      setLoading(true);
      setProgress(0);

      const batchSize = 20;

      let imported = [];
      let skipped = [];

      const totalBatches = Math.ceil(rows.length / batchSize);

      for (let i = 0; i < rows.length; i += batchSize) {

        const batch = rows.slice(i, i + batchSize);

        const response = await axios.post(

          "http://localhost:5000/api/upload/import-batch",

          {
            rows: batch
          }

        );

        imported.push(...response.data.imported);

        skipped.push(...response.data.skipped);

        const currentBatch = Math.floor(i / batchSize) + 1;

        setProgress(
          Math.round((currentBatch / totalBatches) * 100)
        );

      }

      setCrmData({

        totalImported: imported.length,

        totalSkipped: skipped.length,

        imported,

        skipped

      });

      toast.success("Import Completed Successfully");

    }

    catch (err) {

      console.log(err);

      toast.error("Import Failed");

    }

    finally {

      setLoading(false);

    }

  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Upload Area */}

      <motion.div
        initial={{ opacity: 0, scale: .95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .4 }}
        {...getRootProps()}
        className={`

        mt-10

        rounded-3xl

        border-2

        border-dashed

        p-16

        cursor-pointer

        transition-all

        duration-300

        shadow-xl

        text-center

        ${isDragActive
            ? "border-blue-500 bg-blue-50 scale-105"
            : "border-gray-300 bg-white hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1"
          }

        `}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <FiUploadCloud
            className="mx-auto text-blue-600"
            size={90}
          />
        </motion.div>

        <h2 className="mt-6 text-3xl font-bold">
          Upload CSV File
        </h2>

        <p className="mt-3 text-gray-500">
          Drag & Drop your CSV here
        </p>

        <button
          className="mt-8 px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Browse Files
        </button>
      </motion.div>

      {/* Uploaded File */}

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-3xl shadow-xl p-8 border"
        >
          <div className="flex justify-between items-center">

            <div>

              <div className="flex items-center gap-3">

                <FiFileText
                  className="text-blue-600"
                  size={28}
                />

                <h3 className="text-2xl font-bold">
                  Uploaded File
                </h3>

              </div>

              <p className="mt-4 text-gray-600">
                <strong>Name :</strong> {file.name}
              </p>

              <p className="text-gray-600">
                <strong>Rows :</strong> {rows.length}
              </p>

            </div>

            <FiCheckCircle
              className="text-green-500"
              size={70}
            />

          </div>
        </motion.div>
      )}

      {/* Preview */}

      {rows.length > 0 && (
        <PreviewTable
          headers={headers}
          rows={rows}
        />
      )}

      {/* Import Button */}

      {rows.length > 0 && (
        <div className="text-center mt-10">

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
            onClick={handleImport}
            disabled={loading}
            className="

            px-12

            py-4

            rounded-2xl

            bg-gradient-to-r

            from-blue-600

            to-indigo-600

            hover:from-indigo-600

            hover:to-blue-600

            text-white

            font-bold

            text-lg

            shadow-xl

            disabled:opacity-50

            "
          >
            {loading
              ? " AI Processing..."
              : " Confirm Import"}
          </motion.button>

          {/* Progress */}

          {loading && (

            <div className="mt-10">

              <div className="flex justify-between mb-2">

                <span className="font-semibold text-gray-600">

                  {loading
                    ? `Processing ${progress}%`
                    : "🚀 Confirm Import"}

                </span>

                <span className="font-bold text-blue-600">

                  {progress}%

                </span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <motion.div

                  animate={{
                    width: `${progress}%`
                  }}

                  transition={{
                    duration: 0.4
                  }}

                  className="h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600"

                />

              </div>

              <p className="mt-4 text-gray-600 text-center">

                Processing CSV batches...

              </p>

            </div>

          )}

        </div>
      )}

      {/* CRM Results */}

      {crmData && (
        <CRMResults data={crmData} />
      )}
    </div>
  );
}