import Hero from '../components/Hero';
import Section from '../components/Section';
import { Stats } from '../components/Stats';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Gallery from './gallery';
import AdminMessageSectionGrid from '../components/AdminMessageSectionGrid';
import AdminMessage from '../components/AdminMessage';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import Curriculum from '../components/Curriculum';
import MissionAndVision from '../components/MissionAndVision';
import Campuses from '../components/Campuses';
import Transition from '../components/Transition';

// --- Interfaces ---
interface SanityHero {
  title: string;
  subtitle: string;
  text: string;
  logo: any;
  images: { _key: string; asset: { _ref: string } }[];
}

/**
 * The main App component now accepts 'searchParams' from Next.js
 */
export default async function App({ selectedCountry }: { selectedCountry: string }) {
  const activeCountryValue = selectedCountry === 'SS' ? 'south-sudan' : 'uganda';
  
  // 2. Optimized GROQ Query
  const query = `{
    "hero": *[_type == "hero"][0],
    "about": *[_type == "about"][0],
    "curriculum": *[_type == "curriculum"][0],
    "gallery": *[_type == "gallery"][0]{
      "images": images[].asset->url 
    },
    "stats": *[_type == "stats"][0],
    "missionVision": *[_type == "missionVision"][0],
    "adminMessages": *[_type == "adminMessage"] | order(_createdAt asc) {
        _id,
        name,
        role,
        message,
        image 
      },
    "campuses": *[_type == "campuses"][0]{
        _id,
        locations[]{
          _key,
          campusName,
          slug,
          image,
          description,
          country,
          address,
          email,
          phoneNumbers,
          mapUrl 
        }
      }
  }`;

  const data = await client.fetch(query, {}, { cache: 'no-store' });
  const { hero, about, curriculum, stats, missionVision, gallery, adminMessages, campuses } = data;

  // 3. FILTERING: Only show content belonging to the selected country
  const filteredLocations = campuses?.locations?.filter(
    (loc: any) => {
      console.log("Current Loc:", loc.country);
      return loc.country === activeCountryValue;
    }
  ) || [];

  console.log("Active Filter:", activeCountryValue);
  console.log("All Raw Campuses:", campuses?.locations?.map((l: any) => ({ name: l.campusName, country: l.country })));
  console.log("Filtered Result Count:", filteredLocations.length);

  const filteredCampuses = {
    ...campuses,
    locations: filteredLocations
  };

  // 4. Content Customization (Dynamic Titles)
  const countryName = selectedCountry === 'SS' ? 'South Sudan' : 'Uganda';
  const displayTitle = `${hero?.title || 'Excel International School'} - ${countryName}`;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* The Header should use the useSearchParams/useRouter hook to update the URL */}
      <Header schoolName={hero?.title} logo={hero?.logo} />

      <Transition>
        <main>
          {/* HERO: Now shows the specific country name */}
          <Hero
            title={displayTitle}
            subtitle={hero?.subtitle || ""}
            text={hero?.text || ""}
            images={hero?.images?.map((img: any) => urlFor(img).url()) || ['/images/school.jpg']}
          />

          {/* CONTAINER: About & Mission */}
          <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
            <Section title={about?.title || "About Us"}>
              <p className="text-lg text-slate-600 leading-relaxed">
                {about?.content || ''}
              </p>
            </Section>

            <MissionAndVision mission={missionVision?.mission} vision={missionVision?.vision} />
          </div>

          {/* STATS: Full Width */}
          <div className="bg-blue-900 shadow-inner">
            <Stats items={stats?.statItems || []} />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
            {/* CURRICULUM */}
            <Section title={curriculum?.title || "Academic Curriculum"}>
              <Curriculum curriculum={curriculum} />
            </Section>

            {/* ADMIN MESSAGES */}
            <Section title="Leadership Messages">
              <AdminMessageSectionGrid>
                {adminMessages?.map((msg: any) => (
                  <AdminMessage
                    key={msg._id}
                    name={msg.name}
                    role={msg.role}
                    message={msg.message}
                    image={msg.image?.asset ? urlFor(msg.image).url() : '/images/default-admin.jpg'}
                  />
                ))}
              </AdminMessageSectionGrid>
            </Section>

            {/* CAMPUSES: Filtered based on country selection */}
            <Campuses campuses={filteredCampuses} schoolName={hero?.title || ''} />

            {/* GALLERY & CONTACT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-10">
              <div>
                <h2 className="text-4xl font-extrabold mb-8 text-slate-900 tracking-tight">Gallery</h2>
                <Gallery 
                  images={gallery?.images?.map((url: string) => ({ src: url })) || []} 
                />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold mb-8 text-slate-900 tracking-tight">Get in Touch</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </main>
      </Transition>

      {/* Footer also receives filtered campuses for country-specific contact info */}
      <Footer campuses={filteredCampuses} schoolName={hero?.title || ''}/>
    </div>
  );
}