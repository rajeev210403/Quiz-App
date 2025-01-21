import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Apply red color if time remaining is less than or equal to 5 minutes
  const timerTextColor = timeRemaining <= 300 ? 'text-red-500' : 'text-black';

  return (
    <div className="flex items-center gap-2 text-xl font-semibold bg-white p-3 rounded-lg shadow">
      <Clock className={`w-6 h-6 ${timerTextColor}`} />
      <span className={timerTextColor}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;