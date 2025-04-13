
import Layout from '../../components/Layout';
import MultipleChoiceGame from '../../components/games/MultipleChoiceGame';

const MultipleChoice = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Multiple <span className="text-game-primary">Choice</span> Game
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Identify objects in images by selecting the correct answer from four options. You have 10 seconds per question, and your score is based on how quickly you answer correctly.
          </p>
          
          <MultipleChoiceGame />
        </div>
      </div>
    </Layout>
  );
};

export default MultipleChoice;
