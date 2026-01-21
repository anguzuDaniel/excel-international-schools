import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, 
  token: process.env.SANITY_API_WRITE_TOKEN, // Use a token with WRITE permissions
  apiVersion: '2024-01-01',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newApplication = {
      _type: 'application',
      ...body,
      // Add this line to capture the exact moment of submission
      submittedAt: new Date().toISOString(), 
    };

    const result = await writeClient.create(newApplication);

    return NextResponse.json({ message: "Success", id: result._id }, { status: 200 });
  } catch (error) {
    console.error("Sanity Error:", error);
    return NextResponse.json({ message: "Error saving application" }, { status: 500 });
  }
}