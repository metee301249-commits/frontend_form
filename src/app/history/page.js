"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'topup', 'order'
  const [historyData, setHistoryData] = useState([]);

  // ดึงประวัติรายการจริงจาก localStorage เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const savedHistory = localStorage.getItem("transaction_history");
    const gameOrders = localStorage.getItem("game_orders");

    let combined = [];

    // ดึงประวัติคำสั่งซื้อเกมจากหน้าที่แล้วมารวมด้วย
    if (gameOrders) {
      const parsedOrders = JSON.parse(gameOrders).map(ord => ({
        id: ord.id,
        type: "order",
        title: ord.gameName,
        detail: `แพ็กเกจ: ${ord.packageName} | ไอดี: ${ord.targetId} | ชำระผ่าน: ${ord.payment}`,
        amount: ord.price,
        status: "success",
        date: ord.date
      }));
      combined = [...parsedOrders];
    }

    // ดึงประวัติการเติมเงินเดิม (ถ้ามี)
    if (savedHistory) {
      const parsedTopup = JSON.parse(savedHistory);
      combined = [...combined, ...parsedTopup];
    } else if (!gameOrders) {
      // ข้อมูลเริ่มต้นจำลอง (ถ้ายังไม่มีข้อมูลใดๆ ทั้งสิ้น)
      const initialData = [
        {
          id: "TXN-98421",
          type: "topup",
          title: "เติมเงินเข้ากระเป๋าเว็บ",
          detail: "ผ่าน QR Code พร้อมเพย์",
          amount: 300,
          status: "success",
          date: "24 ส.ค. 2026 - 15:30 น."
        }
      ];
      combined = [...combined, ...initialData];
      localStorage.setItem("transaction_history", JSON.stringify(initialData));
    }

    setHistoryData(combined);
  }, []);

  // ฟังก์ชันล้างประวัติทั้งหมด
  const handleClearHistory = () => {
    if (confirm("คุณต้องการล้างประวัติการทำรายการทั้งหมดใช่หรือไม่?")) {
      localStorage.removeItem("transaction_history");
      localStorage.removeItem("game_orders");
      setHistoryData([]);
    }
  };

  // กรองข้อมูลตามแท็บที่เลือก
  const filteredData = historyData.filter(item => {
    if (activeTab === "topup") return item.type === "topup";
    if (activeTab === "order") return item.type === "order";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="space-y-2">
            <Link href="/services" className="text-xs text-blue-400 font-bold hover:underline">&larr; กลับไปหน้าเลือกบริการ</Link>
            <h1 className="text-3xl font-black text-white">📜 ประวัติรายการทั้งหมด</h1>
            <p className="text-slate-400 text-sm">ตรวจสอบประวัติการทำรายการเติมเงินและคำสั่งซื้อแพ็กเกจเกมย้อนหลังของคุณแบบเรียลไทม์</p>
          </div>

          {historyData.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-h-auto"
            >
              ล้างประวัติ
            </button>
          )}
        </div>

        {/* ปุ่มสลับแท็บประเภทประวัติ */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            📋 ทั้งหมด ({historyData.length})
          </button>
          <button
            onClick={() => setActiveTab("topup")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
              activeTab === "topup"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            💰 ประวัติการเติมเงิน
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
              activeTab === "order"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            🎮 ประวัติสั่งซื้อเกม
          </button>
        </div>

        {/* ตารางแสดงรายการ */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="text-4xl">📭</div>
              <p className="text-slate-400 text-sm">ไม่พบประวัติรายการในหมวดหมู่นี้</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filteredData.map((item, index) => (
                <div key={index} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-800/40 transition">
                  
                  {/* ข้อมูลฝั่งซ้าย */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        item.type === "topup" ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-blue-950 text-blue-400 border-blue-800"
                      }`}>
                        {item.type === "topup" ? "เติมเงิน" : "สั่งซื้อ"}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{item.id}</span>
                    </div>
                    <h3 className="font-black text-white text-base">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.detail} • <span className="text-slate-500">{item.date}</span></p>
                  </div>

                  {/* ข้อมูลฝั่งขวา (ราคาและสถานะ) */}
                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2">
                    <span className={`text-lg font-black ${
                      item.type === "topup" ? "text-emerald-400" : "text-blue-400"
                    }`}>
                      {item.type === "topup" ? "+" : "-"}฿{Number(item.amount).toLocaleString()}
                    </span>
                    
                    <div>
                      {item.status === "success" && (
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                          ✓ สำเร็จ
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                          ⏳ กำลังตรวจสอบ
                        </span>
                      )}
                      {item.status === "failed" && (
                        <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                          ✕ ไม่สำเร็จ
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}