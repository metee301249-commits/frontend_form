"use client";

// เพิ่มคำสั่งนี้เพื่อให้ Next.js รู้ว่าเป็น Dynamic Page ไม่พยายาม Prerender ตอน Build
export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const gameName = searchParams.get("game") || "เติมเกมออนไลน์";
  const amount = searchParams.get("amount") || "แพ็กเกจมาตรฐาน";
  const price = Number(searchParams.get("price") || "100");

  const [username, setUsername] = useState("");
  const [payMethod, setPayMethod] = useState("credit"); 
  const [slip, setSlip] = useState(null);
  const [trueWalletLink, setTrueWalletLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [userBalance, setUserBalance] = useState(350);

  // โหลดเครดิตปัจจุบันจาก localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance !== null) {
      setUserBalance(Number(savedBalance));
    } else {
      localStorage.setItem("balance", "350");
    }
  }, []);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!username) {
      alert("กรุณากรอก Username หรือข้อมูลไอดีเกมของคุณ");
      return;
    }

    if (payMethod === "credit" && userBalance < price) {
      alert("ยอดเงินคงเหลือในระบบของคุณไม่พอ กรุณาเติมเงินก่อนทำรายการครับ");
      return;
    }

    if (payMethod === "qr" && !slip) {
      alert("กรุณาแนบหลักฐานการโอนเงิน (สลิป)");
      return;
    }

    if (payMethod === "true-wallet" && !trueWalletLink) {
      alert("กรุณากรอกลิงก์ซองของขวัญ TrueMoney Wallet");
      return;
    }
    
    setLoading(true);

    setTimeout(() => {
      // 1. ถ้าจ่ายด้วยเครดิต ให้หักเงินและอัปเดตลง localStorage ทันที
      if (payMethod === "credit") {
        const newBalance = userBalance - price;
        setUserBalance(newBalance);
        localStorage.setItem("balance", newBalance.toString());
      }

      // 2. บันทึกรายการสั่งซื้อจริงลงในประวัติ (transaction_history)
      const newOrder = {
        id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
        type: "order",
        title: `เติมเกม ${gameName} (${amount})`,
        detail: `Username: ${username} (${payMethod === 'credit' ? 'หักจากเครดิตเว็บ' : payMethod === 'qr' ? ' QR Code' : 'ซองทรูมันนี่'})`,
        amount: price,
        status: "success",
        date: new Date().toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: 'numeric' }) + " - " + new Date().toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' }) + " น."
      };

      const existingHistory = JSON.parse(localStorage.getItem("transaction_history") || "[]");
      localStorage.setItem("transaction_history", JSON.stringify([newOrder, ...existingHistory]));

      setLoading(false);
      alert(`สั่งซื้อ ${gameName} สำเร็จ! ระบบได้หักเครดิตและบันทึกประวัติเรียบร้อยแล้ว`);
      router.push("/history"); // พาไปหน้าประวัติทันที
    }, 1500);
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        
        <div className="space-y-2">
          <Link href="/services" className="text-xs text-blue-600 font-bold hover:underline">&larr; เปลี่ยนแพ็กเกจ</Link>
          <h1 className="text-3xl font-black text-slate-900">💳 ยืนยันคำสั่งซื้อ & ชำระเงิน</h1>
        </div>

        {/* สรุปรายการ */}
        <div className="bg-white border border-blue-100 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-blue-600 border-b border-blue-50 pb-3">📦 สรุปคำสั่งซื้อของคุณ</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">เกม:</span>
              <span className="font-bold text-slate-800">{gameName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">แพ็กเกจ:</span>
              <span className="font-bold text-slate-800">{amount}</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-blue-50">
              <span className="text-slate-700 font-bold">ยอดที่ต้องชำระทั้งสิ้น:</span>
              <span className="text-xl font-black text-blue-600">฿{price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ฟอร์มชำระเงิน */}
        <form onSubmit={handleSubmitOrder} className="bg-white border border-blue-100 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              🎮 Username / ไอดีเกม / Riot ID (สำหรับเติม) <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="เช่น PlayerName#1234" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-blue-50">
            <label className="block text-sm font-semibold text-slate-700">💳 เลือกช่องทางการชำระเงิน</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPayMethod("credit")}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  payMethod === "credit" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>💰 เครดิตในเว็บ</span>
                <span className={`text-[10px] ${payMethod === "credit" ? "text-blue-100" : "text-slate-500"}`}>(มีอยู่ ฿{userBalance})</span>
              </button>

              <button
                type="button"
                onClick={() => setPayMethod("qr")}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  payMethod === "qr" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>📱 QR Code</span>
                <span className={`text-[10px] ${payMethod === "qr" ? "text-blue-100" : "text-slate-500"}`}>พร้อมเพย์</span>
              </button>

              <button
                type="button"
                onClick={() => setPayMethod("true-wallet")}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  payMethod === "true-wallet" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>🧧 ซองทรูมันนี่</span>
                <span className={`text-[10px] ${payMethod === "true-wallet" ? "text-blue-100" : "text-slate-500"}`}>อั่งเปา</span>
              </button>
            </div>
          </div>

          {payMethod === "credit" && (
            <div className="space-y-3 bg-blue-50/60 p-5 rounded-2xl border border-blue-100 text-xs">
              <div className="flex justify-between">
                <span>ยอดเครดิตของคุณ:</span>
                <span className="font-bold">฿{userBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ยอดที่ต้องจ่าย:</span>
                <span className="font-bold text-rose-600">-฿{price.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between text-sm font-bold">
                <span>เครดิตคงเหลือหลังหัก:</span>
                <span className={userBalance >= price ? "text-emerald-600" : "text-rose-500"}>
                  ฿{(userBalance - price).toLocaleString()} {userBalance < price && "(เงินไม่พอ!)"}
                </span>
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-black py-4 rounded-xl shadow-lg transition text-sm"
          >
            {loading ? "กำลังหักเครดิต & บันทึกประวัติ..." : "🚀 ยืนยันการสั่งซื้อ"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">กำลังโหลดข้อมูล...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}