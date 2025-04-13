
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Image } from 'lucide-react';

const Games = () => {
  return (
    <Layout>
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Choose Your <span className="text-game-primary">Game</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-2 border-transparent hover:border-game-primary/50 transition-all duration-300">
              <CardHeader className="bg-game-accent pb-2">
                <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mb-4">
                  <Brain className="text-white" size={28} />
                </div>
                <CardTitle>Flip Matching</CardTitle>
                <CardDescription>Memory Challenge</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Find all matching pairs of cards to clear the board. The game ends when all cards are matched and removed.</p>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-game-primary/10 w-full aspect-square rounded-md"></div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-game-primary hover:bg-game-secondary">
                  <Link to="/games/flip-matching">Play Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-2 border-transparent hover:border-game-primary/50 transition-all duration-300">
              <CardHeader className="bg-game-accent pb-2">
                <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mb-4">
                  <Image className="text-white" size={28} />
                </div>
                <CardTitle>Multiple Choice</CardTitle>
                <CardDescription>10-Second Quiz</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Identify objects in images by selecting the correct answer from four options. You have 10 seconds per question.</p>
                <div className="mt-4 space-y-2">
                  <div className="bg-game-primary/10 w-full aspect-video rounded-md mb-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-game-primary/20 p-2 rounded-md text-center">Option {i}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-game-primary hover:bg-game-secondary">
                  <Link to="/games/multiple-choice">Play Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-2 border-transparent hover:border-game-primary/50 transition-all duration-300">
              <CardHeader className="bg-game-accent pb-2">
                <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-white" size={28} />
                </div>
                <CardTitle>True or False</CardTitle>
                <CardDescription>Quick Decision</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Decide if the description matches the image shown. You have 10 seconds to make your decision.</p>
                <div className="mt-4 space-y-2">
                  <div className="bg-game-primary/10 w-full aspect-video rounded-md mb-4"></div>
                  <p className="bg-game-primary/20 p-3 rounded-md text-center italic">"This is a description of the image."</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-100 p-2 rounded-md text-center font-medium text-green-700">TRUE</div>
                    <div className="bg-red-100 p-2 rounded-md text-center font-medium text-red-700">FALSE</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-game-primary hover:bg-game-secondary">
                  <Link to="/games/true-false">Play Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Games;
