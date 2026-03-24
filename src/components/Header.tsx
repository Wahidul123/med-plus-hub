import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/services', label: 'Services' },
    { path: '/appointment', label: 'Book Appointment' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Emergency Banner */}
      <div className="w-full bg-destructive text-destructive-foreground py-3">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 flex items-center justify-center gap-3">
          <Phone className="w-5 h-5" />
          <span className="font-paragraph text-sm font-medium">
            Emergency Hotline: +1 (555) 123-4567 - Available 24/7
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="font-heading text-3xl text-primary">
                Sameeha Medical Centre
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph text-base transition-colors ${
                    isActive(link.path)
                      ? 'text-primary font-medium'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-secondary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-6 border-t border-soft-grey">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-paragraph text-base py-2 transition-colors ${
                      isActive(link.path)
                        ? 'text-primary font-medium'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
