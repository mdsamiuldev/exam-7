"use client";
import Link from "next/link";

// বাংলা সংখ্যা কনভার্ট করার ফাংশনটি সরাসরি এখানেই ডিফাইন করা হলো
const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};

export default function ProductCard({ product }) {
  // প্রপার্টিগুলো API বা ডেমো ডাটা অনুযায়ী মানিয়ে নেওয়া হয়েছে
  const { id, slug, emoji, name, unit, price, change, type } = product;

  return (
    <Link href={`/product/${slug || id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
        <div>
          {/* Top Row: Emoji & Change Badge */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-3xl bg-gray-50 p-2 rounded-lg">{emoji || "🛒"}</span>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              type === "up" ? "text-red-600 bg-red-50" : 
              type === "down" ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-100"
            }`}>
              {change || "▬ ০.০%"}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-gray-800 text-lg mb-1">{name || "নামহীন পণ্য"}</h3>
          
          {/* Unit Line */}
          <p className="text-xs text-gray-500 mb-3">{unit || "প্রতি কেজি"}</p>
        </div>

        {/* Price Row */}
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">আজকের দাম:</span>
          <span className="text-green-700 font-bold text-base">
            {convertToBengaliDigits(price || "০")} টাকা
          </span>
        </div>
      </div>
    </Link>
  );
}