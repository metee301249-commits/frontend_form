"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function TopupDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  // ดึงไอดีเกมจาก URL (เช่น /topup/valorant -> valorant)
  const gameId = pathname.split("/").pop();

  // ข้อมูลจำลองของแต่ละเกมและแพ็กเกจราคา
  const gameData = {
    valorant: {
      name: "Valorant (VP)",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
      packages: [
        { id: "v1", amount: "125 VP", price: 39 },
        { id: "v2", amount: "420 VP", price: 129 },
        { id: "v3", amount: "700 VP", price: 219 },
        { id: "v4", amount: "1,375 VP", price: 399 },
        { id: "v5", amount: "2,400 VP", price: 699 },
        { id: "v6", amount: "4,000 VP", price: 1150 },
      ]
    },
    roblox: {
      name: "Roblox (Robux)",
      banner: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop",
      packages: [
        { id: "r1", amount: "80 Robux", price: 29 },
        { id: "r2", amount: "400 Robux", price: 139 },
        { id: "r3", amount: "800 Robux", price: 275 },
        { id: "r4", amount: "1,700 Robux", price: 550 },
        { id: "r5", amount: "4,500 Robux", price: 1390 },
      ]
    },
    fivem: {
      name: "FiveM Server Donates",
      banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
      packages: [
        { id: "f1", amount: "100 Points (พอยท์เซิร์ฟ)", price: 100 },
        { id: "f2", amount: "300 Points + โบนัสเพิ่ม", price: 300 },
        { id: "f3", amount: "500 Points (รับรถพิเศษ 1 คัน)", price: 500 },
        { id: "f4", amount: "1,000 Points (ยศ VIP + บ้านหรู)", price: 1000 },
      ]
    }
  };

  // ดึงข้อมูลเกมตามไอดี หรือใช้ค่าเริ่มต้นถ้าไม่ตรง
  const currentGame = gameData[gameId] || {
    name: "แพ็กเกจเติมเกมออนไลน์",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    packages: [
      { id: "d1", amount: "แพ็กเกจทดลอง 100 บาท", price: 100 },
      { id: "d2", amount: "แพ็กเกจมาตรฐาน 300 บาท", price: 300 },
      { id: "d3", amount: "แพ็กเกจสุดคุ้ม 500 บาท", price: 500 },
    ]
  };

  const [selectedPkg, setSelectedPkg] = useState(null);

  const handleProceed = () => {
    if (!selectedPkg) {
      alert("กรุณาเลือกแพ็กเกจราคาก่อนครับ!");
      return;
    }
    // ส่งข้อมูลเกมและราคาผ่าน Query Params ไปยังหน้าชำระเงิน
    router.push(`/checkout?game=${encodeURIComponent(currentGame.name)}&amount=${encodeURIComponent(selectedPkg.amount)}&price=${selectedPkg.price}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Header / Banner */}
      <div className="relative h-64 w-full bg-gray-900 border-b border-gray-800 overflow-hidden">
        <img 
          src={currentGame.banner} 
          alt={currentGame.name} 
          className="w-full h-full object-cover opacity-50 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent flex items-end p-6 sm:p-10">
          <div className="max-w-4xl w-full mx-auto space-y-2">
            <Link href="/services" className="text-xs text-yellow-400 font-semibold hover:underline">&larr; กลับไปเลือกเกมอื่น</Link>
            <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-md">
              เติมเงิน: <span className="text-yellow-400">{currentGame.name}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content: เลือกราคา */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            💎 กรุณาเลือกแพ็กเกจราคาที่ต้องการ
          </h2>
          <p className="text-gray-400 text-sm">คลิกเลือกแพ็กเกจด้านล่างเพื่อดำเนินการชำระเงิน</p>
        </div>

        {/* รายการแพ็กเกจ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentGame.packages.map((pkg) => {
            const isSelected = selectedPkg?.id === pkg.id;
            return (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl ${
                  isSelected 
                    ? "bg-blue-950/40 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.3)] scale-[1.02]" 
                    : "bg-gray-900 border-gray-800 hover:border-gray-600 hover:bg-gray-900/80"
                }`}
              >
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">แพ็กเกจยอดนิยม</span>
                  <h3 className="text-xl font-bold text-white">{pkg.amount}</h3>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-gray-800">
                  <span className="text-2xl font-black text-yellow-400">฿{pkg.price.toLocaleString()}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${isSelected ? "bg-yellow-400 text-gray-950" : "bg-gray-800 text-gray-400"}`}>
                    {isSelected ? "เลือกแล้ว ✓" : "เลือกแพ็กเกจ"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ปุ่มไปต่อหน้าชำระเงิน */}
        <div className="pt-6 flex justify-end">
          <button 
            onClick={handleProceed}
            className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-base shadow-lg transition-all duration-300 ${
              selectedPkg 
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gray-950 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-105" 
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            ไปหน้าชำระเงิน &rarr;
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 JukJikSHOP. All rights reserved.</p>
      </footer>
    </div>
  );
}