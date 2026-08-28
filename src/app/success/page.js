import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
        
        <div className="w-20 h-20 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center text-4xl mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          ✓
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white">สั่งซื้อสำเร็จแล้วครับ!</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            ระบบได้รับข้อมูลและสลิปการโอนเงินของคุณเรียบร้อยแล้ว แอดมินกำลังตรวจสอบและเติมเกมให้ภายใน 1-3 นาทีครับ
          </p>
        </div>

        <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 text-xs text-gray-400 space-y-1">
          <p>สถานะ: <span className="text-yellow-400 font-bold">รอตรวจสอบสลิป</span></p>
          <p>คุณสามารถติดตามสถานะหรือสอบถามได้ทางแชทเพจ</p>
        </div>

        <div className="pt-4 space-y-3">
          <Link 
            href="/"
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gray-950 font-extrabold py-3.5 rounded-xl shadow-lg transition block"
          >
            🏠 กลับสู่หน้าแรก
          </Link>
          <Link 
            href="/services"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition block text-sm"
          >
            🎮 เติมเกมอื่นต่อ
          </Link>
        </div>

      </div>
    </div>
  );
}