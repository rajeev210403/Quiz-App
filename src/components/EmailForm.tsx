import React, { useState } from 'react';
import { Mail, ClipboardList, Clock, MousePointer, CheckSquare } from 'lucide-react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-center mb-8">
          <Mail className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Quiz</h1>
        
        <div className="mb-8 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-blue-800">Instructions:</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                <span>The quiz consists of 15 questions from various categories</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>You have 30 minutes to complete the quiz</span>
              </li>
              <li className="flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-blue-500" />
                <span>You can navigate between questions using the sidebar</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-500" />
                <span>You can review and change your answers before final submission</span>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your email to start
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;