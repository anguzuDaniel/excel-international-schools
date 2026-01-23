import Link from 'next/link';

const formatSchoolName = (name: string) => {
  if (!name) return "";
  const words = name.split(' ');
  if (words.length <= 1) return name;
  const lastWord = words.pop();
  return (
    <>
      {words.join(' ')} <span className="text-blue-500">{lastWord}</span>
    </>
  );
};

export default function Footer({ 
  campuses, 
  schoolName 
}: { 
  campuses: { locations: any[] }; 
  schoolName: string 
}) {
  return (
    <footer className="bg-slate-950 text-slate-4">
      <div className="container mx-auto px-6 py-16">
        
        {/* Main Flex Wrapper - Switched to flex to give more room on Desktop */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Section 1: Identity & Navigation (Takes up 1/3 of space on LG) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-12 lg:w-1/3">
            <div className="space-y-6 flex-1">
              <h3 className="text-white text-2xl font-bold tracking-tight">
                {formatSchoolName(schoolName)}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs">
                A premier institution dedicated to holistic education and excellence, 
                shaping the leaders of tomorrow through faith and knowledge.
              </p>
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-slate-200 uppercase tracking-widest">
                  Strive to Excel
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Navigation</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About History</Link></li>
                <li><Link href="/admissions" className="hover:text-blue-400 transition-colors">Admissions</Link></li>
                <li><Link href="/curriculum" className="hover:text-blue-400 transition-colors">Curriculum</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Section 2: Campus Grid (Takes up the rest of the space) */}
          <div className="lg:w-2/3">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-8 text-center sm:text-left">
              Our Regional Campuses
            </h3>
            {/* This grid will automatically adjust based on how many campuses you have */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-x-12 gap-y-12">
              {campuses?.locations?.map((loc: any, index: number) => (
                <div key={loc._key || index} className="space-y-6 bg-slate-900/30 p-6 rounded-3xl border border-slate-800/50">
                  <h3 className="text-white text-base font-bold flex items-center">
                    <span className="w-6 h-[2px] bg-blue-500 mr-3"></span>
                    {loc.campusName}
                  </h3>
                  
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start group">
                      <span className="mr-3 text-blue-500">📍</span>
                      <span className="group-hover:text-slate-200 transition-colors">{loc.address}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 text-blue-500">📞</span>
                      <div className="flex flex-col">
                        {loc.phoneNumbers?.map((phone: string) => (
                          <span key={phone} className="group-hover:text-slate-200 transition-colors">{phone}</span>
                        ))}
                      </div>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 text-blue-500">📧</span>
                      <span className="group-hover:text-slate-200 transition-colors truncate">{loc.email}</span>
                    </li>
                  </ul>

                  {loc.mapUrl && (
                    <div className="mt-4 h-28 w-full rounded-2xl overflow-hidden border border-slate-800">
                      <iframe 
                        src={loc.mapUrl} 
                        width="100%" 
                        height="100%" 
                        className="border-0 grayscale contrast-125 opacity-40 hover:opacity-100 transition-all duration-500"
                        loading="lazy" 
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} {schoolName}. All Rights Reserved.</p>
            <p className="italic mt-1 text-slate-600">"The Best for Excellence"</p>
          </div>
          
          <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}