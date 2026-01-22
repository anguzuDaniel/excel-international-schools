import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface CampusLocation {
  _key: string;
  campusName: string;
  image?: any; // Sanity images are objects, not strings
  description?: string;
  address?: string;
  email?: string;
  phoneNumbers?: string[];
  mapUrl?: string;
}

interface CampusesProps {
  campuses: {
    locations: CampusLocation[];
  };
}

export default function Campuses({ campuses }: CampusesProps) {
  if (!campuses?.locations) return null;

  return (
    <section className="py-24 bg-white text-slate-900 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Our Campuses
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl text-lg">
              Excel SDA International operates across multiple branches, each providing a 
              world-class learning environment tailored to our students' needs.
            </p>
          </div>
          <div className="h-1 w-24 bg-blue-600 hidden md:block mb-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campuses.locations.map((branch) => (
            <div 
              key={branch._key} 
              className="group relative bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500"
            >
              {/* Branch Image */}
              <div className="relative h-64 w-full bg-slate-200">
                {branch.image ? (
                  <Image 
                    src={urlFor(branch.image).url()} 
                    alt={branch.campusName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <span className="text-4xl mb-2">🏫</span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                
                {/* Badge showing the Address */}
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                    {branch.address || "International"}
                  </span>
                </div>
              </div>

              {/* Branch Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {branch.campusName}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {branch.description || 
                    "Providing excellence in education and character development at our state-of-the-art facility."}
                </p>
                
                <div className="flex flex-col gap-4">
                  {branch.mapUrl && (
                    <a 
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 font-bold text-sm hover:underline transition-all"
                    >
                      <span>View on Google Maps</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}