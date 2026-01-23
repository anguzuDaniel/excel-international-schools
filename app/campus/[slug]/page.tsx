import SubPageLayout from '@/app/components/SubPageLayout';
import { client } from '@/sanity/lib/client';
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default async function CampusDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Optimized query to fetch campus data
  const query = `*[_type == "campuses"][0].locations[slug.current == $slug][0]`;
  const branch = await client.fetch(query, { slug: slug });

  if (!branch) return (
    <div className="py-40 text-center">
      <h2 className="text-2xl font-bold">Campus not found</h2>
      <Link href="/" className="text-blue-600 underline">Return home</Link>
    </div>
  );

  return (
    <SubPageLayout 
      title={branch.campusName} 
      subtitle={`Excel SDA International — ${branch.address || 'Branch'}`}
      heroImage={branch.image}
    >
      {/* 1. About Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Active Branch</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              A Legacy of <br /> 
              <span className="text-blue-600">Excellence.</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-2xl text-slate-700 leading-snug font-medium mb-10">
              {branch.description || "Shaping the leaders of tomorrow through rigorous academic standards and character building."}
            </p>
            <div className="grid sm:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Direct Communication</h4>
                <div className="space-y-3">
                  {branch.phoneNumbers?.map((n: string) => (
                    <a key={n} href={`tel:${n}`} className="block text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">{n}</a>
                  ))}
                  <p className="text-slate-600 flex items-center gap-2 text-lg font-medium">📧 {branch.email}</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Visit Us</h4>
                <Link href="/contact" className="group text-blue-600 font-bold flex items-center gap-2 text-lg">
                  Schedule a Tour <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <p className="text-sm text-slate-500 mt-2">Explore our modern laboratories and serene environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Campus Life Gallery (Bento Grid) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Campus Gallery</h2>
            <p className="text-slate-500 mt-2">A glimpse into our world-class facilities and student life.</p>
          </div>
          <div className="h-px flex-grow bg-slate-100 mx-8 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          {branch.campusImages?.map((img: any, index: number) => (
            <div 
              key={index} 
              className={`relative rounded-[2rem] overflow-hidden group border border-slate-100 
                ${index === 0 ? 'col-span-2 row-span-2' : ''} 
                ${index === 3 ? 'col-span-2' : ''}`}
            >
              <Image 
                src={urlFor(img).url()} 
                alt={img.caption || branch.campusName} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              {img.caption && (
                <div className="absolute bottom-4 left-6 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Map Section */}
      {branch.mapUrl && (
        <section className="relative h-[500px] w-full border-y border-slate-100">
          <iframe src={branch.mapUrl} width="100%" height="100%" className="border-0 grayscale contrast-125 opacity-80" allowFullScreen />
          <div className="absolute bottom-10 left-6 lg:left-24 bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl max-w-sm border border-white/20">
            <div className="flex items-start gap-4 text-slate-900">
              <span className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">📍</span>
              <div>
                <h3 className="text-xl font-bold">Our Address</h3>
                <p className="text-slate-600 text-sm mt-1">{branch.address}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Elite CTA */}
      <section className="max-w-7xl mx-auto px-6 pt-24">
        <div className="relative bg-slate-950 rounded-[3rem] p-12 lg:p-20 overflow-hidden shadow-2xl text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Empower Your Child's <span className="text-blue-500">Future.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
              Applications for <span className="text-white">{branch.campusName}</span> are now open. Secure a place in an environment built for excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/apply" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-900/20">
                Begin Application
              </Link>
              <Link href="/contact" className="px-12 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-2xl font-bold hover:bg-white/20 transition-all">
                Talk to Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}