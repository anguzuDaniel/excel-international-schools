"use client";
import Image from 'next/image';
import { useState } from 'react';

interface AdminMessageProps {
  name: string;
  role: string;
  message: string;
  image: string;
}

export default function AdminMessage({ name, role, message, image }: AdminMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongMessage = message.length > 250;

  return (
    <div className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full">
      {/* Quote Icon Decor */}
      <div className="text-blue-100 group-hover:text-blue-500 transition-colors duration-300 mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21L14.017 18C14.017 16.895 14.912 16 16.017 16H19.017V14H15.017C13.912 14 13.017 13.105 13.017 12V6C13.017 4.895 13.912 4 15.017 4H20.017C21.122 4 22.017 4.895 22.017 6V12C22.017 13.845 20.803 15.405 19.1 15.95L20.017 21H14.017ZM2.017 21L2.017 18C2.017 16.895 2.912 16 4.017 16H7.017V14H3.017C1.912 14 1.017 13.105 1.017 12V6C1.017 4.895 1.912 4 3.017 4H8.017C9.122 4 10.017 4.895 10.017 6V12C10.017 13.845 8.803 15.405 7.1 15.95L8.017 21H2.017Z" />
        </svg>
      </div>

      {/* Message Content */}
      <div className="flex-grow">
        <p className={`text-slate-600 italic leading-relaxed text-base mb-6 ${!isExpanded && isLongMessage ? 'line-clamp-4' : ''}`}>
          {message}
        </p>
        
        {isLongMessage && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Read Full Message'}
          </button>
        )}
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
        <div className="relative w-14 h-14 overflow-hidden rounded-full ring-2 ring-slate-50 group-hover:ring-blue-100 transition-all">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{name}</h3>
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-wide">{role}</p>
        </div>
      </div>
    </div>
  );
}