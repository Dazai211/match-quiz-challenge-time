
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Clock, Image } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-game-primary">Fun Games</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Challenge your brain with our collection of engaging games designed to test your memory, knowledge, and quick thinking.
          </p>
          <Button asChild className="bg-game-primary hover:bg-game-secondary text-white px-8 py-6 text-lg rounded-md shadow-md">
            <Link to="/games">Start Playing <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flip Matching Game */}
            <div className="bg-game-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-game-primary/10 rounded-md mb-4 flex items-center justify-center">
                <Brain size={64} className="text-game-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Flip Matching</h3>
              <p className="text-gray-600 mb-4">Test your memory by finding matching pairs of cards. Clear the board to win!</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/games/flip-matching">Play Now</Link>
              </Button>
            </div>

            {/* Multiple Choice Game */}
            <div className="bg-game-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-game-primary/10 rounded-md mb-4 flex items-center justify-center">
                <Image size={64} className="text-game-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Multiple Choice</h3>
              <p className="text-gray-600 mb-4">Identify objects in images by selecting the correct answer from four options.</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/games/multiple-choice">Play Now</Link>
              </Button>
            </div>

            {/* True or False Game */}
            <div className="bg-game-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-game-primary/10 rounded-md mb-4 flex items-center justify-center">
                <Clock size={64} className="text-game-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">True or False</h3>
              <p className="text-gray-600 mb-4">Decide if the description matches the image shown. Think fast!</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/games/true-false">Play Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-game-accent/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Play Our Games?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brain Training</h3>
              <p className="text-gray-600">Exercise your memory and cognitive skills while having fun.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Challenges</h3>
              <p className="text-gray-600">Each game is designed to be played in just a few minutes.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Learning</h3>
              <p className="text-gray-600">Improve your visual recognition and association skills.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
