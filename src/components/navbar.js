"use client"; // จำเป็นสำหรับการใช้ usePathname() และ Hooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // นำเข้า useState และ useEffect

export default function Navbar() {
  const pathname = usePathname();
  const [token, setToken] = useState(null); // กำหนด state สำหรับเก็บ token

  // ใช้ useEffect ดึง token จาก localStorage และอัปเดตทันทีทุกครั้งที่เปลี่ยนหน้า (pathname เปลี่ยน)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [pathname]);

  // สร้างฟังก์ชัน handleLogout สำหรับล้างข้อมูลและพาออกระบบ
  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token
    setToken(null); // อัปเดต state
    window.location.href = "/"; // พาผู้ใช้กลับหน้าแรก
  };

  // สไตล์สำหรับเมนูทั่วไปที่มีเอฟเฟกต์เส้นใต้วิ่ง
  const navLinkClass = (href) => {
    const isActive = pathname === href;
    return `relative py-2 font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-yellow-400 before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100 ${
      isActive ? "text-yellow-400 before:scale-x-100 font-semibold" : "text-blue-100 hover:text-white"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo พร้อมลูกเล่นไล่สีเอฟเฟกต์ */}
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            JukJik<span className="text-yellow-300">SHOP</span>
          </Link>

          {/* Menu และปุ่ม Call to Action */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/" className={navLinkClass("/")}>
                หน้าแรก
              </Link>

              <Link href="/about" className={navLinkClass("/about")}>
                เกี่ยวกับ
              </Link>

              <Link href="/service" className={navLinkClass("/service")}>
                บริการของเรา
              </Link>

              <Link href="/contact" className={navLinkClass("/contact")}>
                ติดต่อ
              </Link>

              {/* เพิ่มลิงก์ไปหน้าจัดการสมาชิก (แสดงเฉพาะตอนเข้าสู่ระบบแล้ว) */}
              {token && (
                <Link href="/users" className={navLinkClass("/users")}>
                  จัดการสมาชิก
                </Link>
              )}
            </div>

            {/* ส่วนปุ่มขวา: สลับการแสดงผลระหว่างปุ่ม Logout กับ สมัครสมาชิก/Login */}
            <div className="flex items-center gap-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold shadow-md transition-all duration-300 hover:bg-yellow-300 hover:text-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    สมัครสมาชิก
                  </Link>
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-full bg-blue-700 text-white font-semibold shadow-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}