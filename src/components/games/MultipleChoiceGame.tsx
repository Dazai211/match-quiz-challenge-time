
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameTimer from '../GameTimer';
import { useToast } from '@/components/ui/use-toast';

// Question data type
interface Question {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
}

// Mock questions (in a real app, you would fetch these from an API)
const mockQuestions: Question[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=300',
    correctAnswer: 'Dog',
    options: ['Dog', 'Wolf', 'Fox', 'Coyote']
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300',
    correctAnswer: 'Cat',
    options: ['Cat', 'Tiger', 'Lynx', 'Panther']
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=300',
    correctAnswer: 'Elephant',
    options: ['Elephant', 'Rhino', 'Hippo', 'Giraffe']
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=300',
    correctAnswer: 'Fox',
    options: ['Fox', 'Wolf', 'Dog', 'Coyote']
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=300',
    correctAnswer: 'Turtle',
    options: ['Turtle', 'Tortoise', 'Lizard', 'Iguana']
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=300',
    correctAnswer: 'Butterfly',
    options: ['Butterfly', 'Moth', 'Dragonfly', 'Bee']
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?q=80&w=300',
    correctAnswer: 'Parrot',
    options: ['Parrot', 'Macaw', 'Parakeet', 'Cockatoo']
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?q=80&w=300',
    correctAnswer: 'Lion',
    options: ['Lion', 'Tiger', 'Cheetah', 'Leopard']
  }
];

// Result item type
interface ResultItem {
  question: Question;
  userAnswer: string | null;
  timeSpent: number;
  isCorrect: boolean;
}

const MultipleChoiceGame = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [score, setScore] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  
  const TIME_PER_QUESTION = 10; // seconds

  // Initialize game with shuffled questions
  const initializeGame = () => {
    // Shuffle questions and take 5
    const shuffledQuestions = [...mockQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    
    // Shuffle the options for each question
    shuffledQuestions.forEach(question => {
      question.options = [...question.options].sort(() => Math.random() - 0.5);
    });
    
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setGameStarted(true);
    setGameOver(false);
    setSelectedAnswer(null);
    setResults([]);
    setScore(0);
    setTimerRunning(true);
    setQuestionStartTime(Date.now());
  };

  // Handle option selection
  const handleSelectOption = (option: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(option);
    setTimerRunning(false);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    
    // Calculate points based on correctness and time
    if (isCorrect) {
      // Score more points for faster answers (max 100 points)
      const timePoints = Math.max(0, Math.floor((TIME_PER_QUESTION - timeSpent) * 10));
      const pointsEarned = 50 + timePoints;
      setScore(prevScore => prevScore + pointsEarned);
      
      toast({
        title: "Correct!",
        description: `+${pointsEarned} points`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer was: ${currentQuestion.correctAnswer}`,
        variant: "destructive",
      });
    }
    
    // Add to results
    setResults(prev => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: option,
        timeSpent,
        isCorrect
      }
    ]);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setTimerRunning(true);
        setQuestionStartTime(Date.now());
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  // Handle timer expiration
  const handleTimeUp = () => {
    if (selectedAnswer) return; // Already answered
    
    const currentQuestion = questions[currentQuestionIndex];
    
    toast({
      title: "Time's up!",
      description: `The correct answer was: ${currentQuestion.correctAnswer}`,
      variant: "destructive",
    });
    
    // Add to results with null answer
    setResults(prev => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: null,
        timeSpent: TIME_PER_QUESTION,
        isCorrect: false
      }
    ]);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setTimerRunning(true);
        setQuestionStartTime(Date.now());
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  // Get button style based on option and selected answer
  const getButtonStyle = (option: string) => {
    if (!selectedAnswer) return '';
    
    const currentQuestion = questions[currentQuestionIndex];
    
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'opacity-50';
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {!gameStarted ? (
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold mb-4">Multiple Choice Challenge</h2>
          <p className="mb-6 text-gray-600">
            Identify the object in each image by selecting the correct option. 
            You have 10 seconds to answer each question. 
            Answer faster for more points!
          </p>
          <Button 
            onClick={initializeGame} 
            className="bg-game-primary hover:bg-game-secondary"
          >
            Start Game
          </Button>
        </div>
      ) : gameOver ? (
        <div className="my-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Game Complete!</h2>
            <p className="text-xl mb-2">Your Score: <span className="font-bold text-game-primary">{score}</span></p>
            <Button 
              onClick={initializeGame} 
              className="bg-game-primary hover:bg-game-secondary mt-4"
            >
              Play Again
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Your Results</h3>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <img 
                      src={result.question.image} 
                      alt="Question" 
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium mb-1">Question {index + 1}: <span className="text-gray-700">{result.question.correctAnswer}</span></p>
                      <p className="mb-1">
                        Your Answer: 
                        <span className={result.isCorrect ? 'text-green-600 font-medium ml-1' : 'text-red-600 font-medium ml-1'}>
                          {result.userAnswer || 'Time Expired'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">Time: {result.timeSpent.toFixed(1)}s</p>
                      <p className={`text-sm font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="my-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Question {currentQuestionIndex + 1}/{questions.length}</span>
              <span className="font-medium">Score: {score}</span>
            </div>
            <GameTimer 
              duration={TIME_PER_QUESTION} 
              onTimeUp={handleTimeUp} 
              isRunning={timerRunning}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-center mb-6">
              <img 
                src={questions[currentQuestionIndex].image} 
                alt="Question" 
                className="max-h-64 rounded-md object-contain"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  variant="outline"
                  className={`p-4 h-auto text-lg font-medium transition-colors ${getButtonStyle(option)}`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceGame;
