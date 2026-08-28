"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans overflow-x-hidden relative selection:bg-yellow-400 selection:text-gray-950">
      
      {/* Background Glow Effects & Grid Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-yellow-400/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Header */}
      <header className="relative py-24 px-6 text-center border-b border-gray-800/80 bg-gradient-to-b from-blue-950/30 via-gray-950 to-gray-950">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.25)]">
            ✨ เกี่ยวกับเรา (About JukJikSHOP)
          </span>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-tight">
            เบื้องหลังความสำเร็จ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(250,204,21,0.4)]">
              พาร์ทเนอร์เกมเมอร์ตัวจริง
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            ร้านเติมเกมและบริการออนไลน์สัญชาติไทย ขับเคลื่อนด้วยใจรักเกมเมอร์ เพื่อความรวดเร็ว ปลอดภัย และจริงใจที่สุด 24 ชั่วโมง
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-12 space-y-20 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-6 rounded-3xl text-center space-y-2 hover:border-yellow-400/40 transition duration-300">
            <div className="text-3xl sm:text-4xl font-black text-yellow-400">10K+</div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium">ออเดอร์ที่สำเร็จ</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-6 rounded-3xl text-center space-y-2 hover:border-blue-400/40 transition duration-300">
            <div className="text-3xl sm:text-4xl font-black text-blue-400">99.9%</div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium">ความพึงพอใจ</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-6 rounded-3xl text-center space-y-2 hover:border-purple-400/40 transition duration-300">
            <div className="text-3xl sm:text-4xl font-black text-purple-400">24 ชม.</div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium">บริการสแตนด์บาย</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-6 rounded-3xl text-center space-y-2 hover:border-emerald-400/40 transition duration-300">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">0%</div>
            <div className="text-gray-400 text-xs sm:text-sm font-medium">ประวัติการโกง</div>
          </div>
        </div>

        {/* Story Section with Glowing Animated Border */}
        <div className="relative group p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-yellow-400/60 to-purple-600/40 shadow-2xl transition duration-500 hover:scale-[1.01]">
          <div className="bg-gray-900/90 backdrop-blur-2xl p-8 sm:p-12 rounded-[22px] space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>🚀</span> <span className="text-yellow-400">จุดเริ่มต้นและวิสัยทัศน์ของ JukJikSHOP</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg font-light">
              <p>
                พวกเราเริ่มต้นจากกลุ่มเกมเมอร์ตัวยงที่ประสบปัญหาเดิม ๆ ทั้งการเติมเกมช้า เรทราคาแพงเกินจริง หรือต้องเสี่ยงกับบริการที่ไม่น่าเชื่อถือ จนเกิดคำถามว่า <strong className="text-white font-semibold">&quot;ทำไมไม่มีร้านที่เข้าใจเกมเมอร์อย่างแท้จริง?&quot;</strong>
              </p>
              <p>
                นั่นจึงเป็นจุดกำเนิดของ <strong className="text-yellow-400 font-semibold">JukJikSHOP</strong> แพลตฟอร์มที่รวมบริการเกมออนไลน์และระบบเติมเงินอัตโนมัติที่รวดเร็วที่สุด ปลอดภัยที่สุด และคุ้มค่าเงินในกระเป๋าของเพื่อน ๆ ทุกคนมากที่สุด
              </p>
            </div>
          </div>
        </div>

        {/* Features / Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">ทำไมต้องเลือกใช้บริการกับเรา?</h2>
            <p className="text-gray-400 text-sm sm:text-base">มาตรฐานที่เรายึดมั่นในการดูแลลูกค้าทุกคนดั่งคนในครอบครัว</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-8 rounded-3xl space-y-4 hover:border-yellow-400/50 hover:shadow-[0_0_35px_rgba(250,204,21,0.15)] hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white">ประสบการณ์สูง มั่นใจได้</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                ทีมงานมืออาชีพที่มีความเชี่ยวชาญด้านระบบเกมและการจัดการไอดี ดูแลผู้เล่นมาแล้วนับพันเคสอย่างราบรื่น
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-8 rounded-3xl space-y-4 hover:border-blue-400/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/10 border border-blue-400/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white">รวดเร็วทันใจ ระบบออโต้</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                ระบบหลังบ้านทันสมัย ตรวจสอบยอดและเติมเครดิตหรือสินค้าให้ทันทีภายในไม่กี่นาที ไม่ต้องรอนาน
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-8 rounded-3xl space-y-4 hover:border-purple-400/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-400/10 border border-purple-400/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                💎
              </div>
              <h3 className="text-xl font-bold text-white">เรทราคาคุ้มค่าที่สุด</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                ประหยัดกว่า คุ้มค่ากว่า พร้อมโปรโมชั่น โค้ดส่วนลด และกิจกรรมแจกเครดิตฟรีเพียบตลอดทั้งเดือน
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="relative bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 p-8 sm:p-12 rounded-3xl text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h3 className="text-2xl sm:text-4xl font-black text-white">พร้อมสนุกกับเกมโปรดของคุณหรือยัง?</h3>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            เลือกชมสินค้า บริการเติมเกม หรือเติมเครดิตเข้ากระเป๋าเพื่อรับความคุ้มค่าสูงสุดได้เลยตอนนี้
          </p>
          <div className="pt-2">
            <Link 
              href="/services" 
              className="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-gray-950 font-black px-10 py-4 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-105 transition-all duration-300"
            >
              🎮 ไปเลือกดูบริการทั้งหมดกันเลย
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-800/80 py-8 text-center text-gray-500 text-sm mt-16 backdrop-blur-md">
        <p>© 2026 JukJikSHOP. All rights reserved. พาร์ทเนอร์คู่ใจเกมเมอร์ไทย</p>
      </footer>
    </div>
  );
}