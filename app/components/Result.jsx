"use client";
import React from "react";

export default function Result({ score, ques, mail, topic, feedback, aiFeedback }) {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg shadow text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Quiz Finished</h2>
      <p className="text-lg mb-2">
        Score: <span className="font-bold">{score}</span> / {ques.length}
      </p>
      <p className="text-gray-700">Email: {mail}</p>
      <p className="text-gray-700">Topic: {topic}</p>

      <div className="mt-4 text-left">
        {feedback.map((f, i) => (
          <div
            key={i}
            className={`p-3 mb-2 rounded ${
              f.isCorrect ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p className="font-semibold">{i + 1}. {f.question}</p>
            <p>Your answer: {f.selected || "No answer"}</p>
            <p>Correct answer: {f.correct}</p>
          </div>
        ))}
      </div>

      {aiFeedback && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded my-4">
          <h3 className="font-bold text-yellow-700 mb-2">AI Feedback</h3>
          <p className="text-gray-800 whitespace-pre-line">{aiFeedback}</p>
        </div>
      )}
    </div>
  );
}
