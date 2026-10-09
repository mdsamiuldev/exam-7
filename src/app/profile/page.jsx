"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  
  // সেফলি ক্লায়েন্টে লোকালস্টোরেজ থেকে স্টেট ইনিশিয়ালাইজ করা হলো (কোনো linter error ছাড়াই)
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bazar_user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [newName, setNewName] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bazar_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.name || "";
      }
    }
    return "";
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    const updatedUser = { ...user, name: newName };
    localStorage.setItem("bazar_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("নাম সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("bazar_user");
    router.push("/signin");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500 bg-gray-50">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 grow w-full space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/80 space-y-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-20 h-20 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-3xl shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : "ইউ"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* শুধু নাম পরিবর্তনের ফর্ম */}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">প্রোফাইলের নাম পরিবর্তন করুন</h2>
            
            <div className="max-w-md">
              <label className="block text-xs text-gray-500 mb-1 font-medium">আপনার নাম</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:border-green-600 transition text-sm"
                placeholder="নতুন নাম লিখুন"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
              >
                নাম পরিবর্তন করুন
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-gray-100 flex gap-4">
            <Link
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              হোম পেজে যান
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              সাইন আউট করুন
            </button>
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