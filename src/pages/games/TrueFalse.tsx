
import Layout from '../../components/Layout';
import TrueFalseGame from '../../components/games/TrueFalseGame';

const TrueFalse = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            True or <span className="text-game-primary">False</span> Game
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Decide if the description matches the image shown. You have 10 seconds to make your decision, and your score is based on how quickly you answer correctly.
          </p>
          
          <TrueFalseGame />
        </div>
      </div>
    </Layout>
  );
};

export default TrueFalse;
