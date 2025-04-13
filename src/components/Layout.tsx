
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-game-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <footer className="bg-white py-6 text-center text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Fun Games. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
