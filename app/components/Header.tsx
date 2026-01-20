"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SCHOOL_NAME } from '../public/site';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Fees', href: '/fees' },
    { label: 'E-Learning', href: '/e-learning' },
    { label: 'Gallery', href: '/gallery' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo/School Name */}
        <Link href="/" className="group">
          <h1 className={`font-bold text-xl tracking-tighter transition-colors ${
            scrolled ? 'text-slate-900' : 'text-white'
          }`}>
            {SCHOOL_NAME}
            <span className="block h-0.5 w-0 group-hover:w-full bg-blue-600 transition-all duration-300"></span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-slate-600' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl md:hidden transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button 
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {navLinks.concat({ label: 'Contact', href: '/contact' }).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;