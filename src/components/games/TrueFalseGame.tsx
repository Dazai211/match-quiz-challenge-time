
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GameTimer from '../GameTimer';
import { useToast } from '@/components/ui/use-toast';
import { Check, X } from 'lucide-react';

// Question data type
interface Question {
  id: number;
  image: string;
  description: string;
  isTrue: boolean;
}

// Mock questions (in a real app, you would fetch these from an API)
const mockQuestions: Question[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=300',
    description: 'This is a dog, a domesticated carnivore of the family Canidae.',
    isTrue: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300',
    description: 'This is a tiger, the largest member of the cat family.',
    isTrue: false
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=300',
    description: 'This is an elephant, the largest land mammal on Earth.',
    isTrue: true
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=300',
    description: 'This is a wolf, the largest member of the dog family.',
    isTrue: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=300',
    description: 'This is a tortoise, a reptile with a shell for protection.',
    isTrue: false
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=300',
    description: 'This is a butterfly, an insect with colorful wings and a slender body.',
    isTrue: true
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?q=80&w=300',
    description: 'This is a falcon, a bird of prey known for its speed and hunting abilities.',
    isTrue: false
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?q=80&w=300',
    description: 'This is a lion, known as the king of the jungle.',
    isTrue: true
  }
];

// Result item type
interface ResultItem {
  question: Question;
  userAnswer: boolean | null;
  timeSpent: number;
  isCorrect: boolean;
}

const TrueFalseGame = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
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
  const handleSelectOption = (answer: boolean) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setTimerRunning(false);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.isTrue;
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
        description: `The correct answer was: ${currentQuestion.isTrue ? 'TRUE' : 'FALSE'}`,
        variant: "destructive",
      });
    }
    
    // Add to results
    setResults(prev => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: answer,
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
    if (selectedAnswer !== null) return; // Already answered
    
    const currentQuestion = questions[currentQuestionIndex];
    
    toast({
      title: "Time's up!",
      description: `The correct answer was: ${currentQuestion.isTrue ? 'TRUE' : 'FALSE'}`,
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

  // Get button style based on selection and correct answer
  const getButtonStyle = (isTrue: boolean) => {
    if (selectedAnswer === null) return '';
    
    const currentQuestion = questions[currentQuestionIndex];
    
    if (isTrue === currentQuestion.isTrue) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    
    if (isTrue === selectedAnswer && isTrue !== currentQuestion.isTrue) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'opacity-50';
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {!gameStarted ? (
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold mb-4">True or False Challenge</h2>
          <p className="mb-6 text-gray-600">
            Decide if the description matches the image shown.
            You have 10 seconds to make each decision.
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
                      <p className="italic mb-2 text-gray-700">"{result.question.description}"</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="mb-1">
                            Correct Answer: 
                            <span className="font-medium ml-1">
                              {result.question.isTrue ? 'TRUE' : 'FALSE'}
                            </span>
                          </p>
                          <p className="mb-1">
                            Your Answer: 
                            <span className={result.isCorrect ? 'text-green-600 font-medium ml-1' : 'text-red-600 font-medium ml-1'}>
                              {result.userAnswer === null ? 'Time Expired' : (result.userAnswer ? 'TRUE' : 'FALSE')}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">Time: {result.timeSpent.toFixed(1)}s</p>
                        </div>
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${result.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {result.isCorrect ? 'Correct' : 'Incorrect'}
                        </div>
                      </div>
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
            
            <p className="text-center italic text-gray-700 text-lg mb-6 px-4">
              "{questions[currentQuestionIndex].description}"
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => handleSelectOption(true)}
                variant="outline"
                className={`p-6 h-auto text-lg font-medium transition-colors ${getButtonStyle(true)}`}
                disabled={selectedAnswer !== null}
              >
                <Check className="mr-2" size={24} />
                TRUE
              </Button>
              
              <Button
                onClick={() => handleSelectOption(false)}
                variant="outline"
                className={`p-6 h-auto text-lg font-medium transition-colors ${getButtonStyle(false)}`}
                disabled={selectedAnswer !== null}
              >
                <X className="mr-2" size={24} />
                FALSE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueFalseGame;
