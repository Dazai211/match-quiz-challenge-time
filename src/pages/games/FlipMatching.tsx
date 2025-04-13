
import Layout from '../../components/Layout';
import FlipMatchingGame from '../../components/games/FlipMatchingGame';

const FlipMatching = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Flip <span className="text-game-primary">Matching</span> Game
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Test your memory by finding matching pairs of cards. Click on cards to reveal them and find their matching pairs. The game ends when all pairs are matched.
          </p>
          
          <FlipMatchingGame />
        </div>
      </div>
    </Layout>
  );
};

export default FlipMatching;
