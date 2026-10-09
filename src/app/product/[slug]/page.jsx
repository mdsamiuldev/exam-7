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

function ProductDetailContent({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  
  // সেফলি স্টেট ডিক্লেয়ারেশন (এখানে কোনো সিনট্যাক্স বা লাল দাগ থাকবে না)
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500 bg-gray-50">
        যাচাই করা হচ্ছে...
      </div>
    );
  }

  const productInfo = {
    name: "বাটিম সাইজ চাল",
    category: "চাল",
    unit: "প্রতি কেজি - চাল",
    subText: "গতকালকের তুলনায় আজ দাম কমেছে - ২ টাকা",
    todayPrice: "৬৬",
    change: "▲ ৩.১%",
    minPrice: "৫১ টাকা",
    minBazaar: "সবচেয়ে কম দামের বাজার",
    maxPrice: "৭৩ টাকা",
    maxBazaar: "সবচেয়ে বেশি দামের বাজার",
    avgPrice: "৬৬ টাকা",
    avgSub: "প্রতি কেজি-এর हिसाबে",
    bazaarList: [
      { bazaar: "মাট বাজার", division: "ময়মনসিংহ", min: "৫৯ টাকা", max: "৬২ টাকা", avg: "৬২ টাকা" },
      { bazaar: "সদর বাজার", division: "রাজশাহী", min: "৬০ টাকা", max: "৬৬ টাকা", avg: "৬৩ টাকা" },
      { bazaar: "বাজারহাট", division: "খুলনা", min: "৬০ টাকা", max: "৬৭ টাকা", avg: "৬৩.৫০ টাকা" },
      { bazaar: "রানাঘাট বাজার", division: "রাজশাহী", min: "৬০ টাকা", max: "৬৪ টাকা", avg: "৬৪ টাকা" },
      { bazaar: "ৌর বাজার", division: "ময়মনসিংহ", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৪.৫০ টাকা" },
      { bazaar: "আমতলী বাজার", division: "চট্টগ্রাম", min: "৬১ টাকা", max: "৬৯ টাকা", avg: "৬৫ টাকা" },
      { bazaar: "ভবনাপট বাজার", division: "খুলনা", min: "৬২ টাকা", max: "৬৯ টাকা", avg: "৬৫.৫০ টাকা" },
      { bazaar: "ভৌড়া বাজার", division: "সিলেট", min: "৬৩ টাকা", max: "৭০ টাকা", avg: "৬৭ টাকা" },
      { bazaar: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: "৬৪ টাকা", max: "৭০ টাকা", avg: "৬৭.৫০ টাকা" },
      { bazaar: "ভৌদ্মার বাজার", division: "চট্টগ্রাম", min: "৬৩ টাকা", max: "৭১ টাকা", avg: "৬৮ টাকা" },
      { bazaar: "আমবাজার", division: "সিলেট", min: "৬৪ টাকা", max: "৭১ টাকা", avg: "৬৮.৫০ টাকা" },
      { bazaar: "কারওয়ান বাজার", division: "ঢাকা", min: "৬২ টাকা", max: "৭১ টাকা", avg: "৬৯ টাকা" },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full space-y-6">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:underline">হোম</Link> &gt; 
          <Link href="/category/rice" className="hover:underline">চাল</Link> &gt; 
          <span className="text-gray-800 font-semibold">{productInfo.name}</span>
        </div>

        {/* Top Product Hero */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl bg-gray-50 p-4 rounded-2xl">🍚</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{productInfo.name}</h1>
              <p className="text-xs text-gray-500 mt-1">{productInfo.unit}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{productInfo.subText}</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl text-center min-w-[180px]">
            <span className="text-xs text-gray-400 block">আজকের দাম</span>
            <span className="text-2xl font-extrabold text-gray-900">{convertToBengaliDigits(productInfo.todayPrice)}</span>
            <span className="text-xs text-gray-500 block mt-0.5">টাকা / কেজি</span>
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