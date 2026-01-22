import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface CampusLocation {
  _key: string;
  campusName: string;
  image?: any;
  description?: string;
  address?: string;
  email?: string;
  phoneNumbers?: string[];
  mapUrl?: string;
  slug?: {
    current: string;
  };
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
          {campuses.locations.map((branch) => {
            // Determine the link path - fallback to '#' if slug is missing
            const href = branch.slug?.current ? `/campus/${branch.slug.current}` : "#";

            return (
              <Link 
                key={branch._key} 
                href={href}
                className="group relative bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col"
              >
                {/* Branch Image */}
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
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
                  
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {branch.address || "International"}
                    </span>
                  </div>
                </div>

                {/* Branch Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors flex justify-between items-center">
                    {branch.campusName}
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      →
                    </span>
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {branch.description || 
                      "Providing excellence in education and character development at our state-of-the-art facility."}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <span className="text-blue-600 font-bold text-sm">
                      View Campus Details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>        
      </div>
    </section>
  );
}