"use client";

import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [mail, setMail] = useState("");
  const [sub, setSub] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState([]);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Start quiz
  const handleStart = () => {
    if (!mail.trim()) {
      alert("Enter Email");
      return;
    }
    localStorage.setItem("quiz_email", mail);
    setSub(true);
  };

  // Fetch questions
  useEffect(() => {
    if (sub) {
      fetch("https://opentdb.com/api.php?amount=15&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setQues(data.results);
          setLoading(false);
        });
    }
  }, [sub]);

  // Timer countdown
  useEffect(() => {
    if (sub && !loading && !result) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sub, loading, result]);

  // Handle answer selection
  const handleAnswerSelect = (qIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: answer,
    }));
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    let newScore = 0;
    ques.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setResult(true);
  };

  // Format time
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Result Screen
  if (result) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-green-50 rounded-lg text-center shadow-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Quiz Finished</h2>
        <p className="text-lg mb-2">
          Your Score: <span className="font-bold">{score}</span> / {ques.length}
        </p>
        <p className="text-gray-600">Email: {mail}</p>
      </div>
    );
  }

  // Email Input Screen
  if (!sub) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Enter Your Email</h2>
        <input
          type="email"
          placeholder="you@example.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full transition-all"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-500 animate-pulse">
        Loading Questions...
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Timer */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Hi {mail}</h2>
        <div className="text-lg font-bold text-red-500 border border-red-300 px-3 py-1 rounded-md">
          ⏳ {formatTime(timeLeft)}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Quiz Questions</h2>

      {ques.map((data, index) => {
        const allAnswers = [...data.incorrect_answers, data.correct_answer].sort();

        return (
          <div
            key={index}
            className="mb-6 p-4 bg-white shadow-lg rounded-lg border hover:shadow-xl transition-all"
          >
            <p className="font-medium mb-4 text-gray-800">
              {index + 1}. {data.question}
            </p>
            <div className="space-y-2">
              {allAnswers.map((ans, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(index, ans)}
                  className={`w-full p-2 rounded-lg border text-left transition-all ${
                    answers[index] === ans
                      ? "bg-blue-100 border-blue-400 font-semibold"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <button
        onClick={handleSubmitQuiz}
        className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
