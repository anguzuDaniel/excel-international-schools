import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import SubPageLayout from '../components/SubPageLayout';
import MissionAndVision from '../components/MissionAndVision';
import Campuses from '../components/Campuses';

export default async function AboutPage() {
  // We fetch both the about page content and campuses info for the footer
  const query = `{
    "hero": *[_type == "hero"][0],
    "aboutData": *[_type == "aboutPage"][0],
    "missionVision": *[_type == "missionVision"][0],
    "campuses": *[_type == "campuses"][0]{
      _id,
      locations[]{
        _key,
        campusName,
        image,        // Added to fetch the new image
        description,  // Added to fetch the new text
        address,
        email,
        phoneNumbers,
        mapUrl 
      }
    }
  }`;
  
  const { hero, aboutData, missionVision, campuses } = await client.fetch(query);

  console.log("Contact:");

  // SAFEGUARD: If the document is not found, show a helpful message instead of crashing
  if (!aboutData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header schoolName={hero.title} logo={hero.logo} />
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Content Coming Soon</h2>
            <p className="text-slate-500 mt-2">Please publish the "About Page" document in Sanity Studio.</p>
          </div>
        </div>
        <Footer campuses={campuses} />
      </div>
    );
  }

  return (
    <SubPageLayout title={aboutData.hero?.subheading} subtitle={aboutData.subtitle} heroImage={aboutData.hero?.backgroundImage} logo={hero.logo}>
        {/* 2. OUR STORY SECTION (Nova Pioneer Style) */}
        <section className="pb-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              {aboutData.story?.image ? (
                <Image 
                  src={urlFor(aboutData.story.image).url()} 
                  alt="Our Journey" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400">Add Story Image in Sanity</span>
                </div>
              )}
            </div>
            
            {/* Text Column */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-widest">
                Our Origin
              </div>
              <div className="prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 text-slate-500">
                {aboutData.story?.content && (
                  <PortableText value={aboutData.story.content} />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 px-6">
            <div className='max-w-7xl mx-auto'>
                <MissionAndVision mission={missionVision?.mission} vision={missionVision?.vision} />
            </div>
        </section>

        {/* 3. THE 3 Cs / CORE PILLARS */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Core Pillars</h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                We are guided by three fundamental principles that shape every student's experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aboutData.pillars?.map((pillar: any, i: number) => (
                <div 
                  key={i} 
                  className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 
                    ${pillar.colorTheme === 'blue' ? 'bg-blue-50' : 
                      pillar.colorTheme === 'amber' ? 'bg-amber-50' : 
                      pillar.colorTheme === 'emerald' ? 'bg-emerald-50' : 'bg-rose-50'}`}
                  >
                    {pillar.icon || "✨"}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. OUR CAMPUSES SECTION */}
        <Campuses campuses={campuses} />
    </SubPageLayout>
  );
}