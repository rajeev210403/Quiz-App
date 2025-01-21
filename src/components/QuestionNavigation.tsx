import React from 'react';
import { CheckCircle, Circle, XCircle } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  userAnswers: { [key: number]: string };
  onQuestionSelect: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  userAnswers,
  onQuestionSelect,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`p-3 rounded-lg flex items-center gap-2 transition-colors ${
              currentQuestion === i
                ? 'bg-blue-500 text-white'
                : userAnswers[i]
                ? 'bg-green-100 hover:bg-green-200'
                : visitedQuestions.has(i)
                ? 'bg-yellow-50 hover:bg-yellow-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {userAnswers[i] ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : visitedQuestions.has(i) ? (
              <Circle className="w-5 h-5 text-yellow-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
            <span>{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;