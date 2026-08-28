"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopupCreditPage() {
  const router = useRouter();
  const [topupMethod, setTopupMethod] = useState("truemoney"); // 'truemoney', 'qr', หรือ 'code'
  const [trueWalletLink, setTrueWalletLink] = useState("");
  const [qrAmount, setQrAmount] = useState("100");
  const [slip, setSlip] = useState(null);
  const [promoCode, setPromoCode] = useState(""); // สำหรับช่องใส่โค้ด
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(199731);

  // โหลดเครดิตปัจจุบันจาก localStorage (ใช้คีย์ user_credit ให้ตรงกับหน้าอื่น)
  useEffect(() => {
    const loadCredit = () => {
      const savedBalance = localStorage.getItem("user_credit");
      if (savedBalance !== null) {
        setCurrentBalance(Number(savedBalance));
      } else {
        localStorage.setItem("user_credit", "199731");
      }
    };

    loadCredit();

    // ฟังอีเวนต์เพื่อให้ยอดเงินอัปเดตเรียลไทม์หากมีการเปลี่ยนแปลงจากหน้าอื่น
    window.addEventListener("storage", loadCredit);
    return () => window.removeEventListener("storage", loadCredit);
  }, []);

  const handleTopup = (e) => {
    e.preventDefault();
    
    let addedAmount = 0;
    let detailText = "";

    if (topupMethod === "truemoney") {
      if (!trueWalletLink) {
        alert("กรุณากรอกลิงก์ซองของขวัญ TrueMoney Wallet");
        return;
      }
      addedAmount = 100;
      detailText = "เติมเงินผ่านซองของขวัญ TrueMoney";
    } else if (topupMethod === "qr") {
      if (!slip) {
        alert("กรุณาแนบสลิปหลักฐานการโอนเงิน");
        return;
      }
      addedAmount = Number(qrAmount);
      detailText = `เติมเงินผ่าน QR Code พร้อมเพย์ (฿${addedAmount})`;
    } else if (topupMethod === "code") {
      if (!promoCode.trim()) {
        alert("กรุณากรอกโค้ดเติมเงิน");
        return;
      }

      // ตรวจสอบโค้ดตัวอย่าง
      const codeUpper = promoCode.trim().toUpperCase();
      if (codeUpper === "FREE500") {
        addedAmount = 500;
      } else if (codeUpper === "JUKJIK999") {
        addedAmount = 999;
      } else {
        alert("❌ โค้ดไม่ถูกต้อง หรือหมดอายุแล้ว");
        return;
      }
      detailText = `เติมเงินผ่านโค้ดลับ (${codeUpper})`;
    }

    setLoading(true);

    setTimeout(() => {
      // 1. คำนวณยอดเงินใหม่และอัปเดตลง localStorage (ใช้คีย์ user_credit และยิง event storage)
      const newBalance = currentBalance + addedAmount;
      setCurrentBalance(newBalance);
      localStorage.setItem("user_credit", newBalance.toString());
      window.dispatchEvent(new Event("storage"));

      // 2. บันทึกประวัติการเติมเงินลงในประวัติรวม (transaction_history)
      const newTopupRecord = {
        id: "TOP-" + Math.floor(10000 + Math.random() * 90000),
        type: "topup",
        title: "เติมเงินเข้ากระเป๋าเว็บ",
        detail: detailText,
        amount: addedAmount,
        status: "success",
        date: new Date().toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: 'numeric' }) + " - " + new Date().toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' }) + " น."
      };

      const existingHistory = JSON.parse(localStorage.getItem("transaction_history") || "[]");
      localStorage.setItem("transaction_history", JSON.stringify([newTopupRecord, ...existingHistory]));

      setLoading(false);
      alert(`🎉 เติมเงินสำเร็จ! ระบบได้เพิ่มเครดิต ฿${addedAmount.toLocaleString()} ให้คุณเรียบร้อยแล้ว`);
      router.push("/history");
    }, 1500);
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <Link href="/" className="text-xs text-blue-600 font-bold hover:underline">&larr; กลับสู่หน้าแรก</Link>
          <h1 className="text-3xl font-black text-slate-900">💰 เติมเงินเข้าเครดิตเว็บ</h1>
          <p className="text-slate-600 text-sm">เติมเครดิตสะสมไว้ใช้ซื้อสินค้าและบริการใน JukJikSHOP ได้สะดวกรวดเร็ว 24 ชม.</p>
        </div>

        {/* แสดงยอดเงินปัจจุบัน */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-blue-100 font-medium">ยอดเครดิตคงเหลือของคุณปัจจุบัน</p>
            <h2 className="text-3xl font-black mt-1">฿{currentBalance.toLocaleString()}</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold border border-white/20">
            กระเป๋าหลัก ⚡
          </div>
        </div>

        {/* ฟอร์มเติมเงิน */}
        <form onSubmit={handleTopup} className="bg-white border border-blue-100 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          
          {/* เลือกช่องทาง (เพิ่มปุ่มกรอกโค้ด) */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">เลือกช่องทางการเติมเงิน</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTopupMethod("truemoney")}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  topupMethod === "truemoney"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>🧧 ทรูวอลเล็ท</span>
                <span className={`text-[9px] ${topupMethod === "truemoney" ? "text-blue-100" : "text-slate-500"}`}>ซองของขวัญ</span>
              </button>

              <button
                type="button"
                onClick={() => setTopupMethod("qr")}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  topupMethod === "qr"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>📱 พร้อมเพย์</span>
                <span className={`text-[9px] ${topupMethod === "qr" ? "text-blue-100" : "text-slate-500"}`}>สแกน QR</span>
              </button>

              <button
                type="button"
                onClick={() => setTopupMethod("code")}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  topupMethod === "code"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>🎟️ กรอกโค้ด</span>
                <span className={`text-[9px] ${topupMethod === "code" ? "text-blue-100" : "text-slate-500"}`}>เติมด้วยโค้ดลับ</span>
              </button>
            </div>
          </div>

          {/* รายละเอียดช่องทาง TrueMoney */}
          {topupMethod === "truemoney" && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-orange-500">ขั้นตอนการเติมผ่านซองของขวัญ</h3>
              <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
                <li>เปิดแอป TrueMoney Wallet แล้วเลือก <span className="font-bold text-slate-800">&quot;ส่งซองของขวัญ&quot;</span></li>
                <li>เลือกรูปแบบ <span className="font-bold text-slate-800">&quot;แบ่งจำนวนเงินเท่ากัน&quot;</span> และระบุจำนวนคนเป็น <span className="font-bold text-slate-800">1 คน</span></li>
                <li>ใส่จำนวนเงินที่ต้องการเติม แล้วกดสร้างซองและคัดลอกลิงก์มาวางด้านล่าง</li>
              </ol>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">🔗 ลิงก์ซองของขวัญ TrueMoney</label>
                <input 
                  type="text" 
                  placeholder="https://gift.truemoney.com/campaign/?v=..." 
                  value={trueWalletLink}
                  onChange={(e) => setTrueWalletLink(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* รายละเอียดช่องทาง QR Code */}
          {topupMethod === "qr" && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-700 text-center">สแกน QR Code เพื่อเติมเงิน</h3>
              
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">เลือกจำนวนเงินที่ต้องการโอน</label>
                <select 
                  value={qrAmount}
                  onChange={(e) => setQrAmount(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="50">50 บาท</option>
                  <option value="100">100 บาท</option>
                  <option value="300">300 บาท</option>
                  <option value="500">500 บาท</option>
                  <option value="1000">1,000 บาท</option>
                </select>
              </div>

              <div className="bg-white p-4 rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center shadow-md border border-slate-100">
                <div className="text-slate-900 font-black text-center space-y-1">
                  <div className="w-20 h-20 bg-slate-900 mx-auto flex items-center justify-center text-white text-[9px] rounded-lg tracking-widest font-mono">
                    QR-CODE
                  </div>
                  <div className="text-sm font-bold text-blue-600">฿{Number(qrAmount).toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">📄 แนบสลิปหลักฐานการโอนเงิน</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setSlip(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* รายละเอียดช่องทางกรอกโค้ด */}
          {topupMethod === "code" && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-blue-600">🎟️ กรอกโค้ดรับเครดิตฟรี / โค้ดเติมเงิน</h3>
              <p className="text-xs text-slate-500">
                พิมพ์โค้ดโปรโมชันของคุณเพื่อรับเครดิตเข้ากระเป๋า (ลองใส่โค้ดทดสอบ: <span className="font-bold text-slate-800">FREE500</span> หรือ <span className="font-bold text-slate-800">JUKJIK999</span>)
              </p>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">✍️ โค้ดเติมเงิน (Promo Code)</label>
                <input 
                  type="text" 
                  placeholder="เช่น FREE500" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* ปุ่มกดยืนยัน */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-200 transition text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "กำลังตรวจสอบข้อมูล..." : "💳 ยืนยันการทำรายการ"}
          </button>

        </form>

      </div>
    </div>
  );
}