export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page not found</p>
        <a
          href="/"
          className="inline-block text-orange-600 hover:text-orange-700 font-medium"
        >
          Return to home
        </a>
      </div>
    </div>
  );
}
