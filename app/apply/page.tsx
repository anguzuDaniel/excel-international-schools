import { client } from '@/sanity/lib/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationForm from '../components/ApplicationForm';
import SubPageLayout from '../components/SubPageLayout';

export default async function ApplyPage() {
  // We fetch the Hero title for the school name and Contact for branch locations
  const query = `{
    "hero": *[_type == "hero"][0]{ title },
    "contact": *[_type == "contact"][0]{
        _id,
        locations[]{
          campusName,
          address,
          email,
          phoneNumbers,
          mapUrl // <--- THIS IS THE KEY
        }
      },
    "aboutData": *[_type == "aboutPage"][0],
  }`;
  
  const data = await client.fetch(query);

    const { hero, contact, aboutData } = data;

  return (
    <SubPageLayout title="Admission Application" subtitle={`Official enrollment portal for ${hero.title}`} heroImage={aboutData.hero?.backgroundImage} logo={hero.logo}>
                <div className="pb-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT SIDE: DYNAMIC SIDEBAR */}
            <aside className="w-full lg:w-1/3 space-y-6">
              <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-10 text-white sticky top-32 shadow-2xl shadow-blue-200">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Start the Journey — Apply Online
                </h2>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                  Take your first step to becoming part of the cohort of innovators and leaders at <span className="font-bold underline decoration-blue-400">{hero.title}</span>.
                </p>
                
                <div className="space-y-6">
                  <Step number="1" text="Complete and submit an online application" active />
                  <Step number="2" text="An admissions associate will get in touch" />
                  <Step number="3" text="You will be invited for a school tour & assessment" />
                  <Step number="4" text="You will get feedback on your child's performance" />
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE: THE FORM */}
            <div className="flex-1">
              {/* Form receives the dynamic branch list and name */}
              <ApplicationForm schoolName={hero.schoolName} locations={data.contact?.locations} />
            </div>

          </div>
        </div>
    </SubPageLayout>
  );
}

function Step({ number, text, active }: { number: string, text: string, active?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${active ? 'bg-white text-blue-600 border-white' : 'border-blue-300 text-blue-300'}`}>
        {number}
      </div>
      <p className={`text-sm ${active ? 'font-bold text-white' : 'text-blue-200'}`}>{text}</p>
    </div>
  );
}