"use client";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};

// ক্যাটাগরি অনুযায়ী নাম ও ইমোজি ম্যাপিং
const categoryMeta = {
  rice: { name: "চাল", emoji: "🍚", desc: "প্রতি চালের আজকের দাম ও পরিবর্তন" },
  dal: { name: "ডাল", emoji: "🥣", desc: "মসুর, মুগ, ছোলা ও অন্যান্য ডালের আজকের দাম" },
  oil: { name: "তেল", emoji: "🛢️", desc: "সয়াবিন, পাম ও সরিষার তেলের আজকের বাজার দর" },
  vegetables: { name: "সবজি", emoji: "🥦", desc: "আলু, পেঁয়াজ, বেগুন ও শাকসবজির আজকের দাম" },
  fish: { name: "মাছ", emoji: "🐟", desc: "রুই, কাতলা, ইলিশ ও অন্যান্য মাছের আজকের দর" },
  meat: { name: "মাংস", emoji: "🥩", desc: "গরু, খাসি, মুরগি ও হাঁসের মাংসের আজকের দাম" },
  "egg-milk": { name: "ডিম-দুধ", emoji: "🥛", desc: "ডিম, দুধ, ঘি ও মাখনের আজকের বাজার দর" },
  spices: { name: "মসলা", emoji: "🌶️", desc: "হলুদ, মরিচ, আদা, রসুন ও মসলার আজকের দাম" },
};

