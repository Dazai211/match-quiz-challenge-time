
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
            About <span className="text-game-primary">Fun Games</span>
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Fun Games, we believe that learning and cognitive development should be enjoyable. 
              Our mission is to create engaging, accessible games that challenge your mind while 
              providing entertainment.
            </p>
            <p className="text-gray-600">
              Each of our games is designed to target different cognitive skills - from memory and 
              pattern recognition to quick decision-making and visual processing. We've crafted these 
              experiences to be both fun and beneficial for players of all ages.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
            <p className="text-gray-600 mb-6">
              We are a small team of developers, designers, and educators passionate about creating 
              meaningful digital experiences. With backgrounds spanning cognitive psychology, game design, 
              and web development, we bring a diverse set of skills to our work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-game-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Alex Johnson</h3>
                <p className="text-gray-600 text-sm">Lead Developer</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-game-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Maya Rodriguez</h3>
                <p className="text-gray-600 text-sm">Game Designer</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-game-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Sam Lee</h3>
                <p className="text-gray-600 text-sm">UX Researcher</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Approach</h2>
            <p className="text-gray-600 mb-6">
              We believe in creating games that are:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-game-primary/20 text-game-primary p-1 rounded-full mr-3 mt-1">•</span>
                <span><strong>Accessible</strong> - Simple controls and intuitive interfaces for players of all abilities</span>
              </li>
              <li className="flex items-start">
                <span className="bg-game-primary/20 text-game-primary p-1 rounded-full mr-3 mt-1">•</span>
                <span><strong>Educational</strong> - Designed to exercise specific cognitive skills</span>
              </li>
              <li className="flex items-start">
                <span className="bg-game-primary/20 text-game-primary p-1 rounded-full mr-3 mt-1">•</span>
                <span><strong>Engaging</strong> - Fun enough to keep you coming back for more</span>
              </li>
              <li className="flex items-start">
                <span className="bg-game-primary/20 text-game-primary p-1 rounded-full mr-3 mt-1">•</span>
                <span><strong>Challenging</strong> - Providing the right level of difficulty to keep you motivated</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
