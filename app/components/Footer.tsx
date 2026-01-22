import Link from 'next/link';

export default function Footer({ campuses }: any) {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: School Identity */}
          <div className="space-y-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">
              Merryland High <span className="text-blue-500">Schools</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              A premier private mixed boarding secondary school dedicated to holistic education and excellence since 2001.
            </p>
            {/* Motto Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-slate-200 uppercase tracking-widest">
                Strive to Excel
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About Our History</Link></li>
              <li><Link href="/admissions" className="hover:text-blue-400 transition-colors duration-200">Admissions Portal</Link></li>
              <li><Link href="/curriculum" className="hover:text-blue-400 transition-colors duration-200">UNEB Curriculum</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Column 3 & 4: Campuses (Transparent Style) */}
          {campuses?.locations?.map((loc: any, index: number) => (
            <div key={index} className="space-y-6">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2 flex items-center">
                <span className="w-8 h-[1px] bg-blue-500 mr-2"></span>
                {loc.campusName}
              </h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start group">
                  <span className="mr-3 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity">📍</span>
                  <span className="group-hover:text-slate-200 transition-colors">{loc.address}</span>
                </li>
                
                <li className="flex items-start group">
                  <span className="mr-3 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity">📞</span>
                  <div className="flex flex-col space-y-1">
                    {loc.phoneNumbers?.map((phone: string) => (
                      <span key={phone} className="group-hover:text-slate-200 transition-colors">{phone}</span>
                    ))}
                  </div>
                </li>

                <li className="flex items-start group">
                  <span className="mr-3 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity">📧</span>
                  <span className="group-hover:text-slate-200 transition-colors truncate">{loc.email}</span>
                </li>
              </ul>

                {/* Responsive Map Container */}
              {loc.mapUrl && (
                <div className="mt-6 h-32 w-full rounded-lg overflow-hidden border">
                  <iframe 
                    src={loc.mapUrl} 
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Credits Area */}
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-500 flex flex-col items-center md:items-start gap-1">
            <p>© {new Date().getFullYear()} Merryland High Schools. Built with excellence.</p>
            <p className="italic">"God Perfects"</p>
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