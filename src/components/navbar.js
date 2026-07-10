import Link from "next/link";

export default function Navbar() {
  // สร้างตัวแปร class เพื่อลดความซ้ำซ้อนและกำหนดสไตล์การ Hover
  const navLinkClass = "hover:text-yellow-300 transition-all duration-300 hover:scale-110 inline-block";

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:scale-105 transition-transform duration-300">
            MyWebsite
          </Link>

          {/* Menu */}
          <div className="flex gap-6">
            <Link href="/" className={navLinkClass}>
              หน้าแรก
            </Link>

            <Link href="/about" className={navLinkClass}>
              เกี่ยวกับ
            </Link>

            <Link href="/service" className={navLinkClass}>
              บริการของเรา
            </Link>

            <Link href="/contact" className={navLinkClass}>
              ติดต่อ
            </Link>

            <Link href="/register" className={navLinkClass}>
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}   