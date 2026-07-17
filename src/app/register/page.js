"use client";

import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Register() {
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", form);

    try {
      const response = await fetch("https://api.itdev.cmtc.ac.th/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname,
          lastname: form.txt_lastname,
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: `บันทึกสำเร็จ (status: ${response.status})`,
          text: "เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3B82F6",
        });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#F59E0B",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `ระบบขัดข้อง (status: ${response.status})`,
          text: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#EF4444",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  // สไตล์ Input ล่าสุด: ปรับขอบมน ละมุน และเพิ่มเส้นเรืองแสงเมื่อคลิก (Focus)
  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    /* แก้ไขตรงนี้: ปรับพื้นหลังเป็น Gradient สีมืดสุดหรู และเพิ่ม py-16 เพื่อขยับฟอร์มลงมาจากคอมโพเนนต์ด้านบนให้สมดุล */
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center py-16 px-6">
      
      {/* เพิ่ม shadow-blue-500/10 เพื่อให้ตัวกล่องขาวมีแสงออร่าสีน้ำเงินฟุ้งกระจายจางๆ ตัดกับพื้นหลังสีมืด */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/10 overflow-hidden transform transition-all duration-300">
        
        {/* ส่วนหัว: ไล่เฉดสีธีมเดียวกับปุ่มสมัครสมาชิกบน Navbar */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-8 py-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
          
          <h1 className="text-3xl font-extrabold text-white tracking-wide relative z-10">
            สร้างบัญชีผู้ใช้
          </h1>
          <p className="text-blue-100 text-sm mt-1.5 relative z-10 font-light">
            กรอกข้อมูลด้านล่างเพื่อเข้าร่วมกับ JukJikSHOP
          </p>
        </div>

        {/* ฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>ชื่อ</label>
              <input type="text" name="txt_firstname" value={form.txt_firstname} onChange={handleChange} className={inputClass} placeholder='สมชาย' required />
            </div>
            <div>
              <label className={labelClass}>นามสกุล</label>
              <input type="text" name="txt_lastname" value={form.txt_lastname} onChange={handleChange} className={inputClass} placeholder='ใจดี' required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Username</label>
            <input type="text" name="txt_username" value={form.txt_username} onChange={handleChange} className={inputClass} placeholder='somchai_jd' required />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input type="password" name="txt_password" value={form.txt_password} onChange={handleChange} className={inputClass} placeholder='••••••••' required />
          </div>

          {/* ปุ่มบันทึกข้อมูล: มีเอฟเฟกต์หดตัวเล็กน้อยเมื่อกดและเงาสีน้ำเงินฟุ้งๆ */}
          <button 
            type="submit" 
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
          >
            ลงทะเบียนสมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}