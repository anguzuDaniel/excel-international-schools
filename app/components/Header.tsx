"use client";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header({ schoolName, logo } : { schoolName: string; logo: string}) {
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
    // { label: 'E-Learning', href: '/e-learning' },
    // { label: 'Gallery', href: '/gallery' },
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
        <div className="flex items-center group cursor-pointer">
          {/* Logo Container */}
          {logo && (
            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img 
                src={urlFor(logo).url()} 
                alt={schoolName || "School Logo"} 
                className="h-10 md:h-14 w-auto object-contain" 
              />
            </div>
          )}

          {/* School Name Container */}
          <div className={`flex flex-col justify-center transition-colors duration-300 ${
              logo ? 'ml-3 border-l border-slate-200 pl-3' : ''
            }`}>
              <span className={`text-lg md:text-xl font-black leading-tight tracking-tighter uppercase italic transition-colors duration-300 ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}>
                {schoolName?.split(' ')[0] || "Excel"}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-[0.2em] leading-none">
                {schoolName?.split(' ').slice(1).join(' ') || "International"}
              </span>
            </div>
        </div>

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
            href="#contact" 
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