"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    text: string;
    images?: string[];
    interval?: number;
}

export default function Hero({
    title,
    subtitle,
    text,
    images = [],
    interval = 6000, // Slightly longer for better readability
}: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <section className="relative h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
            {/* Background Image Slider with Ken Burns Effect */}
            {images.map((src, index) => (
                <div 
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Image
                        src={src}
                        alt="Merryland High School"
                        fill
                        priority={index === 0}
                        className={`object-cover transition-transform duration-[6000ms] ease-linear ${
                            index === currentIndex ? 'scale-110' : 'scale-100'
                        }`}
                    />
                </div>
            ))}

            {/* Advanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950" />

            {/* Content */}
            <div className="relative z-10 px-6 max-w-4xl space-y-6">
                <div className="space-y-2">
                    <span className="inline-block text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-2 animate-fade-in">
                        Welcome to Excellence
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        {title}
                    </h1>
                </div>
                
                <h2 className="text-xl md:text-2xl font-light text-slate-200 max-w-2xl mx-auto leading-relaxed">
                    <span className="text-blue-400 font-semibold">{subtitle}</span> — {text}
                </h2>

                <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                {/* Primary Action: Link to Apply Page */}
                <Link href="/apply">
                    <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
                    Begin Application
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="out 17l5-5-5-5M19 12H5" />
                    </svg>
                    </button>
                </Link>

                {/* Secondary Action: Virtual Tour */}
                <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-10 py-4 rounded-full font-bold transition-all active:scale-95">
                    Virtual Tour
                </button>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 flex gap-2 z-20">
                {images.map((_, i) => (
                    <div 
                        key={i}
                        className={`h-1 transition-all duration-500 rounded-full ${
                            i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30'
                        }`}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 animate-bounce opacity-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}