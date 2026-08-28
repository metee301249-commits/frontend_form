import Link from "next/link";

export default function Home() {
  // รายการเกมยอดฮิต พร้อมรูปภาพประกอบและเอฟเฟกต์
  const topGames = [
    { 
      id: "valorant", 
      name: "Valorant", 
      desc: "เติม VP / พอยท์ไว ปลอดภัย 100%", 
      badge: "ยอดฮิต 🔥",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      borderHover: "hover:border-red-500/70"
    },
    { 
      id: "roblox", 
      name: "Roblox", 
      desc: "เติม Robux เรทดีงาม สะدวกรวดเร็ว", 
      badge: "ขายดี ⚡",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop",
      borderHover: "hover:border-blue-500/70"
    },
    { 
      id: "fivem", 
      name: "FiveM Server", 
      desc: "โดเนท พอยท์เซิร์ฟเวอร์ / ยศพิเศษ", 
      badge: "มาใหม่ ✨",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
      borderHover: "hover:border-purple-500/70"
    },
  ];

  // รีวิวจากลูกค้าจริง
  const reviews = [
    {
      id: 1,
      name: "คุณนนท์ เกมเมอร์ตัวยง",
      game: "เติม Valorant",
      comment: "เติมไวมากกกก! สั่งปุ๊บไม่ถึง 2 นาที VP เข้าไอดีละ บริการดีโคตรๆ ไว้มาอุดหนุนอีกแน่นอนครับ",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 2,
      name: "น้องมายด์ คนสวย",
      game: "เติม Roblox",
      comment: "เรทถูกกว่าร้านอื่น แถมปลอดภัยมาก ใช้แค่ยูสเซอร์เอง ไม่ต้องบอกรหัสผ่าน เลิฟเลยร้านนี้ ❤️",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 3,
      name: "พี่เบิร์ด สายซิ่ง",
      game: "เติม FiveM",
      comment: "แอดมินตอบไวมาก ตอนแรกกลัวโกง แต่ลองดูแล้วเชื่อถือได้จริง 10/10 ไม่หักครับ",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 4,
      name: "คุณฟลุ๊ค เทพซ่า",
      game: "เติม Valorant",
      comment: "โอนปุ๊บเติมปั๊บ ไวเวอร์ ระบบออโต้หรือแอดมินคือที่สุด สะดวกสุดๆ คับร้านนี้",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 5,
      name: "น้องไอซ์ น่ารัก",
      game: "เติม Roblox",
      comment: "ซื้อ Robux ร้านนี้ประจำ ไม่เคยมีปัญหาเลยจ้า บริการประทับใจมากกส",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* ฝัง CSS Animation สำหรับการเลื่อนรีวิวอัตโนมัติ */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Hero Section (ส่วนต้อนรับหลักสุดหรู) */}
      <header className="relative bg-gradient-to-b from-blue-900/40 via-gray-950 to-gray-950 py-20 px-6 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md inline-block animate-pulse">
            ⚡ JukJikSHOP - บริการเติมเกมออนไลน์อันดับ 1
          </span>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            เติมเกมสะดวกรวดเร็ว <span className="text-yellow-400 drop-shadow-md">ปลอดภัย ไร้กังวล</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            ร้านเติมเกมสุดจี๊ด เติมปุ๊บเข้าปั๊บ ระบบอัตโนมัติหรือผ่านแอดมินใจดี การันตีความปลอดภัย 100% 
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              href="/services" 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300"
            >
              🚀 ดูรายการเกมทั้งหมด
            </Link>
            <Link 
              href="/contact" 
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3.5 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300"
            >
              📞 ติดต่อทีมงาน
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-12 space-y-20">
        
        {/* ส่วนเกมยอดนิยม */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              🔥 <span className="text-yellow-400">เกมยอดนิยม</span> ประจำร้าน
            </h2>
            <Link href="/services" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition">
              ดูทั้งหมด &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topGames.map((game) => (
              <div 
                key={game.id}
                className={`bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl ${game.borderHover} hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gray-900/90 text-yellow-300 border border-yellow-400/30 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {game.badge}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{game.desc}</p>
                  </div>

                  <Link 
                    href="/services"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-center font-bold py-2.5 rounded-xl shadow-md transition duration-300 block"
                  >
                    🛒 เติมเงินเลย
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ส่วนรีวิวแบบเลื่อนไหลอัตโนมัติ (Infinite Marquee Slider) */}
        <section className="space-y-8 overflow-hidden pt-4">
          <div className="text-center space-y-2">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              💬 ความประทับใจจากลูกค้า
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              รีวิวเสียงจริงจาก <span className="text-yellow-400">ผู้ใช้งานจริง</span>
            </h2>
            <p className="text-gray-400 text-sm">การันตีความพึงพอใจ เติมจริง ส่งไว ไม่มีโกง (เอาเมาส์วางเพื่อหยุดเลื่อนได้)</p>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex gap-6">
              {[...reviews, ...reviews].map((rev, index) => (
                <div 
                  key={`${rev.id}-${index}`}
                  className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between w-[320px] sm:w-[360px] shrink-0 hover:border-yellow-500/50 transition duration-300"
                >
                  <div className="space-y-3">
                    <div className="text-yellow-400 text-sm">{rev.rating}</div>
                    <p className="text-gray-300 text-sm leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{rev.name}</span>
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20 font-medium">
                      {rev.game}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* จุดเด่นของร้าน 3 ข้อ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-6">
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/30 transition duration-300">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-bold text-lg text-white mb-1">เติมไวทันใจ</h3>
            <p className="text-gray-400 text-sm">ระบบจัดส่งยอดรวดเร็วภายใน 1-3 นาที ไม่ต้องรอนาน</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/30 transition duration-300">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-bold text-lg text-white mb-1">ปลอดภัย 100%</h3>
            <p className="text-gray-400 text-sm">ไม่ใช้รหัสผ่าน ปลอดภัยต่อไอดีเกมของลูกค้าแน่นอน</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/30 transition duration-300">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-bold text-lg text-white mb-1">บริการ 24 ชม.</h3>
            <p className="text-gray-400 text-sm">มีแอดมินคอยดูแลและช่วยเหลือตลอดเวลา ไม่มีวันหยุด</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 JukJikSHOP. All rights reserved. บริการเติมเกมออนไลน์อันดับหนึ่ง</p>
      </footer>
    </div>
  );
}