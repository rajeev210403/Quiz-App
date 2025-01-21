import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuizQuestion, QuizState } from './types/quiz';
import Timer from './components/Timer';
import QuestionNavigation from './components/QuestionNavigation';
import EmailForm from './components/EmailForm';
import QuizReport from './components/QuizReport';
import { Loader2 } from 'lucide-react';

const QUIZ_TIME = 30 * 60; // 30 minutes in seconds

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    userAnswers: {},
    visitedQuestions: new Set([0]),
    currentQuestion: 0,
    email: '',
    timeRemaining: QUIZ_TIME,
    isQuizComplete: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.email && !state.questions.length) {
      fetchQuestions();
    }
  }, [state.email]);

  useEffect(() => {
    let timer: number;
    if (state.email && !state.isQuizComplete && state.timeRemaining > 0) {
      timer = window.setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.email, state.isQuizComplete]);

  const fetchQuestions = async () => {
    if (state.questions.length) return; // Prevent multiple fetches
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=15');
      const questionsWithShuffledAnswers = response.data.results.map((question: QuizQuestion) => ({
        ...question,
        shuffledAnswers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));

      setState((prev) => ({
        ...prev,
        questions: questionsWithShuffledAnswers,
      }));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
      setLoading(false);
    }
  };

  const handleEmailSubmit = (email: string) => {
    setState((prev) => ({ ...prev, email }));
  };

  const handleAnswerSelect = (answer: string) => {
    setState((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [prev.currentQuestion]: answer,
      },
    }));
  };

  const handleQuestionSelect = (index: number) => {
    setState((prev) => {
      const updatedVisitedQuestions = new Set(prev.visitedQuestions);
      updatedVisitedQuestions.add(index);
      return {
        ...prev,
        currentQuestion: index,
        visitedQuestions: updatedVisitedQuestions,
      };
    });
  };

  const handleTimeUp = () => {
    setState((prev) => ({ ...prev, isQuizComplete: true }));
  };

  const handleSubmitQuiz = () => {
    setState((prev) => ({ ...prev, isQuizComplete: true }));
  };

  if (!state.email) {
    return <EmailForm onSubmit={handleEmailSubmit} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.isQuizComplete) {
    return <QuizReport questions={state.questions} userAnswers={state.userAnswers} />;
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quiz Application</h1>
          <Timer timeRemaining={state.timeRemaining} onTimeUp={handleTimeUp} />
        </div>

        <div className="grid grid-cols-[300px,1fr] gap-6">
          <QuestionNavigation
            totalQuestions={state.questions.length}
            currentQuestion={state.currentQuestion}
            visitedQuestions={state.visitedQuestions}
            userAnswers={state.userAnswers}
            onQuestionSelect={handleQuestionSelect}
          />

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                  Question {state.currentQuestion + 1}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentQuestion.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : currentQuestion.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              <div className="space-y-3">
                {currentQuestion.shuffledAnswers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(answer)}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      state.userAnswers[state.currentQuestion] === answer
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => handleQuestionSelect(Math.max(0, state.currentQuestion - 1))}
                disabled={state.currentQuestion === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {state.currentQuestion === state.questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleQuestionSelect(Math.min(state.questions.length - 1, state.currentQuestion + 1))
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
