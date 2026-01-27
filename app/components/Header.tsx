"use client";
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the SVG Flags for guaranteed visibility
const FlagUganda = () => (
  <svg width="20" height="20" viewBox="0 0 512 512" className="rounded-full shadow-sm">
    <path fill="#000" d="M0 0h512v85.3H0zM0 341.3h512V426.7H0zM0 170.7h512v85.3H0z"/>
    <path fill="#FFCE31" d="M0 85.3h512v85.4H0zM0 426.7h512V512H0z"/>
    <path fill="#D80027" d="M0 256h512v85.3H0z"/>
    <circle fill="#FFF" cx="256" cy="256" r="64"/>
    <circle fill="#000" cx="256" cy="256" r="48"/>
  </svg>
);

const FlagSouthSudan = () => (
  <svg width="20" height="20" viewBox="0 0 512 512" className="rounded-full shadow-sm">
    <path fill="#000" d="M0 0h512v142.2H0z"/>
    <path fill="#FFF" d="M0 142.2h512v28.5H0zM0 341.3h512v28.5H0z"/>
    <path fill="#408000" d="M0 369.8h512V512H0z"/>
    <path fill="#D80027" d="M0 170.7h512v170.6H0z"/>
    <path fill="#0052B4" d="m0 0 256 256L0 512z"/>
    <path fill="#FFCE31" d="M54.5 256 122 305l-25.7-79 67.5-49h-83.4L54.5 98l-25.8 79h-83.4l67.5 49-25.7 79z"/>
  </svg>
);

export default function Header({ schoolName, logo }: { schoolName: string; logo: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'UG' | 'SS'>('UG');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countries = [
    { code: 'UG' as const, icon: <FlagUganda />, label: 'Uganda' },
    { code: 'SS' as const, icon: <FlagSouthSudan />, label: 'S. Sudan' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Brand */}
        <div className="flex items-center group cursor-pointer">
          {logo && (
            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img src={urlFor(logo).url()} alt={schoolName} className="h-10 md:h-14 w-auto object-contain" />
            </div>
          )}
          <div className={`flex flex-col justify-center ml-3 border-l border-slate-200 pl-3`}>
              <span className={`text-lg md:text-xl font-black uppercase italic ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                {schoolName?.split(' ')[0] || "Excel"}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest leading-none">
                {schoolName?.split(' ').slice(1).join(' ') || "International"}
              </span>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-6">
          <div className={`flex items-center p-1 rounded-full border ${scrolled ? 'bg-slate-100 border-slate-200' : 'bg-white/10 border-white/20 backdrop-blur-md'}`}>
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  selectedCountry === c.code ? 'bg-white text-slate-900 shadow-md scale-105' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {c.icon}
                {selectedCountry === c.code && <span className="text-[10px] font-black uppercase tracking-widest">{c.label}</span>}
              </button>
            ))}
          </div>

          <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => setSelectedCountry(selectedCountry === 'UG' ? 'SS' : 'UG')}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${scrolled ? 'bg-slate-100 border-slate-200' : 'bg-white/10 border-white/20'}`}
          >
            {selectedCountry === 'UG' ? <FlagUganda /> : <FlagSouthSudan />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-xl ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}