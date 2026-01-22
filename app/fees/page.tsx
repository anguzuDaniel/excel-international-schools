import { client } from '@/sanity/lib/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import SubPageLayout from '../components/SubPageLayout';

export default async function FeesPage() {
  const query = `{
    "hero": *[_type == "hero"][0],
    "fees": *[_type == "fees"] | order(gradeLevel asc) {
      ...,
      "pdfUrl": pdfDownload.asset->url
    },
    "aboutData": *[_type == "aboutPage"][0],
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
  
  const { hero, fees, aboutData, campuses } = await client.fetch(query);

  return (
    <SubPageLayout title="Fees Structure" subtitle="Academic Year 2026" heroImage={aboutData.hero?.backgroundImage} logo={hero.logo}>
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-4">
          {fees.map((item: any) => (
            <div 
              key={item._id} 
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                   {item.campus || "Campus"}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {item.gradeLevel}
                </h2>
              </div>

              <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-4">
                <div className="text-right mr-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Per Term</p>
                  <div className="flex items-baseline justify-end gap-1">
                    {/* Added Currency Display */}
                    <span className="text-xs font-bold text-blue-600">
                        {item.pricing?.currency || 'UGX'}
                    </span>
                    <p className="text-2xl font-black text-slate-900">
                        {item.pricing?.termly || "TBD"}
                    </p>
                  </div>
                </div>

                {item.pdfUrl && (
                  <a 
                    href={`${item.pdfUrl}?dl=${item.campus}-${item.gradeLevel}-Fees.pdf`}
                    className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    DOWNLOAD PDF
                  </a>
                )}

                <a 
                  href="/apply" 
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors"
                >
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-16">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Payment Methods</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We accept Bank Transfers, Direct Deposits, and Mobile Money. Cash is not accepted at any campus to ensure financial security.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Refund Policy</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Caution fees are refundable upon completion or withdrawal, provided all school property is returned in good condition.
            </p>
          </div>
        </div> 
      </section>
    </SubPageLayout>
  );
}