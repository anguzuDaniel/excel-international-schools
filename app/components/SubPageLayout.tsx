import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Header from './Header';
import Footer from './Footer';
import Image from 'next/image';
import { ReactNode } from 'react';

interface SubPageProps {
  title: string;
  subtitle?: string;
  heroImage?: any;
  logo?: any;
  children: ReactNode; // This is where your unique page content goes
}

export default async function SubPageLayout({ title, subtitle, heroImage, logo, children }: SubPageProps) {
  // Common data needed for every subpage (Header/Footer info)
  const commonQuery = `{
    "hero": *[_type == "hero"][0],
    "contact": *[_type == "contact"][0]
  }`;
  
  const { hero, contact } = await client.fetch(commonQuery);

  console.log(hero);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header schoolName={hero?.title} logo={hero?.logo} />

      <main className="flex-grow">
        {/* REUSABLE HERO */}
        <section className="relative h-[50vh] flex items-center justify-center bg-slate-900 overflow-hidden">
          {heroImage && (
            <Image 
              src={urlFor(heroImage).url()} 
              alt={title}
              fill
              priority
              className="object-cover opacity-50"
            />
          )}
          <div className="relative z-10 max-w-5xl text-center px-6">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-blue-100 mt-4 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-slate-950" />
        </section>


        {/* UNIQUE PAGE CONTENT */}
        <div className="py-16 md:py-24">
          {children}
        </div>
      </main>

      <Footer contact={contact} />
    </div>
  );
}