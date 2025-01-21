# Quiz-App

## Overview

This is a simple quiz application built as part of a coding assignment. The app is designed to test your knowledge by presenting 15 multiple-choice questions, fetched from the [Open Trivia Database] Users can submit their answers, navigate between questions, and view a detailed report upon quiz completion. The application includes a timer and is fully responsive for optimal performance on various device sizes.

**Live link**: https://quiz-app-brown-nine.vercel.app/
## Features

### Core Features
1. **Email Submission**: Users must enter their email address to start the quiz.
2. **Quiz Questions**:
   - 15 questions are fetched dynamically from the API.
   - Answers are displayed as multiple-choice options (shuffled for fairness).
3. **Timer**:
   - A countdown timer starts at 30 minutes.
   - The quiz auto-submits when the timer reaches zero.
4. **Navigation**:
   - Users can navigate to specific questions via a navigation panel.
   - Question statuses are visually indicated for ease of use.
5. **End of Quiz Report**:
   - Displays each question, the user's answer, the correct answer, and incorrect options for comparison.
   - Includes detailed stats such as accuracy, correct answers, attempt rate, and questions attempted.

## Bonus Features Implemented

1. **Responsiveness**:
   - The application is fully responsive and adapts seamlessly to different screen sizes.
   - Compatible with the latest versions of major browsers, including Chrome, Firefox, Safari, and Edge.

2. **UI/UX Enhancements**:
   - Smooth transitions between questions for a polished experience.
   - Each question displays its **category** and **difficulty** with intuitive styling.

3. **Question Status Color Coding**:
   - **Unvisited** questions: Default color.
   - **Visited but unattempted** questions: Highlighted in **yellow**.
   - **Answered** questions: Marked in **green**.
   - **Selected** question: Highlighted in **blue**.

4. **Detailed Quiz Report**:
   - After submission, the report displays:
     - **Accuracy**: Percentage of correct answers.
     - **Correct Answers**: Total number of questions answered correctly.
     - **Attempt Rate**: Percentage of questions attempted.
     - **Questions Attempted**: Total count of questions the user interacted with.
     - A clear comparison of each question with:
       - The user's answer.
       - The correct answer.
       - Incorrect options.

## Components Build

1. **EmailForm**:
   - Collects the user's email address before starting the quiz.

2. **Timer**:
   - Displays a countdown timer starting at 30 minutes.
   - Automatically submits the quiz when the timer reaches zero.
   - Changes color to red when the remaining time is below 5 minutes.

3. **QuestionNavigation**:

   - Displays the list of questions and their statuses (unvisited, visited, answered, selected).
   - Allows users to navigate directly to any question.

4. **QuizQuestion**:
   - After submission, It displays the detailed report of the quiz.
       
## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd simple-quiz-app
2. Install Dependencies:
   ```bash
   npm install
3. Run Application:
   ```bash
   npm run dev

## Assumptions
1. The user has an active internet connection to fetch the questions from the API.
2. Each question has a single correct answer.
3. The user’s email is required before starting the quiz.

## Challenges and Learnings

1. **Timer Syncronization**: Initially, keeping the timer synchronized with the user's quiz session was challenging. To address this, I ensured the timer logic is isolated and triggered every second while the quiz is active.
2. **Quiz Questions**:Managing the state for user answers, question navigation, and timer updates required careful consideration. I used React’s useState and useEffect hooks to handle all the state updates and side effects.
3. **Timer**:Ensuring smooth animations and responsiveness, I used Tailwind.
4. **Navigation**:
   - Users can navigate to specific questions via a navigation panel.
   - Question statuses are visually indicated for ease of use.
5. **End of Quiz Report**:
   - Displays each question, the user's answer, the correct answer, and incorrect options for comparison.
   - Includes detailed stats such as accuracy, correct answers, attempt rate, and questions attempted.
  
## Technologies Used:

- React Vite
- TypeScript
- Axios
- TailWind CSS

## How to Use:

- Enter your email address to start the quiz.
- Answer the questions or skip and revisit them using the navigation panel.
- Keep track of the timer at the top of the page.
- Submit the quiz or let it auto-submit when the timer ends.
- View the detailed quiz report and analyze your performance.

## Deployment:

- The application is hosted on Vercel
- **Live link**: https://quiz-app-brown-nine.vercel.app/
  

  