// সমস্ত পণ্যের ডেটাসেট (ক্যাটাগরি অনুযায়ী ভাগ করা)
const allCategoryProducts = [
  // চাল (rice)
  { name: "স্বর্ণা চাল", unit: "প্রতি কেজি", price: "১৪৮", change: "▲ ২.৫%", emoji: "🍚", slug: "swarna-rice", category: "rice" },
  { name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: "৯৯", change: "▼ ২.৯%", emoji: "🍚", slug: "miniket-rice", category: "rice" },
  { name: "নাজির চাল", unit: "প্রতি কেজি", price: "৯৪", change: "▬ ০.০%", emoji: "🍚", slug: "nazir-rice", category: "rice" },
  { name: "বাটিম সাইজ চাল", unit: "প্রতি কেজি", price: "৬৬", change: "▲ ৩.১%", emoji: "🍚", slug: "batim-rice", category: "rice" },

  // ডাল (dal)
  { name: "মসুর ডাল", unit: "প্রতি কেজি", price: "১৪২", change: "▲ ২.৯%", emoji: "🥣", slug: "masoor-dal", category: "dal" },
  { name: "মুগ ডাল", unit: "প্রতি কেজি", price: "১৩৫", change: "▬ ০.০%", emoji: "🥣", slug: "moog-dal", category: "dal" },
  { name: "ছোলা", unit: "প্রতি কেজি", price: "১২০", change: "▼ ২.৪%", emoji: "🥣", slug: "chola", category: "dal" },
  { name: "আয়ন ডাল (নম্রসিল)", unit: "প্রতি কেজি", price: "১৪৬", change: "▲ ২.৫%", emoji: "🥣", slug: "ayon-dal", category: "dal" },

  // তেল (oil)
  { name: "সয়াবিন তেল", unit: "প্রতি লিটার", price: "১৯২", change: "▲ ২.৫%", emoji: "🛢️", slug: "soybean-oil", category: "oil" },
  { name: "পাম তেল", unit: "প্রতি লিটার", price: "১৯৮", change: "▼ ২.০%", emoji: "🛢️", slug: "palm-oil", category: "oil" },
  { name: "ঘানি ভাঙা সরিষার তেল", unit: "প্রতি লিটার", price: "২১৫", change: "▲ ১.৯%", emoji: "🛢️", slug: "mustard-oil", category: "oil" },

  // সবজি (vegetables)
  { name: "আলু", unit: "প্রতি কেজি", price: "৩০", change: "▼ ৬.২%", emoji: "🥔", slug: "potato", category: "vegetables" },
  { name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৪৮", change: "▲ ১২.৫%", emoji: "🧅", slug: "onion", category: "vegetables" },
  { name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: "৯২", change: "▼ ১২.৫%", emoji: "🌶️", slug: "green-chili", category: "vegetables" },
  { name: "বেগুন", unit: "প্রতি কেজি", price: "৪৪", change: "▲ ৪.৪%", emoji: "🍆", slug: "brinjal", category: "vegetables" },
  { name: "উচ্ছে", unit: "প্রতি কেজি", price: "৩৮", change: "– ০.০%", emoji: "🥒", slug: "ucche", category: "vegetables" },

  // মাছ (fish)
  { name: "রুই মাছ", unit: "প্রতি কেজি", price: "৪৬", change: "▲ ৪.৫%", emoji: "🐟", slug: "rui-fish", category: "fish" },
  { name: "তেলাপিয়া", unit: "প্রতি কেজি", price: "৩৬", change: "– ০.০%", emoji: "🐟", slug: "tilapia", category: "fish" },
  { name: "ইলিশ মাছ", unit: "প্রতি কেজি", price: "১,৪৫০", change: "▲ ৩.৩%", emoji: "🐟", slug: "ilish", category: "fish" },
  { name: "কাতলা মাছ", unit: "প্রতি কেজি", price: "৪৩", change: "▼ ০.৪%", emoji: "🐟", slug: "katla-fish", category: "fish" },
  { name: "চিংড়ি মাছ (আলাদা)", unit: "প্রতি কেজি", price: "৬৭০", change: "▲ ০.৫%", emoji: "🦐", slug: "chingri", category: "fish" },

  // মাংস (meat)
  { name: "মুরগির মাংস", unit: "প্রতি কেজি", price: "২২৫", change: "▲ ১.০%", emoji: "🍗", slug: "chicken", category: "meat" },
  { name: "গরুর মাংস", unit: "প্রতি কেজি", price: "৯৫০", change: "▼ ১.২%", emoji: "🥩", slug: "beef", category: "meat" },
  { name: "খাসির মাংস", unit: "প্রতি কেজি", price: "১,২৯০", change: "▼ ০.০%", emoji: "🥩", slug: "mutton", category: "meat" },
  { name: "হাঁসের মাংস", unit: "প্রতি কেজি", price: "২৮৫", change: "▼ ০.৫%", emoji: "🦆", slug: "duck-meat", category: "meat" },

  // ডিম-দুধ (egg-milk)
  { name: "ডিম", unit: "প্রতি ডজন", price: "১৪৮", change: "▲ ৩.৯%", emoji: "🥚", slug: "egg", category: "egg-milk" },
  { name: "দুধ", unit: "প্রতি লিটার", price: "১০২", change: "▲ ১.০%", emoji: "🥛", slug: "milk", category: "egg-milk" },
  { name: "ঘি", unit: "প্রতি লিটার", price: "৯২", change: "– ০.৪%", emoji: "🧈", slug: "ghee", category: "egg-milk" },
  { name: "মাখন (১০০ গ্রাম)", unit: "প্রতি পিস", price: "১৪৫", change: "▲ ৩.৯%", emoji: "🧈", slug: "butter", category: "egg-milk" },

  // মসলা (spices)
  { name: "হলুদ", unit: "প্রতি কেজি", price: "৯৫", change: "▲ ৫.৫%", emoji: "🟡", slug: "turmeric", category: "spices" },
  { name: "আদা", unit: "প্রতি কেজি", price: "৮৫", change: "▲ ৯.০%", emoji: "🫚", slug: "ginger", category: "spices" },
  { name: "রসুন", unit: "প্রতি কেজি", price: "১২৫", change: "▼ ৭.৪%", emoji: "🧄", slug: "garlic", category: "spices" },
];

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug || "rice";

  // ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredProducts = allCategoryProducts.filter((item) => item.category === slug);
  const currentMeta = categoryMeta[slug] || { name: "পণ্য", emoji: "📦", desc: "বাজারের পণ্যের তালিকা" };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full space-y-6">
        <Link href="/" className="inline-flex items-center text-xs text-green-700 font-medium hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Category Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex items-center gap-4">
          <span className="text-5xl bg-gray-50 p-4 rounded-2xl">{currentMeta.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentMeta.name}</h1>
            <p className="text-xs text-gray-500 mt-1">{currentMeta.desc}</p>
          </div>
        </div>

        {/* Filter & Sorting bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200/80">
          <span className="text-xs text-gray-500">মোট {convertToBengaliDigits(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">সাজান:</span>
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50">
              <option>ডিফল্ট</option>
              <option>কম দাম</option>
              <option>বেশি দাম</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((item, index) => (
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
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-200 text-gray-500 text-sm">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </div>
        )}
      </main>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">লোড হচ্ছে...</div>}>
      <CategoryContent />
    </Suspense>
  );
}