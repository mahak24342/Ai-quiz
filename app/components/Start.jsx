"use client";
import React from "react";

export default function Start({ mail, setMail, topic, setTopic, handleStart, loading }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-lg text-center">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700">Start Your Quiz</h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="text"
        placeholder="Topic (e.g. JavaScript Basics)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 border border-purple-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleStart}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full"
      >
        {loading ? "Generating..." : "Start Quiz"}
      </button>
    </div>
  );
}
