"use client";

import React from 'react'
import { useState } from "react";

export default function register() {

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
    console.log(form);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-1g shadow-md border">
                   {/* Header */}
             <div className="border-b px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-800">
            ฟอร์มสมัครสมาชิก
             </h1>
          </div>
          <forn onSubmit={handleSubmit} className='p-6 space-y-5'>
              <label className="text-black">กรุณาระบุชื่อ</label>
              <input type="text" name="txt_firstname" defaultValue={""} onChange={handleChange} className='w-full border text-black border-black rounded-md px-4 py-2' placeholder='firstname' />

              <label className="text-black">กรุณาระบุนามสกุล</label>
              <input type="text" name="txt_lastname" defaultValue={""} onChange={handleChange} className='w-full border text-black border-black rounded-md px-4 py-2' placeholder='lastname' />
              
              <label className="text-black">Username</label>
              <input type="text" name="txt_username" defaultValue={""} onChange={handleChange} className='w-full border text-black border-black rounded-md px-4 py-2' placeholder='username' />

              <label className="text-black">Password</label>
              <input type="password" name="txt_password" defaultValue={""} onChange={handleChange} className='w-full border text-black border-black rounded-md px-4 py-2' placeholder='password' />

              <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">บันทึกข้อมูล</button>
            </forn>
        </div>
    </div>
  )
}
