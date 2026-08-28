"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(199731); // ค่าเริ่มต้นให้ตรงกัน

  // โหลด token และยอดเงินจาก localStorage (ใช้คีย์ "user_credit" ร่วมกันทุกหน้า)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const loadBalance = () => {
      const savedBalance = localStorage.getItem("user_credit");
      if (savedBalance !== null) {
        setBalance(Number(savedBalance));
      } else {
        localStorage.setItem("user_credit", "199731");
      }
    };

    loadBalance();

    // ฟังอีเวนต์เพื่อให้ยอดเงินอัปเดตแบบเรียลไทม์เมื่อมีการเปลี่ยนแปลงในแท็บเดียวกันหรือข้ามแท็บ
    window.addEventListener("storage", loadBalance);
    return () => window.removeEventListener("storage", loadBalance);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  const navLinkClass = (href) => {
    const isActive = pathname === href;
    return `relative py-2 font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-yellow-400 before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100 ${
      isActive ? "text-yellow-400 before:scale-x-100 font-semibold" : "text-blue-100 hover:text-white"
    }`;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* แถบบบนสุด: แสดงยอดเงินคงเหลือจริงที่ซิงค์กับระบบเติมเงินและซื้อสินค้า */}
      <div className="bg-gray-950 text-white border-b border-gray-800 px-6 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-gray-400">
            👋 ยินดีต้อนรับสู่ <span className="text-yellow-400 font-bold">JukJikSHOP</span> เติมไว ปลอดภัย 24 ชม.
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 border border-gray-800 px-3 py-1 rounded-full flex items-center gap-2 shadow-inner">
              <span className="text-yellow-400 font-medium">💰 ยอดเงินคงเหลือ:</span>
              <span className="font-black text-white text-sm">฿{balance.toLocaleString()}</span>
            </div>
            
            <Link 
              href="/topup-credit" 
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-3 py-1 rounded-full transition shadow-sm"
            >
              + เติมเงิน
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar หลัก */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              JukJik<span className="text-yellow-300">SHOP</span>
            </Link>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                <Link href="/" className={navLinkClass("/")}>หน้าแรก</Link>
                <Link href="/about" className={navLinkClass("/about")}>เกี่ยวกับ</Link>
                <Link href="/services" className={navLinkClass("/services")}>บริการของเรา</Link>
                <Link href="/history" className={navLinkClass("/history")}>ประวัติรายการ</Link>
                <Link href="/contact" className={navLinkClass("/contact")}>ติดต่อ</Link>
              </div>

              <div className="flex items-center gap-4">
                {token ? (
                  <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md transition hover:bg-red-600 cursor-pointer">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/register" className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold shadow-md transition hover:bg-yellow-300">
                      สมัครสมาชิก
                    </Link>
                    <Link href="/login" className="px-5 py-2 rounded-full bg-blue-700 text-white font-semibold shadow-md transition hover:bg-blue-800">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}