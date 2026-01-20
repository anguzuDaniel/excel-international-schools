"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      {/* Animated Logo Container */}
      <div className="relative mb-8">
        {/* Soft Glow Effect */}
        <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full animate-pulse" />
        
        <div className="relative flex items-center justify-center">
          {/* Main Logo Text */}
          <h2 className="text-white text-3xl font-black tracking-tighter transition-all">
            E<span className="text-blue-600 animate-pulse">I</span>S
          </h2>
          
          {/* Rotating Ring around Logo */}
          <div className="absolute w-20 h-20 border-2 border-transparent border-t-blue-600 rounded-full animate-spin [animation-duration:1.5s]" />
        </div>
      </div>

      {/* Modern 3-Dot Animation */}
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2.5 h-2.5 bg-blue-600/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2.5 h-2.5 bg-blue-600/30 rounded-full animate-bounce" />
      </div>
    </div>
  );
}