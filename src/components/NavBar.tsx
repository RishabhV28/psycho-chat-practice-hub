import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MenuIcon, X } from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-psycho-500" />
              <Link to="/" className="ml-2 text-xl font-bold text-psycho-700">
                Psyclone
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-psycho-500 text-sm font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/scenarios"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-psycho-300 hover:text-gray-700"
              >
                Scenarios
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-psycho-300 hover:text-gray-700"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="default" className="bg-psycho-500 hover:bg-psycho-600">
              Sign In
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="p-2">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-white z-10 absolute w-full shadow-md">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-psycho-500 text-base font-medium text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/scenarios"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:border-psycho-300 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Scenarios
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:border-psycho-300 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-4 px-3">
              <Button variant="default" className="w-full bg-psycho-500 hover:bg-psycho-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
