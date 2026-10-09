"use client";
import { useState, useEffect, Suspense, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};

// কমন বাজারগুলোর টেমপ্লেট
const sharedBazaarTemplates = [
  { bazaar: "মাট বাজার", division: "ময়মনসিংহ", minOffset: -5, maxOffset: 2 },
  { bazaar: "সদর বাজার", division: "রাজশাহী", minOffset: -4, maxOffset: 4 },
  { bazaar: "বাজারহাট", division: "খুলনা", minOffset: -4, maxOffset: 5 },
  { bazaar: "রানাঘাট বাজার", division: "রাজশাহী", minOffset: -4, maxOffset: 3 },
  { bazaar: "ৌর বাজার", division: "ময়মনসিংহ", minOffset: -4, maxOffset: 7 },
  { bazaar: "আমতলী বাজার", division: "চট্টগ্রাম", minOffset: -3, maxOffset: 7 },
  { bazaar: "ভবনাপট বাজার", division: "খুলনা", minOffset: -2, maxOffset: 7 },
  { bazaar: "ভৌড়া বাজার", division: "সিলেট", minOffset: -1, maxOffset: 8 },
  { bazaar: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", minOffset: 0, maxOffset: 8 },
  { bazaar: "ভৌদ্মার বাজার", division: "চট্টগ্রাম", minOffset: -1, maxOffset: 9 },
  { bazaar: "আমবাজার", division: "সিলেট", minOffset: 0, maxOffset: 9 },
  { bazaar: "কারওয়ান বাজার", division: "ঢাকা", minOffset: -2, maxOffset: 9 }
];

// স্ক্রিনশটের হুবহু ৩০টি পণ্যের সঠিক নাম, একক এবং আজকের আসল দাম
const rawProducts = {
  "swarna-chal": { name: "স্বর্ণাছড়ি চাল", category: "চাল", unit: "প্রতি কেজি", price: 148, change: "▲ ২.১%", icon: "🍚" },
  "miniket-chal": { name: "মিনিকেট চাল", category: "চাল", unit: "প্রতি কেজি", price: 99, change: "▼ ২.৪%", icon: "🍚" },
  "nazir-chal": { name: "নাজির চাল", category: "চাল", unit: "প্রতি কেজি", price: 94, change: "— ০.০%", icon: "🍚" },
  "bhatim-chal": { name: "বাটিম সাইজ চাল", category: "চাল", unit: "প্রতি কেজি", price: 66, change: "▲ ৭.৮%", icon: "🍚" },
  "masoor-dal": { name: "মসুর ডাল", category: "ডাল", unit: "প্রতি কেজি", price: 142, change: "▲ ২.৪%", icon: "🫘" },
  "moong-dal": { name: "মুগ ডাল", category: "ডাল", unit: "প্রতি কেজি", price: 135, change: "— ০.০%", icon: "🫘" },
  "chhola": { name: "ছোলা", category: "ডাল", unit: "প্রতি কেজি", price: 120, change: "▼ ২.৪%", icon: "🫘" },
  "khesari-dal": { name: "আইরন ডাল (খোসাসিলা)", category: "ডাল", unit: "প্রতি কেজি", price: 146, change: "▲ ২.৪%", icon: "🫘" },
  "mustard-oil": { name: "সরিষার তেল", category: "তেল", unit: "প্রতি লিটার", price: 192, change: "▲ ২.৫%", icon: "🛢️" },
  "palm-oil": { name: "পাম তেল", category: "তেল", unit: "প্রতি কেজি", price: 168, change: "▼ ২.৩%", icon: "🛢️" },
  "ghani-mustard-oil": { name: "ঘানি ভাঙা সরিষার তেল", category: "তেল", unit: "প্রতি লিটার", price: 215, change: "▲ ২.৪%", icon: "🛢️" },
  "potato": { name: "আলু", category: "সবজি", unit: "প্রতি কেজি", price: 30, change: "▼ ৬.২%", icon: "🥔" },
  "onion": { name: "পেঁয়াজ", category: "মসলা", unit: "প্রতি কেজি", price: 54, change: "▲ ৫২.৫%", icon: "🧅" },
  "green-chili": { name: "কাঁচামরিচ", category: "সবজি", unit: "প্রতি কেজি", price: 92, change: "▼ ১২.৪%", icon: "🌶️" },
  "brinjal": { name: "বেগুন", category: "সবজি", unit: "প্রতি কেজি", price: 88, change: "▲ ৪.৮%", icon: "🍆" },
  "teors": { name: "ঢেঁড়স", category: "সবজি", unit: "প্রতি কেজি", price: 38, change: "— ০.০%", icon: "🥒" },
  "ruhi-fish": { name: "রুই মাছ", category: "মাছ", unit: "প্রতি কেজি", price: 46, change: "▲ ৪.০%", icon: "🐟" },
  "tilapia-fish": { name: "তেলাপিয়া", category: "মাছ", unit: "প্রতি কেজি", price: 36, change: "— ০.০%", icon: "🐟" },
  "hilsa-fish": { name: "ইলিশ মাছ", category: "মাছ", unit: "প্রতি কেজি", price: 1850, change: "▲ ৭.৪%", icon: "🐟" },
  "katla-fish": { name: "কাতলা মাছ", category: "মাছ", unit: "প্রতি কেজি", price: 43, change: "▼ ৪.৪%", icon: "🐟" },
  "shrimp-fish": { name: "চিংড়ি মাছ (খোলা)", category: "মাছ", unit: "প্রতি কেজি", price: 370, change: "▲ ৬.৫%", icon: "🦐" },
  "chicken-meat": { name: "মুরগির মাংস", category: "মাংস", unit: "প্রতি কেজি", price: 225, change: "▼ ১.০%", icon: "🍗" },
  "beef": { name: "গরুর মাংস", category: "মাংস", unit: "প্রতি কেজি", price: 950, change: "▼ ১.২%", icon: "🥩" },
  "mutton-meat": { name: "খাসির মাংস", category: "মাংস", unit: "প্রতি কেজি", price: 1290, change: "— ০.০%", icon: "🥩" },
  "duck-meat": { name: "হাঁসের মাংস", category: "মাংস", unit: "প্রতি কেজি", price: 285, change: "▼ ৩.৪%", icon: "🍗" },
  "egg": { name: "ডিম", category: "আমিষ", unit: "প্রতি ডজন", price: 154, change: "▲ ৩.৯%", icon: "🥚" },
  "milk": { name: "দুধ", category: "ডেয়ারি", unit: "প্রতি লিটার", price: 102, change: "▲ ১.০%", icon: "🥛" },
  "doi": { name: "দই", category: "ডেয়ারি", unit: "প্রতি লিটার", price: 92, change: "— ০.০%", icon: "🥣" },
  "butter": { name: "মাখন (১০০ গ্রাম)", category: "ডেয়ারি", unit: "প্রতি পিস", price: 145, change: "▲ ১০.৪%", icon: "🧈" },
  "ada": { name: "আদা", category: "মসলা", unit: "প্রতি কেজি", price: 85, change: "▲ ৯.০%", icon: "🫚" },
  "garlic": { name: "রসুন", category: "মসলা", unit: "প্রতি কেজি", price: 125, change: "▼ ৭.৪%", icon: "🧄" },
  "chili-powder": { name: "মরিচ গুঁড়া", category: "মসলা", unit: "প্রতি কেজি", price: 245, change: "▼ ২.০%", icon: "🌶️" },
  "coriander-powder": { name: "ধনেপাতা গুঁড়া", category: "মসলা", unit: "প্রতি কেজি", price: 265, change: "— ০.০%", icon: "🌿" }
};

const getProductWithBazaars = (slug) => {
  const base = rawProducts[slug] || rawProducts["swarna-chal"];
  
  const bazaarList = sharedBazaarTemplates.map((t, idx) => {
    const minVal = base.price + t.minOffset;
    const maxVal = base.price + t.maxOffset;
    const avgVal = Math.round((minVal + maxVal) / 2);
    return {
      bazaar: t.bazaar,
      division: t.division,
      min: `${minVal} টাকা`,
      max: `${maxVal} টাকা`,
      avg: `${avgVal} টাকা`
    };
  });

  return {
    ...base,
    subText: "আজকের বাজার দর আপডেট করা হয়েছে",
    todayPrice: base.price.toString(),
    minPrice: `${base.price - 4} টাকা`,
    minBazaar: "সবচেয়ে কম দামের বাজার",
    maxPrice: `${base.price + 6} টাকা`,
    maxBazaar: "সবচেয়ে বেশি দামের বাজার",
    avgPrice: `${base.price} টাকা`,
    avgSub: "প্রতি এককের হিসাবে",
    bazaarList
  };
};
function ProductDetailContent({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("bazar_user");
    }
    return false;
  });

  useEffect(() => {
    const user = localStorage.getItem("bazar_user");
    if (!user) {
      toast.error("পণ্যের বিস্তারিত দেখতে হলে প্রথমে সাইন ইন বা লগইন করতে হবে!");
      router.push("/signin");
    }
  }, [router]);


  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500 bg-gray-50">
        যাচাই করা হচ্ছে...
      </div>
    );
  }

  const productInfo = getProductWithBazaars(slug);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full space-y-6">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:underline">হোম</Link> &gt; 
          <span className="text-gray-800 font-semibold">{productInfo.name}</span>
        </div>

        {/* Top Product Hero */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl bg-gray-50 p-4 rounded-2xl">{productInfo.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{productInfo.name}</h1>
              <p className="text-xs text-gray-500 mt-1">{productInfo.unit}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{productInfo.subText}</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl text-center min-w-[180px]">
            <span className="text-xs text-gray-400 block">আজকের দাম</span>
            <span className="text-2xl font-extrabold text-gray-900">{convertToBengaliDigits(productInfo.todayPrice)}</span>
            <span className="text-xs text-gray-500 block mt-0.5">টাকা / একক</span>
            <span className="text-xs font-bold text-red-600 mt-1 inline-block">{productInfo.change}</span>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-xs text-gray-400 block mb-1">সর্বনিম্ন দাম</span>
            <div className="text-xl font-bold text-green-600">{productInfo.minPrice}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">{productInfo.minBazaar}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-xs text-gray-400 block mb-1">সর্বাধিক দাম</span>
            <div className="text-xl font-bold text-red-600">{productInfo.maxPrice}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">{productInfo.maxBazaar}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-xs text-gray-400 block mb-1">গড় দাম</span>
            <div className="text-xl font-bold text-blue-600">{productInfo.avgPrice}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">{productInfo.avgSub}</span>
          </div>
        </div>

        {/* Bazaar Table */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 space-y-4">
          <h2 className="text-base font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {productInfo.bazaarList.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-medium text-gray-900">{item.bazaar}</td>
                    <td className="py-3.5 px-4 text-gray-500">{item.division}</td>
                    <td className="py-3.5 px-4">{item.min}</td>
                    <td className="py-3.5 px-4">{item.max}</td>
                    <td className="py-3.5 px-4 font-semibold text-green-700">{item.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">লোড হচ্ছে...</div>}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}