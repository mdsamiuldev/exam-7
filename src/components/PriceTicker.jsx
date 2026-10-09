"use client";

// বাংলা সংখ্যা কনভার্ট করার ফাংশনটি সরাসরি এখানেই ডিফাইন করা হলো
const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};

export default function PriceTicker() {
  const tickerItems = [
    { emoji: "🧅", name: "পেঁয়াজ", price: "১২০", unit: "প্রতি কেজি", change: "▲ ২.১%", type: "up" },
    { emoji: "🥔", name: "আলু", price: "৫০", unit: "প্রতি কেজি", change: "▼ ১.৫%", type: "down" },
    { emoji: "🐟", name: "রুই মাছ", price: "৩৫০", unit: "প্রতি কেজি", change: "▲ ৩.০%", type: "up" },
    { emoji: "🥚", name: "ডিম", price: "১৪০", unit: "প্রতি ডজন", change: "▬ ০.০%", type: "flat" },
  ];

  return (
    <div className="bg-green-800 text-white py-2 overflow-hidden whitespace-nowrap shadow-inner flex items-center">
      <div className="bg-green-900 px-4 py-1 text-xs font-bold uppercase tracking-wider z-10 mx-2 rounded">
        বাজারের হালচাল:
      </div>
      <div className="inline-block animate-marquee flex gap-8 items-center text-sm">
        {tickerItems.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-2 bg-green-700/60 px-3 py-1 rounded-full">
            <span>{item.emoji}</span>
            <span className="font-semibold">{item.name}:</span>
            <span>{convertToBengaliDigits(item.price)} টাকা / {item.unit}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              item.type === "up" ? "text-red-300 bg-red-900/40" : 
              item.type === "down" ? "text-green-300 bg-green-900/40" : "text-gray-300 bg-gray-700"
            }`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}