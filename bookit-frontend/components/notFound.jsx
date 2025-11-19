import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-5">
      <h1 className="text-5xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page Not Found</p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
