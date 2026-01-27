import App from "./pages/page";

// 1. Make the function 'async'
export default async function Home(props: {
  searchParams: Promise<{ country?: string }>;
}) {
  // 2. Await the searchParams promise (This is the fix for your error)
  const resolvedParams = await props.searchParams;
  
  // 3. Extract and format the code
  const countryCode = (resolvedParams?.country || 'UG').toUpperCase();

  console.log("Selected Country Code:", countryCode);

  // 4. Pass the cleaned code to your App component
  // Note: App needs to be updated to accept this prop
  return (
    <App selectedCountry={countryCode} />
  );
}