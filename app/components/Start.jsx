"use client";
import React from "react";

export default function Start({ mail, setMail, topic, setTopic, handleStart, loading }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-purple-200">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-2">
          Welcome to AI Quiz App
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your details below and start your AI-powered quiz instantly.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="you@example.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg mb-5 focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
        />

        {/* Topic Input */}
        <input
          type="text"
          placeholder="Topic (e.g. JavaScript Basics)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg mb-6 focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
        />

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          {loading ? "Generating..." : "🚀 Start Quiz"}
        </button>
      </div>
    </div>
  );
}
