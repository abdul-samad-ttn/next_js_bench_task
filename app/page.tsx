export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <p className="text-gray-500">Dummy API Key: {apiKey}</p>
    </div>
  );
}
