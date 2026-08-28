"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [payType, setPayType] = useState("qr"); // "qr" หรือ "truemoney"
  const [voucherLink, setVoucherLink] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem("pending_payment");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      // ถ้าไม่มีออร์เดอร์ค้าง ให้ดีดกลับไปหน้าบริการ
      router.push("/services");
    }
  }, [router]);

  const handleConfirmTrueMoney = (e) => {
    e.preventDefault();
    if (!voucherLink.trim()) {
      alert("กรุณากรอกลิงก์ซองของขวัญ TrueMoney");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder("ซองของขวัญ TrueMoney");
    }, 1500);
  };

  const handleSimulateQRPay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder("QR PromptPay");
    }, 1500);
  };

  const finalizeOrder = (paymentMethodName) => {
    if (!order) return;

    const updatedOrder = {
      ...order,
      payment: paymentMethodName,
      status: "สำเร็จ",
    };

    // บันทึกลงประวัติการซื้อ (game_orders)
    const existingOrders = JSON.parse(localStorage.getItem("game_orders") || "[]");
    localStorage.setItem("game_orders", JSON.stringify([updatedOrder, ...existingOrders]));

    // ลบออร์เดอร์ชั่วคราว
    localStorage.removeItem("pending_payment");

    alert("ชำระเงินสำเร็จ ระบบกำลังเติมสินค้าให้คุณครับ!");
    router.push("/history");
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <p className="text-sm text-slate-400">กำลังโหลดข้อมูลการชำระเงิน...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <Link href="/services" className="text-xs text-blue-400 font-bold hover:underline">&larr; เปลี่ยนแพ็กเกจหรือยกเลิก</Link>
            <h1 className="text-2xl font-black text-white mt-1">ชำระเงินคำสั่งซื้อ</h1>
            <p className="text-xs text-slate-400">รหัสคำสั่งซื้อ: <span className="text-white font-mono">{order.id}</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">ยอดที่ต้องชำระสุทธิ</p>
            <p className="text-2xl font-black text-blue-400">฿{order.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">รายละเอียดรายการ</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-500">เกม / บริการ</p>
              <p className="font-bold text-white mt-0.5">{order.gameName}</p>
            </div>
            <div>
              <p className="text-slate-500">แพ็กเกจ</p>
              <p className="font-bold text-white mt-0.5">{order.packageName}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-500">ไอดีปลายทางที่เติม</p>
              <p className="font-bold text-emerald-400 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1">{order.targetId}</p>
            </div>
          </div>
        </div>

        {/* Payment Channel Selector Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayType("qr")}
              className={`py-3 px-4 rounded-2xl text-xs font-black transition cursor-pointer border ${
                payType === "qr"
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/40"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              📱 สแกน QR PromptPay
            </button>
            <button
              type="button"
              onClick={() => setPayType("truemoney")}
              className={`py-3 px-4 rounded-2xl text-xs font-black transition cursor-pointer border ${
                payType === "truemoney"
                  ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-900/40"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              🧧 ซองของขวัญ TrueMoney
            </button>
          </div>

          {/* Tab Content: QR PromptPay */}
          {payType === "qr" && (
            <div className="space-y-6 text-center py-2">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-300">สแกนคิวอาร์โค้ดผ่านแอปพลิเคชันธนาคาร</p>
                <p className="text-[11px] text-slate-500">รองรับทุกธนาคาร (ระบบตรวจสอบอัตโนมัติ)</p>
              </div>

              {/* QR Code Placeholder Box */}
              <div className="bg-white p-4 rounded-3xl w-56 h-56 mx-auto flex flex-col items-center justify-center shadow-inner relative">
                <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 text-slate-800 space-y-2">
                  <span className="text-4xl">&#128241;</span>
                  <span className="text-[11px] font-bold text-slate-600">QR PROMPTPAY</span>
                  <span className="text-[10px] font-mono font-bold text-blue-600">฿{order.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-900/50 py-2 px-4 rounded-xl inline-block">
                  &#9888; กรุณาโอนให้พอดีกับยอดสุทธิ มิฉะนั้นระบบจะไม่เติมให้อัตโนมัติ
                </p>

                <div>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleSimulateQRPay}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-900/40 transition text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? "กำลังตรวจสอบการชำระเงิน..." : "จำลองการโอนเงินสำเร็จ (ทดสอบระบบ)"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: TrueMoney Voucher */}
          {payType === "truemoney" && (
            <form onSubmit={handleConfirmTrueMoney} className="space-y-5 py-2">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">ลิงก์ซองของขวัญ TrueMoney (Gift Link)</label>
                <p className="text-[11px] text-slate-500">สร้างซองของขวัญจากแอป TrueMoney Wallet แบบ <strong className="text-slate-300">"แบ่งจำนวนเงินเท่ากัน"</strong> (ยอดเท่ากับราคาสินค้า)</p>
                <input 
                  type="text"
                  required
                  placeholder="https://gift.truemoney.com/campaign/?v=..."
                  value={voucherLink}
                  onChange={(e) => setVoucherLink(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-300">&#128161; วิธีการสร้างซองทรูมันนี่:</p>
                <p>1. เปิดแอป TrueMoney เลือก "ซองของขวัญ"</p>
                <p>2. ใส่จำนวนเงินตามยอดสุทธิ (฿{order.price.toLocaleString()}) และระบุจำนวน 1 คน</p>
                <p>3. คัดลอกลิงก์มาวางในช่องด้านบนแล้วกดปุ่มยืนยัน</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-900/40 transition text-xs cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "กำลังตรวจสอบซอง..." : "ยืนยันการชำระด้วยซองทรูมันนี่"}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}