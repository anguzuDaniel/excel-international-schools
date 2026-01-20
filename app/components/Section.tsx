import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
}

export default function Section({ title, children, className = "", alternate = false }: SectionProps) {
  return (
    <section>
      
      {/* Background Architectural Grid (Subtle UI Design) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className=" relative z-10">
        <div className="flex flex-col gap-12 lg:gap-20">
          
          {/* Left Column: The Design Accent & Title */}
          <div className="md:w-1/3 flex flex-col items-start">
            {/* Design Element: Double Offset Squares */}
            <div className="relative w-12 h-12 mb-8">
              <div className="absolute top-0 left-0 w-8 h-8 bg-blue-600 rounded-lg rotate-12 opacity-20 animate-pulse"></div>
              <div className="absolute top-1 left-1 w-8 h-8 bg-blue-600 rounded-lg shadow-lg"></div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {title}
            </h2>
            
            {/* The "Anchor" line */}
            <div className="mt-8 h-1.5 w-16 bg-blue-600 rounded-full" />
          </div>

          {/* Right Column: The Content */}
          <div>
            <div className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}