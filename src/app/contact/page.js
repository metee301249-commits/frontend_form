"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนครับ");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-gray-800 pb-6">
          <Link href="/" className="text-xs text-yellow-400 font-semibold hover:underline">&larr; กลับสู่หน้าแรก</Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white">📞 ช่องทางการติดต่อ & ช่วยเหลือ</h1>
          <p className="text-gray-400 text-sm">
            มีปัญหาเรื่องการเติมเงิน, เติมไม่เข้า, หรือต้องการติดต่อสอบถามบริการอื่นๆ สามารถติดต่อทีมงาน JukJikSHOP ได้ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* ช่องทางการติดต่อหลัก (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Facebook Page */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 shadow-xl hover:border-yellow-400/50 transition">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
              f
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">Facebook Fanpage</h3>
              <p className="text-xs text-gray-400">ช่องทางหลักสำหรับแจ้งปัญหาและทวงสถานะออเดอร์ไวที่สุด</p>
            </div>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-center text-xs font-bold rounded-xl transition"
            >
              ไปที่เพจ Facebook
            </a>
          </div>

          {/* Line Official */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 shadow-xl hover:border-yellow-400/50 transition">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
              💬
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">Line Official</h3>
              <p className="text-xs text-gray-400">แอดไลน์เพื่อรับข่าวสาร โปรโมชั่น หรือติดต่อแอดมินส่วนตัว</p>
            </div>
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full py-2.5 bg-green-600 hover:bg-green-500 text-white text-center text-xs font-bold rounded-xl transition"
            >
              แอดไลน์ (@jukjikshop)
            </a>
          </div>

          {/* เวลาทำการ & ข้อมูลร้าน */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
              ⏰
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">เวลาทำการ</h3>
              <p className="text-xs text-gray-400">เปิดให้บริการทุกวัน จันทร์ - อาทิตย์</p>
            </div>
            <div className="text-xs text-yellow-400 font-bold bg-gray-950 p-2.5 rounded-xl border border-gray-800 text-center">
              ⏱️ 09:00 น. - 02:00 น. (ดึกดื่นก็เติมได้)
            </div>
          </div>

        </div>

        {/* ส่วนฟอร์มส่งข้อความหาแอดมินโดยตรง + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ฟอร์มติดต่อ */}
          <div className="bg-gray-900 border border-gray-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              ✉️ ส่งข้อความหาแอดมิน
            </h2>

            {submitted ? (
              <div className="bg-green-950/40 border border-green-500/30 p-6 rounded-2xl text-center space-y-3">
                <div className="text-green-400 text-3xl">✓</div>
                <h3 className="font-bold text-white text-base">ส่งข้อความสำเร็จแล้ว!</h3>
                <p className="text-xs text-gray-300">แอดมินจะรีบติดต่อกลับผ่านช่องทางที่คุณระบุโดยเร็วที่สุดครับ</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-yellow-400 font-bold hover:underline pt-2 inline-block"
                >
                  ส่งข้อความใหม่อีกครั้ง
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">ชื่อของคุณ <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    placeholder="เช่น สมชาย ใจดี" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">ช่องทางติดต่อกลับ (เบอร์โทร / เฟสบุ๊ค / ไลน์) <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    placeholder="เช่น ID Line หรือลิงก์เฟสบุ๊ค" 
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">ข้อความ / แจ้งปัญหา <span className="text-red-400">*</span></label>
                  <textarea 
                    rows="4"
                    placeholder="ระบุรายละเอียด เช่น เติมเงินแล้วยอดไม่เข้า เลขคำสั่งซื้อ..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-yellow-400 resize-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gray-950 font-black py-3.5 rounded-xl text-sm shadow-[0_0_15px_rgba(250,204,21,0.3)] transition"
                >
                  📤 ส่งข้อความถึงแอดมิน
                </button>
              </form>
            )}
          </div>

          {/* คำถามที่พบบ่อย (FAQ) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              ❓ คำถามที่พบบ่อย (FAQ)
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-sm text-yellow-400">ชำระเงินแล้วต้องรอนานแค่ไหนถึงจะได้รับของ?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  ระบบตรวจสอบสลิปและซองทรูมันนี่ใช้เวลาประมาณ 1-3 นาที หากเกิน 10 นาทีแล้วยังไม่เข้า สามารถทักแชทเพจพร้อมส่งสลิปให้แอดมินตรวจสอบได้เลยครับ
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-sm text-yellow-400">กรอกไอดีเกมผิดทำอย่างไรดี?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  หากเพิ่งกดสั่งซื้อไป รีบติดต่อแอดมินผ่านช่องทางแชท Facebook ทันที พร้อมแจ้งเลขคำสั่งซื้อและไอดีที่ถูกต้องครับ
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-sm text-yellow-400">ร้านนี้ปลอดภัยไหม เชื่อถือได้หรือเปล่า?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  ร้านเราเปิดให้บริการอย่างถูกต้อง มีรีวิวจากลูกค้าเพียบ เติมไว ปลอดภัย 100% ไม่เคยมีประวัติโกงครับ
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}