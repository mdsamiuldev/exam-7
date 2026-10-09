"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [authProvider, setAuthProvider] = useState("");
  const [userCustomEmail, setUserCustomEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleManualSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন!");
      return;
    }
    const userName = email.split('@')[0];
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    localStorage.setItem("bazar_user", JSON.stringify({ name: formattedName, email: email }));
    
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push("/");
  };

  const handleGoogleAuth = () => {
    setAuthProvider("Google");
    setUserCustomEmail("");
    setShowEmailModal(true);
  };

  const handleGitHubAuth = () => {
    setAuthProvider("GitHub");
    setUserCustomEmail("");
    setShowEmailModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!userCustomEmail) {
      toast.error("দয়া করে আপনার ইমেইল লিখুন!");
      return;
    }
    const namePart = userCustomEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    localStorage.setItem("bazar_user", JSON.stringify({ name: formattedName, email: userCustomEmail }));
    toast.success(`${authProvider} দিয়ে সফলভাবে লগইন হয়েছে!`);
    setShowEmailModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-12 flex-grow w-full flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/80">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">সাইন ইন</h1>
            <p className="text-xs text-gray-500">আপনার জিমেইল বা গিটহাব অ্যাকাউন্ট দিয়ে সরাসরি প্রবেশ করুন।</p>
          </div>

          <form onSubmit={handleManualSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-gray-50/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 text-sm bg-gray-50/30"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition shadow-sm text-sm mt-2 cursor-pointer"
            >
              সাইন ইন
            </button>
          </form>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase">অথবা</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl text-xs font-medium text-gray-700 transition cursor-pointer"
            >
              <span>🌐</span> Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              onClick={handleGitHubAuth}
              className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl text-xs font-medium text-gray-700 transition cursor-pointer"
            >
              <span>🐙</span> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-500 hover:underline">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>

      {/* কাস্টম ইমেইল ইনপুট মডাল (Prompt এর পরিবর্তে নিরাপদ ও সুন্দর পপআপ) */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="text-center">
              <span className="text-4xl">{authProvider === "Google" ? "🌐" : "🐙"}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2">{authProvider} দিয়ে লগইন</h3>
              <p className="text-xs text-gray-500 mt-1">আপনার জিমেইল বা ইমেইল অ্যাকাউন্টটি নিশ্চিত করুন।</p>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  placeholder="your-email@gmail.com"
                  value={userCustomEmail}
                  onChange={(e) => setUserCustomEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition text-xs shadow-sm mt-2 cursor-pointer"
              >
                নিশ্চিত করুন ও প্রবেশ করুন
              </button>
            </form>

            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              className="w-full py-1 text-xs font-semibold text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}