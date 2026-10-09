"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("সবগুলো ঘর পূরণ করুন!");
      return;
    }
    
    // ইউজার ডেটা লকাল স্টোরেজে সেভ করা
    localStorage.setItem("bazar_user", JSON.stringify({ name: formData.name, email: formData.email }));
    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-10 flex-grow w-full flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/80">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="text-xs text-gray-500">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
              <input
                type="text"
                placeholder="আপনার নাম লিখুন"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-gray-50/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-gray-50/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-gray-50/30"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition shadow-sm text-sm mt-2"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-600 font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}