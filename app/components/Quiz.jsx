"use client";
import React, { useState, useEffect } from "react";
//import Start from "@/components/Start";
//import Quiz from "@/components/Quiz";
//import Result from "@/components/Result";
import Question from '@/app/components/Question'
//import Ques frm '@/app/components/Question'
import Result from '@/app/components/Result'
import Start from '@/app/components/Start'
export default function Quiz() {
  const [mail, setMail] = useState("");
  const [topic, setTopic] = useState("");
  const [sub, setSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ques, setQues] = useState([]);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [feedback, setFeedback] = useState([]);
  const [aiFeedback, setAiFeedback] = useState("");

  const handleStart = async () => {
    if (!mail.trim() || !topic.trim()) {
      alert("Please enter both Email and Topic");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setQues(data.quiz || []);
    setSub(true);
    setLoading(false);
  };

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

  const handleAnswerSelect = (qIndex, answer) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: answer }));
  };

  const handleSubmitQuiz = async () => {
    let newScore = 0;
    let newFeedback = [];
    ques.forEach((q, index) => {
      const isCorrect = answers[index] === q.correct_answer;
      if (isCorrect) newScore++;
      newFeedback.push({
        question: q.question,
        selected: answers[index],
        correct: q.correct_answer,
        isCorrect,
      });
    });
    setScore(newScore);
    setFeedback(newFeedback);
    setResult(true);

    try {
      const res = await fetch("/api/ai-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: newFeedback }),
      });
      const data = await res.json();
      setAiFeedback(data.feedbackText || "");
    } catch (err) {
      console.error("Error fetching AI feedback:", err);
    }
  };

  if (!sub) return <Start mail={mail} setMail={setMail} topic={topic} setTopic={setTopic} handleStart={handleStart} loading={loading} />;
  if (loading) return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  if (result) return <Result score={score} ques={ques} mail={mail} topic={topic} feedback={feedback} aiFeedback={aiFeedback} />;
  return <Question topic={topic} ques={ques} answers={answers} handleAnswerSelect={handleAnswerSelect} handleSubmitQuiz={handleSubmitQuiz} timeLeft={timeLeft} />;
}
