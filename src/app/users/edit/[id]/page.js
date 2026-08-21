"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const API_URL = "https://api.itdev.cmtc.ac.th/users";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // ดึง ID จาก URL เช่น /users/edit/1

  // ============================================================
  // Hook ทุกตัวอยู่บนสุด ห้ามมี return มาคั่นกลาง
  // ============================================================
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: "",
  });

  // ============================================================
  // ฟังก์ชันดึงเฉพาะ id ที่กำลังแก้ไข แล้วเติมค่าลงฟอร์ม
  // ============================================================
  const fetchUser = async () => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();

      setForm({
        txt_firstname: data.firstname ?? "",
        txt_lastname: data.lastname ?? "",
        txt_username: data.username ?? "",
        txt_password: "", // ไม่ดึงรหัสผ่านเดิมกลับมาแสดง
      });
    } catch (error) {
      setIsError(true);
      await Swal.fire({ icon: "warning", title: "ไม่สามารถโหลดข้อมูลได้" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================================
  // เพิ่มฟังก์ชันตรวจสอบความถูกต้องของฟอร์มก่อนส่งข้อมูล
  // ============================================================
  const validateForm = () => {
    if (!form.txt_firstname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุชื่อ",
        text: "กรุณากรอกชื่อ",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    if (!form.txt_lastname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุนามสกุล",
        text: "กรุณากรอกนามสกุล",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    if (!form.txt_username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุ Username",
        text: "กรุณากรอก Username",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    return true;
  };

  // ============================================================
  // ฟังก์ชันสำหรับการอัปเดตข้อมูล (handleUpdate)
  // ============================================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSaving(true);

      // ถ้าไม่ได้กรอกรหัสผ่านใหม่ จะไม่ส่งฟิลด์นี้ไป
      // ป้องกันการทับรหัสผ่านเดิมด้วยค่าว่าง
      const payload = {
        firstname: form.txt_firstname,
        lastname: form.txt_lastname,
        username: form.txt_username,
      };
      if (form.txt_password) {
        payload.password = form.txt_password;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // .catch(() => ({})) กันกรณี server ไม่ได้ส่ง JSON กลับมา
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ!",
          text: "ปรับปรุงข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonColor: "#2E75B6",
        });

        router.push("/users"); // กลับไปหน้ารายชื่อ
        return;
      }

      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fe0505",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `บันทึกไม่สำเร็จ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      // เข้าที่นี่เฉพาะตอนยิง request ไม่ถึง server เลย
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#fc006dcc",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // Early Return วางไว้หลัง hook และฟังก์ชันทั้งหมด
  // ============================================================
  if (isLoading) return <p className="p-6 text-white text-center">กำลังโหลดข้อมูล...</p>;
  if (isError) return <p className="p-6 text-red-500 text-center">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center py-16 px-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/10 overflow-hidden transform transition-all duration-300">
        
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-8 py-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
          
          <h1 className="text-3xl font-extrabold text-white tracking-wide relative z-10">
            แก้ไขข้อมูลสมาชิก
          </h1>
          <p className="text-blue-100 text-sm mt-1.5 relative z-10 font-light">
            ปรับปรุงข้อมูลผู้ใช้ในระบบ JukJikSHOP
          </p>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>ชื่อ</label>
              <input type="text" name="txt_firstname" value={form.txt_firstname} onChange={handleChange} className={inputClass} placeholder='Firstname' required />
            </div>
            <div>
              <label className={labelClass}>นามสกุล</label>
              <input type="text" name="txt_lastname" value={form.txt_lastname} onChange={handleChange} className={inputClass} placeholder='Lastname' required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Username</label>
            <input type="text" name="txt_username" value={form.txt_username} onChange={handleChange} className={inputClass} placeholder='Username' required />
          </div>

          <div>
            <label className={labelClass}>Password (เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</label>
            <input type="password" name="txt_password" value={form.txt_password} onChange={handleChange} className={inputClass} placeholder='••••••••' />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {isSaving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
            </button>
            <button 
              type="button" 
              onClick={() => router.push("/users")}
              className="px-6 py-3.5 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-200"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}