export interface QuizQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: QuizQuestion[];
  userAnswers: { [key: number]: string };
  visitedQuestions: Set<number>;
  currentQuestion: number;
  email: string;
  timeRemaining: number;
  isQuizComplete: boolean;
}