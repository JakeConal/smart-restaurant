export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Smart Restaurant Admin
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Manage your restaurant tables and QR codes
        </p>
        <a
          href="/tables"
          className="inline-block bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] transition-all"
        >
          Go to Tables →
        </a>
      </div>
    </div>
  );
}
