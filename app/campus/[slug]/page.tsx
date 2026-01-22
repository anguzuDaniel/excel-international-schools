import SubPageLayout from '@/app/components/SubPageLayout';
import { client } from '@/sanity/lib/client';

export default async function CampusDetails({ params }: { params: { slug: string } }) {
  // Fetch the specific location from the campuses array that matches the slug
  const query = `*[_type == "campuses"][0].locations[slug.current == $slug][0]`;
  const branch = await client.fetch(query, { slug: params.slug });

  if (!branch) return <div>Campus not found</div>;

  return (
    <SubPageLayout 
      title={branch.campusName} 
      subtitle={branch.address}
      heroImage={branch.image}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">About this Campus</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          {branch.description}
        </p>
        
        {/* You can add more sections here like: */}
        {/* - Campus specific Gallery */}
        {/* - List of Teachers for this branch */}
        {/* - Specific Admission details for this branch */}
      </div>
    </SubPageLayout>
  );
}