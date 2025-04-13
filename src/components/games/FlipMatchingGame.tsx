
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Shuffle } from 'lucide-react';

// 🎮 Flip Matching Game Component
// 
// Content Customization Guide:
// 1. To change card content from emojis to pictures:
//    - Modify the 'cardEmojis' array below
//    - Replace emoji strings with image URLs or paths
//    Example:
//    const cardEmojis = [
//      'https://example.com/image1.jpg', 
//      'https://example.com/image2.jpg',
//      // ... more image URLs
//    ];
//
// 2. Adjust number of pairs by modifying 'getPairsCount()' method
// 3. Change game difficulty levels in the same method

// Card content - currently using emojis, can be easily replaced with image URLs
const cardEmojis = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🦋', '🐢',
  '🦉', '🦇', '🐝', '🐙', '🦑', '🦞', '🦐', '🐠'
];

const FlipMatchingGame = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Define the number of pairs based on difficulty
  const getPairsCount = () => {
    switch(difficulty) {
      case 'easy': return 6;
      case 'medium': return 8; 
      case 'hard': return 12;
      default: return 6;
    }
  };

  const getTotalPairs = getPairsCount();
  
  // Initialize the game
  const initializeGame = () => {
    // Select random emojis based on difficulty
    const pairsCount = getPairsCount();
    const shuffledEmojis = [...cardEmojis].sort(() => 0.5 - Math.random()).slice(0, pairsCount);
    
    // Create pairs of cards
    let newCards: Card[] = [];
    shuffledEmojis.forEach((emoji, index) => {
      // Add each emoji twice (for pairs)
      newCards.push({
        id: index * 2,
        content: emoji,
        isFlipped: false,
        isMatched: false
      });
      newCards.push({
        id: index * 2 + 1,
        content: emoji,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle the cards
    newCards = newCards.sort(() => Math.random() - 0.5);
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore click if game is over or card is already flipped/matched
    if (gameOver || cards[id].isFlipped || cards[id].isMatched) return;
    
    // Ignore if two cards are already flipped (waiting for check)
    if (flippedCards.length === 2) return;
    
    // Flip the card
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    
    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      
      // Increment moves
      setMoves(prev => prev + 1);
      
      // Check if cards match
      if (cards[firstId].content === cards[secondId].content) {
        // Mark cards as matched
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            // Check if game is over
            if (newMatchedPairs === getTotalPairs) {
              setGameOver(true);
              toast({
                title: "Congratulations!",
                description: `You completed the game in ${moves + 1} moves!`,
              });
            }
            return newMatchedPairs;
          });
        }, 500);
      } else {
        // Flip cards back after a delay
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Get grid columns based on difficulty
  const getGridColumns = () => {
    switch(difficulty) {
      case 'easy': return 'grid-cols-3';
      case 'medium': return 'grid-cols-4';
      case 'hard': return 'grid-cols-6';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {!gameStarted ? (
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold mb-6">Select Difficulty</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              onClick={() => setDifficulty('easy')}
              variant={difficulty === 'easy' ? 'default' : 'outline'}
              className={difficulty === 'easy' ? 'bg-game-primary' : ''}
            >
              Easy (6 Pairs)
            </Button>
            <Button
              onClick={() => setDifficulty('medium')}
              variant={difficulty === 'medium' ? 'default' : 'outline'}
              className={difficulty === 'medium' ? 'bg-game-primary' : ''}
            >
              Medium (8 Pairs)
            </Button>
            <Button
              onClick={() => setDifficulty('hard')}
              variant={difficulty === 'hard' ? 'default' : 'outline'}
              className={difficulty === 'hard' ? 'bg-game-primary' : ''}
            >
              Hard (12 Pairs)
            </Button>
          </div>
          <Button 
            onClick={initializeGame} 
            className="bg-game-primary hover:bg-game-secondary px-8 py-2"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg">
              <div className="font-medium">Pairs: {matchedPairs}/{getTotalPairs}</div>
              <div className="text-sm text-gray-600">Moves: {moves}</div>
            </div>
            <Button 
              onClick={initializeGame} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Shuffle size={18} />
              Restart
            </Button>
          </div>
          
          <div className={`grid ${getGridColumns()} gap-3 mb-8`}>
            {cards.map((card, index) => (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`perspective aspect-square transition-all duration-300 cursor-pointer ${
                  card.isMatched ? 'opacity-0 pointer-events-none' : ''
                }`}
              >
                <div className={`relative w-full h-full preserve-3d transition-all duration-500 ${
                  card.isFlipped ? 'rotate-y-180' : ''
                }`}>
                  {/* Card Back */}
                  <div className="absolute backface-hidden w-full h-full bg-game-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    ?
                  </div>
                  
                  {/* Card Front */}
                  <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-white border-2 border-game-primary rounded-lg flex items-center justify-center text-4xl">
                    {card.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {gameOver && (
            <div className="text-center my-6 p-4 bg-game-accent rounded-lg">
              <h2 className="text-2xl font-bold text-game-primary mb-2">Game Complete!</h2>
              <p className="mb-4">You matched all pairs in {moves} moves!</p>
              <Button 
                onClick={initializeGame}
                className="bg-game-primary hover:bg-game-secondary"
              >
                Play Again
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlipMatchingGame;
