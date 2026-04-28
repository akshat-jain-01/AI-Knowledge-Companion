import React, { useState, useEffect, useContext } from "react";
import ChatSection from "./ChatSection";
import { handleUpload } from "../utils/upload.js";
import { AppContext } from "../context/AppContext.jsx";
import API from "../utils/api.js"; // 🔥 missing tha

const Home = () => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [documents, setDocuments] = useState([]);

  const { logout, user } = useContext(AppContext);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await API.get("/documents");

        const formatted = res.data.map((doc) => ({
          id: doc._id,
          name: doc.file_name || "file.pdf",
        }));

        setDocuments(formatted);
      } catch (error) {
        console.error("Error fetching docs:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex bg-[#0f172a] text-white">

      {/* 🔹 Sidebar */}
      <div className="w-72 min-w-[280px] bg-[#020617] border-r border-gray-800 flex flex-col">

        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold">AI Companion</h2>
        </div>

        {/* Upload */}
        <div className="p-4">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => handleUpload(e, setDocuments, setActiveDoc)}
            className="hidden"
            id="fileUpload"
          />

          <label
            htmlFor="fileUpload"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium text-center cursor-pointer block"
          >
            + Upload Document
          </label>
        </div>

        {/* Documents */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActiveDoc(doc)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                activeDoc?.id === doc.id
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              📄 {doc.name}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          Logged in as <br />
          <span className="text-white font-medium">
            {user?.email || "user@email.com"}
          </span>

          <button
            onClick={logout}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

      </div>

      {/* 🔹 Main Area */}
      <div className="flex-1 flex flex-col h-screen">

        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          {activeDoc ? (
            <span className="text-sm text-gray-300">
              📄 Talking to:{" "}
              <span className="text-white font-medium">
                {activeDoc.name}
              </span>
            </span>
          ) : (
            <span className="text-gray-400">
              Select a document to start chatting
            </span>
          )}
        </div>

        {/* Body */}
        {activeDoc ? (
          <ChatSection activeDoc={activeDoc} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a document to start chatting
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;