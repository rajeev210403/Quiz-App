import React from 'react';
import { CheckCircle, XCircle, Target, MinusCircle } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';

interface QuizReportProps {
  questions: QuizQuestion[];
  userAnswers: { [key: number]: string };
}

const QuizReport: React.FC<QuizReportProps> = ({ questions, userAnswers }) => {
  const calculateAccuracy = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.correct_answer ? 1 : 0);
    }, 0);
    const attemptedQuestions = Object.keys(userAnswers).length;
    
    return {
      correctAnswers,
      totalQuestions,
      attemptedQuestions,
      accuracy: Math.round((correctAnswers / totalQuestions) * 100),
      attemptRate: Math.round((attemptedQuestions / totalQuestions) * 100),
    };
  };

  const stats = calculateAccuracy();

  const getAnswerStatus = (questionIndex: number, answer: string) => {
    const isCorrectAnswer = answer === questions[questionIndex].correct_answer;
    const isUserAnswer = answer === userAnswers[questionIndex];

    if (isCorrectAnswer && isUserAnswer) {
      return { icon: <CheckCircle className="w-5 h-5 text-green-500" />, bg: 'bg-green-100' };
    } else if (isCorrectAnswer) {
      return { icon: <CheckCircle className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' };
    } else if (isUserAnswer) {
      return { icon: <XCircle className="w-5 h-5 text-red-500" />, bg: 'bg-red-100' };
    }
    return { icon: <MinusCircle className="w-5 h-5 text-gray-400" />, bg: 'bg-gray-50' };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Report</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-12 h-12 text-blue-500" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.accuracy}%</p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.correctAnswers}</p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats.attemptRate}%</p>
              <p className="text-sm text-gray-600">Attempt Rate</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{stats.attemptedQuestions}</p>
              <p className="text-sm text-gray-600">Questions Attempted</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    Question {index + 1}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    {question.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                
                <div className="space-y-3">
                  {allAnswers.map((answer, answerIndex) => {
                    const status = getAnswerStatus(index, answer);
                    return (
                      <div
                        key={answerIndex}
                        className={`flex items-center gap-2 p-4 rounded-lg ${status.bg}`}
                      >
                        {status.icon}
                        <span>{answer}</span>
                      </div>
                    );
                  })}
                </div>

                {!userAnswers[index] && (
                  <div className="mt-3 text-yellow-600 flex items-center gap-2">
                    <MinusCircle className="w-5 h-5" />
                    <span>Not answered</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizReport;