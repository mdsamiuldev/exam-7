import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold tracking-wider text-green-700 bg-green-200/60 px-3 py-1 rounded-full">
            সঠিক বাজার দর, সাশ্রয়ী কেনাকাটা
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম জানুন এক নজরে
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            কাঁচা বাজার থেকে শুরু করে চাল, ডাল ও মশলার হালনাগাদ দাম এখন আপনার হাতের মুঠোয়। ঘরে বসেই তুলনা করুন আজকের বাজার দর।
          </p>
          <div className="pt-2">
            <a
              href="#sob-ponno"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
            >
              সব পণ্য দেখুন ↓
            </a>
          </div>
        </div>
{/* Right Banner Image / Illustration */}
<div className="flex justify-center">
  <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
    <img 
      src="public/images/hero-image.png"
      alt="Bazar Hero Image" 
      className="w-full h-full object-cover" 
    />
  </div>
</div>
        
      </div>
    </section>
  );
}