
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface GameTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean;
}

const GameTimer = ({ duration, onTimeUp, isRunning }: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;
  
  // Color changes based on time left
  const getColorClass = () => {
    if (progress > 60) return 'bg-green-500';
    if (progress > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    let timer: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.1;
          if (newTime <= 0) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, onTimeUp]);

  // Reset timer when duration changes or game restarts
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, isRunning]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>Time Left</span>
        <span>{Math.ceil(timeLeft)}s</span>
      </div>
      <Progress value={progress} className="h-2" indicatorClassName={getColorClass()} />
    </div>
  );
};

export default GameTimer;
