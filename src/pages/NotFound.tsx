
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-8xl font-bold text-game-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-game-primary hover:bg-game-secondary">
          <Link to="/" className="flex items-center">
            <Home className="mr-2" size={18} />
            Back to Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
