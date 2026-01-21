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
import contact from '@/sanity/schemaTypes/contact';
import Curriculum from '../components/Curriculum';
import MissionAndVision from '../components/MissionAndVision';

interface HomePageProps {
  hero?: SanityHero | null;
  about?: SanitySection | null;
  curriculum?: SanitySection | null;
  mission?: SanitySection | null;
  vision?: SanitySection | null;
  adminMessages?: SanityAdminMessage[];
}

interface SanityHero {
  title: string;
  subtitle: string;
  text: string;
  images: { _key: string; asset: { _ref: string } }[];
}

interface SanitySection {
  content: string;
}

interface SanityAdminMessage {
  _id: string;
  name: string;
  role: string;
  message: string;
  image?: any;
}

export default async function App() {
  const query = `{
    "hero": *[_type == "hero"][0],
    "about": *[_type == "about"][0],
    "curriculum": *[_type == "curriculum"][0],
    "gallery": *[_type == "gallery"][0]{
      "images": images[].asset->url // This turns the references into an array of URL strings
    },
    "stats": *[_type == "stats"][0],
    "missionVision": *[_type == "missionVision"][0],
    "adminMessages": *[_type == "adminMessage"] | order(_createdAt asc) {
        _id,
        name,
        role,
        message,
        image // Make sure this is explicitly included
      },
    "contact": *[_type == "contact"][0]{
        _id,
        locations[]{
          campusName,
          address,
          email,
          phoneNumbers,
          mapUrl // <--- THIS IS THE KEY
        }
      }
  }`;

  const data = await client.fetch(query);
  const { hero, about, curriculum, stats, missionVision, gallery, adminMessages, contact } = data;

  console.log("Admin Meassages: ", adminMessages);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header schoolName={hero.title} logo={hero?.logo} />

      <main>
        {/* FULL WIDTH: Hero */}
        <Hero
          title={hero?.title || ""}
          subtitle={hero?.subtitle || ""}
          text={hero?.text || ""}
          images={hero?.images?.map((img: any) => urlFor(img).url()) || ['/images/school.jpg']}
        />

        {/* CONTAINER: About & Mission (Vertical Padding for breathing room) */}
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
          
          {/* About Section */}
          <Section title={about?.title || "About Us"}>
            <div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {about?.content || ''}
              </p>
            </div>
          </Section>

          {/* Mission & Vision Section */}
          <MissionAndVision mission={missionVision?.mission} vision={missionVision?.vision} />
        </div>

        {/* FULL WIDTH: Statistics (Breaking the container for visual impact) */}
        <div className="bg-blue-900 shadow-inner">
          <Stats items={stats?.statItems || []} />
        </div>

        {/* CONTAINER: Academic & Leadership */}
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          
          {/* Curriculum Section */}
          <Section title={curriculum?.title || "Academic Curriculum"}>
            <Curriculum curriculum={curriculum} />
          </Section>

          {/* Admin Messages Section */}
          <Section title="Leadership Messages">
            <AdminMessageSectionGrid>
              {adminMessages?.map((msg: any) => (
                <AdminMessage
                  key={msg._id}
                  name={msg.name}
                  role={msg.role}
                  message={msg.message}
                  // This check ensures we only call urlFor if there is an actual asset
                  image={msg.image?.asset ? urlFor(msg.image).url() : '/images/default-admin.jpg'}
                />
              ))}
            </AdminMessageSectionGrid>
          </Section>

          {/* Gallery & Contact Split (Side-by-Side looks better on wide screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-10">
            <div>
              <h2 className="text-4xl font-extrabold mb-8 text-slate-900 tracking-tight">Gallery</h2>
              <Gallery 
                  images={gallery?.images?.map((img: any) => ({
                    src: urlFor(img).url() // This maps the Sanity asset to the 'src' key your component expects
                  })) || []} 
                />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold mb-8 text-slate-900 tracking-tight">Get in Touch</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer contact={contact}/>
    </div>
  );
}