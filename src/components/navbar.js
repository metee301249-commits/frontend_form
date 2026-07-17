"use client"; // จำเป็นสำหรับการใช้ usePathname() เพื่อเช็ก Active Link

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // สไตล์สำหรับเมนูทั่วไปที่มีเอฟเฟกต์เส้นใต้วิ่ง
  const navLinkClass = (href) => {
    const isActive = pathname === href;
    // relative เพื่อให้เส้นใต้อ้างอิงตำแหน่งได้, py-2 เพื่อเพิ่มพื้นที่กด
    // before: ใช้สำหรับสร้างเส้นใต้จอมปลอมที่วิ่งได้
    return `relative py-2 font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-yellow-400 before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100 ${
      isActive ? "text-yellow-400 before:scale-x-100 font-semibold" : "text-blue-100 hover:text-white"
    }`;
  };

  return (
    // sticky top-0 เพื่อให้เกาะขอบบน, z-50 เพื่อให้อยู่เหนือเนื้อหาอื่น, backdrop-blur เพื่อเอฟเฟกต์กระจกฝ้า
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
            </div>

            {/* แยกปุ่มสมัครสมาชิกออกมาให้เด่นเป็นปุ่มกดสไตล์ Modern */}
            <Link 
              href="/register" 
              // shadow-md และ hover:shadow-lg เพื่อเพิ่มมิติ, hover:-translate-y-0.5 เพื่อลูกเล่นลอยขึ้น
              className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold shadow-md transition-all duration-300 hover:bg-yellow-300 hover:text-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}