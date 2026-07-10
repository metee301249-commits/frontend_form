"use client";

import React, { useState } from 'react';

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
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* ส่วนหัวที่ปรับสีให้อ่อนลงเป็น blue-500 */}
        <div className="bg-blue-500 px-6 py-6">
          <h1 className="text-2xl font-bold text-white text-center">ฟอร์มสมัครสมาชิก</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
              <input type="text" name="txt_firstname" value={form.txt_firstname} onChange={handleChange} className={inputClass} placeholder='Firstname' required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
              <input type="text" name="txt_lastname" value={form.txt_lastname} onChange={handleChange} className={inputClass} placeholder='Lastname' required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" name="txt_username" value={form.txt_username} onChange={handleChange} className={inputClass} placeholder='Username' required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="txt_password" value={form.txt_password} onChange={handleChange} className={inputClass} placeholder='••••••••' required />
          </div>

          <button type="submit" className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 shadow-md">
            บันทึกข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
}