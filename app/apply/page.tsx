import { client } from '@/sanity/lib/client';
import ApplicationForm from '../components/ApplicationForm';
import SubPageLayout from '../components/SubPageLayout';

export default async function ApplyPage(props: {
  searchParams: Promise<{ country?: string }>;
}) {
  // 1. Await search params
  const resolvedParams = await props.searchParams;
  const countryCode = (resolvedParams?.country || 'UG').toUpperCase();
  const activeCountryValue = countryCode === 'SS' ? 'south-sudan' : 'uganda';

  // We fetch the Hero title for the school name and Contact for branch locations
  const query = `{
    "hero": *[_type == "hero"][0]{ title },
    "CampusData": *[_type == "campuses"][0]{
        _id,
        locations[]{
          campusName,
          address,
          email,
          country,
          phoneNumbers,
          mapUrl // <--- THIS IS THE KEY
        }
      },
    "aboutData": *[_type == "aboutPage"][0],
  }`;
  
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  const { hero, CampusData, aboutData } = data;

  const filteredLocations = CampusData?.locations?.filter(
    (loc: any) => {
      console.log("Checking loc:", loc.campusName, "Country:", loc.country);
      
      return loc.country === activeCountryValue;
    }
  ) || [];

  console.log("Active Country Value:", activeCountryValue);
  console.log("Country Code:", countryCode);
  console.log("Filtered Locations:", filteredLocations);

  return (
    <SubPageLayout 
      title="Admission Application" 
      subtitle={`Official enrollment portal for ${hero.title}`} 
      heroImage={aboutData.hero?.backgroundImage} 
      logo={hero.logo}
    >
      {/* 1. Added text-slate-900 here to ensure all text inside is dark/readable */}
      <div className="pb-24 px-6 max-w-7xl mx-auto text-slate-900">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="w-full lg:w-1/3 space-y-6">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-10 text-white sticky top-32 shadow-2xl shadow-blue-200">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Start the Journey — Apply Online
              </h2>
              {/* 2. Changed text-blue-100 to text-white for better clarity */}
              <p className="text-white/90 text-sm mb-8 leading-relaxed">
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

          <div className="flex-1">
            {/* 3. The form background is white, so we ensure the form text is dark */}
            <div className="bg-white rounded-3xl">
              <ApplicationForm schoolName={hero.title} locations={filteredLocations} />
            </div>
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