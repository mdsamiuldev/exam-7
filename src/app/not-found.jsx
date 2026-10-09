import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <span className="text-7xl mb-4">⚠️</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">পাতাটি পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-6">আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ঠিকানায় প্রবেশ করেছেন।</p>
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}