"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // সরাসরি লোকালস্টোরেজ থেকে ইউজার লোড করা
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("bazar_user")) : null;

  const tickerItems = [
    { name: "স্বর্ণা চাল", price: "৪৮ টাকা/কেজি", change: "▲ ২.৫%" },
    { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", change: "▼ ২.৯%" },
    { name: "বাটিম সাইজ চাল", price: "৬৬ টাকা/কেজি", change: "▲ ৩.১%" },
    { name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", change: "▲ ২.৯%" },
    { name: "ছোলা", price: "১২০ টাকা/কেজি", change: "▼ ২.৪%" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("bazar_user");
    setIsDropdownOpen(false);
    router.push("/signin");
  };

  const currentDate = typeof window !== "undefined"
    ? new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "আজকের বাজার দর";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Date */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg flex items-center justify-center text-xl shadow-sm">
              <img src="/images/logo-icon.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-gray-900 tracking-tight block leading-none">বাজার দর</span>
              <span className="text-[11px] text-gray-500 font-medium" suppressHydrationWarning>
                {currentDate}
              </span>
            </div>
          </Link>
        </div>

        {/* User Profile / Auth State */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 focus:outline-none hover:bg-gray-50 p-1.5 rounded-full transition border border-transparent hover:border-gray-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : "ইউ"}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">{user.name}</span>
                <span className="text-xs text-gray-500">▼</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      ↩ সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-green-700 px-3 py-1.5 rounded-lg transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-t border-gray-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-6 overflow-x-auto text-xs font-medium text-gray-600 no-scrollbar">
          {[
            { name: "চাল", icon: "🍚", slug: "rice" },
            { name: "ডাল", icon: "🥣", slug: "dal" },
            { name: "তেল", icon: "🛢️", slug: "oil" },
            { name: "সবজি", icon: "🥦", slug: "vegetables" },
            { name: "মাছ", icon: "🐟", slug: "fish" },
            { name: "মাংস", icon: "🥩", slug: "meat" },
            { name: "ডিম-দুধ", icon: "🥛", slug: "egg-milk" },
            { name: "মসলা", icon: "🌶️", slug: "spices" },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 hover:text-green-700 transition whitespace-nowrap bg-gray-50 hover:bg-green-50 px-3 py-1.5 rounded-full border border-gray-200"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Running Marquee Ticker Bar */}
      <div className="bg-red-50/80 border-t border-b border-red-100 py-2 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-10 text-xs font-medium text-gray-700">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="font-semibold text-gray-800">{item.name}</span>
              <span className="text-gray-900 font-bold">{item.price}</span>
              <span className={item.change.includes('▲') ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}