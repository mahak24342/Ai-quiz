"use client"; // Must be at the top

import React, { useState } from 'react';

const Quiz = () => {
  const [mail, setMail] = useState('');
  const [sub, setSub] = useState(false);

  const handleStart = () => {
    if (!mail.trim()) {
      alert('Enter Email');
      return;
    }

    localStorage.setItem('quiz_email', mail); // Save email in localStorage
    setSub(true); // Update submission state
  };

  // If quiz hasn't started yet
  if (!sub) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-blue-100 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Enter Email To Start</h2>
        <input
          type="email"
          placeholder="you@example.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="w-full p-2 border rounded-sm mb-4"
        />
        <button
          onClick={handleStart}
          className="bg-pink-600 text-white px-4 py-2 rounded-sm hover:bg-pink-700"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // After email is submitted
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">Quiz Questions</h2>
      {/* Quiz content can be added here */}
    </div>
  );
};

export default Quiz;
