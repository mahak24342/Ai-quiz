"use client";
import React from "react";

export default function Question({ topic, ques, answers, handleAnswerSelect, handleSubmitQuiz, timeLeft }) {
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="text-right text-lg font-bold text-red-500 mb-4">
        Time Left: {formatTime(timeLeft)}
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
        Quiz on {topic}
      </h2>

      {ques.map((data, index) => (
        <div key={index} className="mb-6 p-4 bg-white shadow rounded-lg border border-purple-200">
          <p className="font-medium mb-4">{index + 1}. {data.question}</p>
          <div className="space-y-2">
            {data.options.map((ans, i) => (
              <button
                key={i}
                onClick={() => handleAnswerSelect(index, ans)}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  answers[index] === ans
                    ? "bg-purple-100 border-purple-400"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {ans}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmitQuiz}
        className="mt-4 w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
      >
        Submit Quiz
      </button>
    </div>
  );
}
