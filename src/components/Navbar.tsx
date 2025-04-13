
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-game-primary flex items-center gap-2">
          <span className="bg-game-primary text-white px-2 py-1 rounded-md">Fun</span>
          <span>Games</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-game-primary transition-colors">Home</Link>
          <div className="relative group">
            <Link to="/games" className="font-medium text-gray-700 hover:text-game-primary transition-colors">
              Games
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
              <Link to="/games/flip-matching" className="block px-4 py-2 text-sm text-gray-700 hover:bg-game-accent hover:text-game-primary">
                Flip Matching
              </Link>
              <Link to="/games/multiple-choice" className="block px-4 py-2 text-sm text-gray-700 hover:bg-game-accent hover:text-game-primary">
                Multiple Choice
              </Link>
              <Link to="/games/true-false" className="block px-4 py-2 text-sm text-gray-700 hover:bg-game-accent hover:text-game-primary">
                True or False
              </Link>
            </div>
          </div>
          <Link to="/about" className="font-medium text-gray-700 hover:text-game-primary transition-colors">About Us</Link>
          <Link to="/contact" className="font-medium text-gray-700 hover:text-game-primary transition-colors">Contact Us</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 animate-fade-in">
          <div className="flex flex-col space-y-6 text-center">
            <Link to="/" onClick={closeMenu} className="font-medium text-xl text-gray-700 hover:text-game-primary py-2">
              Home
            </Link>
            <div className="flex flex-col space-y-2">
              <Link to="/games" onClick={closeMenu} className="font-medium text-xl text-gray-700 hover:text-game-primary py-2">
                Games
              </Link>
              <div className="flex flex-col space-y-2 pl-4">
                <Link to="/games/flip-matching" onClick={closeMenu} className="font-medium text-gray-700 hover:text-game-primary py-2">
                  Flip Matching
                </Link>
                <Link to="/games/multiple-choice" onClick={closeMenu} className="font-medium text-gray-700 hover:text-game-primary py-2">
                  Multiple Choice
                </Link>
                <Link to="/games/true-false" onClick={closeMenu} className="font-medium text-gray-700 hover:text-game-primary py-2">
                  True or False
                </Link>
              </div>
            </div>
            <Link to="/about" onClick={closeMenu} className="font-medium text-xl text-gray-700 hover:text-game-primary py-2">
              About Us
            </Link>
            <Link to="/contact" onClick={closeMenu} className="font-medium text-xl text-gray-700 hover:text-game-primary py-2">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
