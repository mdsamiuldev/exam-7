"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};

export default function HomePage() {
 const [currentDate, setCurrentDate] = useState(() => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  });

  const increasedItems = [
    { name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৪৮", change: "▲ ১২.৫%", emoji: "🧅", slug: "onion" },
    { name: "আদা", unit: "প্রতি কেজি", price: "৮৫", change: "▲ ৯.০%", emoji: "🫚", slug: "ginger" },
    { name: "বেগুন", unit: "প্রতি কেজি", price: "৪৪", change: "▲ ৪.৪%", emoji: "🍆", slug: "brinjal" },
    { name: "রুই মাছ", unit: "প্রতি কেজি", price: "৪৬", change: "▲ ৪.৫%", emoji: "🐟", slug: "rui-fish" },
    { name: "ডিম", unit: "প্রতি ডজন", price: "১৪৮", change: "▲ ৩.৯%", emoji: "🥚", slug: "egg" },
    { name: "মাখন (১০০ গ্রাম)", unit: "প্রতি পিস", price: "১৪৫", change: "▲ ৩.৯%", emoji: "🧈", slug: "butter" },
  ];

  const decreasedItems = [
    { name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "৯২", change: "▼ ১২.৫%", emoji: "🌶️", slug: "green-chili" },
    { name: "রসুন", unit: "প্রতি কেজি", price: "১২৫", change: "▼ ৭.৪%", emoji: "🧄", slug: "garlic" },
    { name: "আলু", unit: "প্রতি কেজি", price: "৩০", change: "▼ ৬.২%", emoji: "🥔", slug: "potato" },
    { name: "কাতলা মাছ", unit: "প্রতি কেজি", price: "৪৩", change: "▼ ৪.৪%", emoji: "🐟", slug: "katla-fish" },
    { name: "হাঁসের মাংস", unit: "প্রতি কেজি", price: "২৮৫", change: "▼ ০.৪%", emoji: "🦆", slug: "duck-meat" },
    { name: "খাসির মাংস", unit: "প্রতি কেজি", price: "১,২৯০", change: "▼ ০.০%", emoji: "🥩", slug: "mutton" },
  ];

  // ৩০টি পণ্যের সম্পূর্ণ তালিকা (All Products)
  const allProducts = [
    { name: "স্বর্ণা চাল", unit: "প্রতি কেজি", price: "১৪৮", change: "▲ ২.৫%", emoji: "🍚", slug: "swarna-rice" },
    { name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: "৯৯", change: "▼ ২.৯%", emoji: "🍚", slug: "miniket-rice" },
    { name: "নাজির চাল", unit: "প্রতি কেজি", price: "৯৪", change: "▬ ০.০%", emoji: "🍚", slug: "nazir-rice" },
    { name: "বাটিম সাইজ চাল", unit: "প্রতি কেজি", price: "৬৬", change: "▲ ৩.১%", emoji: "🍚", slug: "batim-rice" },
    { name: "মসুর ডাল", unit: "প্রতি কেজি", price: "১৪২", change: "▲ ২.৯%", emoji: "🥣", slug: "masoor-dal" },
    { name: "মুগ ডাল", unit: "প্রতি কেজি", price: "১৩৫", change: "▬ ০.০%", emoji: "🥣", slug: "moog-dal" },
    { name: "ছোলা", unit: "প্রতি কেজি", price: "১২০", change: "▼ ২.৪%", emoji: "🥣", slug: "chola" },
    { name: "আয়ন ডাল (নম্রসিল)", unit: "প্রতি কেজি", price: "১৪৬", change: "▲ ২.৫%", emoji: "🥣", slug: "ayon-dal" },
    { name: "সয়াবিন তেল", unit: "প্রতি লিটার", price: "১৯২", change: "▲ ২.৫%", emoji: "🛢️", slug: "soybean-oil" },
    { name: "পাম তেল", unit: "প্রতি লিটার", price: "১৯৮", change: "▼ ২.০%", emoji: "🛢️", slug: "palm-oil" },
    { name: "ঘানি ভাঙা সরিষার তেল", unit: "প্রতি লিটার", price: "২১৫", change: "▲ ১.৯%", emoji: "🛢️", slug: "mustard-oil" },
    { name: "আলু", unit: "প্রতি কেজি", price: "৩০", change: "▼ ৬.২%", emoji: "🥔", slug: "potato" },
    { name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৪৮", change: "▲ ১২.৫%", emoji: "🧅", slug: "onion" },
    { name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "৯২", change: "▼ ১২.৫%", emoji: "🌶️", slug: "green-chili" },
    { name: "বেগুন", unit: "প্রতি কেজি", price: "৪৪", change: "▲ ৪.৪%", emoji: "🍆", slug: "brinjal" },
    { name: "উচ্ছে", unit: "প্রতি কেজি", price: "৩৮", change: "– ০.০%", emoji: "🥒", slug: "ucche" },
    { name: "রুই মাছ", unit: "প্রতি কেজি", price: "৪৬", change: "▲ ৪.৫%", emoji: "🐟", slug: "rui-fish" },
    { name: "তেলাপিয়া", unit: "প্রতি কেজি", price: "৩৬", change: "– ০.০%", emoji: "🐟", slug: "tilapia" },
    { name: "ইলিশ মাছ", unit: "প্রতি কেজি", price: "১,৪৫০", change: "▲ ৩.৩%", emoji: "🐟", slug: "ilish" },
    { name: "কাতলা মাছ", unit: "প্রতি কেজি", price: "৪৩", change: "▼ ০.৪%", emoji: "🐟", slug: "katla-fish" },
    { name: "চিংড়ি মাছ (আলাদা)", unit: "প্রতি কেজি", price: "৬৭০", change: "▲ ০.৫%", emoji: "🦐", slug: "chingri" },
    { name: "মুরগির মাংস", unit: "প্রতি কেজি", price: "২২৫", change: "▲ ১.০%", emoji: "🍗", slug: "chicken" },
    { name: "গরুর মাংস", unit: "প্রতি কেজি", price: "৯৫০", change: "▼ ১.২%", emoji: "🥩", slug: "beef" },
    { name: "খাসির মাংস", unit: "প্রতি কেজি", price: "১,২৯০", change: "▼ ০.০%", emoji: "🥩", slug: "mutton" },
    { name: "হাঁসের মাংস", unit: "প্রতি কেজি", price: "২৮৫", change: "▼ ০.৫%", emoji: "🦆", slug: "duck-meat" },
    { name: "ডিম", unit: "প্রতি ডজন", price: "১৪৮", change: "▲ ৩.৯%", emoji: "🥚", slug: "egg" },
    { name: "দুধ", unit: "প্রতি লিটার", price: "১০২", change: "▲ ১.০%", emoji: "🥛", slug: "milk" },
    { name: "ঘি", unit: "প্রতি লিটার", price: "৯২", change: "– ০.৪%", emoji: "🧈", slug: "ghee" },
    { name: "মাখন (১০০ গ্রাম)", unit: "প্রতি পিস", price: "১৪৫", change: "▲ ৩.৯%", emoji: "🧈", slug: "butter" },
    { name: "হলুদ", unit: "প্রতি কেজি", price: "৯৫", change: "▲ ৫.৫%", emoji: "🟡", slug: "turmeric" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full space-y-10">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
              {currentDate || "শুক্রবার, ৯ অক্টোবর, ২০২৬"}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div>
              <Link
                href="/category/rice"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-sm transition"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center justify-center min-w-[200px] h-[180px]">
            <span className="text-7xl">🧺</span>
          </div>
        </div>

        {/* আজ দাম বেড়েছে Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
            <span>▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedItems.map((item, index) => (
              <Link
                key={index}
                href={`/product/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-600 shadow-sm transition group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl bg-gray-50 p-2.5 rounded-xl">{item.emoji}</span>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-gray-400 block">আজকের দাম</span>
                        <span className="text-lg font-bold text-gray-900">{convertToBengaliDigits(item.price)} টাকা</span>
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">{item.change}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* আজ দাম কমেছে Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-green-600 flex items-center gap-2">
            <span>▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedItems.map((item, index) => (
              <Link
                key={index}
                href={`/product/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-600 shadow-sm transition group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl bg-gray-50 p-2.5 rounded-xl">{item.emoji}</span>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-gray-400 block">আজকের দাম</span>
                        <span className="text-lg font-bold text-gray-900">{convertToBengaliDigits(item.price)} টাকা</span>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{item.change}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* সব পণ্য Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500">মোট ৩০টি পণ্য দেখানো হচ্ছে</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProducts.map((item, index) => (
              <Link
                key={index}
                href={`/product/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-600 shadow-sm transition group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl bg-gray-50 p-2.5 rounded-xl">{item.emoji}</span>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-gray-400 block">আজকের দাম</span>
                        <span className="text-lg font-bold text-gray-900">{convertToBengaliDigits(item.price)} টাকা</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.change.includes('▲') ? 'text-red-600 bg-red-50' : item.change.includes('▼') ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}