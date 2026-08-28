"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [gameIdInput, setGameIdInput] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("qr");

  // เพิ่ม State สำหรับจัดการยอดเครดิตของผู้ใช้
  const [userCredit, setUserCredit] = useState(199731);

  useEffect(() => {
    const loadCredit = () => {
      const savedCredit = localStorage.getItem("user_credit");
      if (savedCredit !== null) {
        setUserCredit(Number(savedCredit));
      } else {
        localStorage.setItem("user_credit", "199731");
      }
    };

    loadCredit();
    window.addEventListener("storage", loadCredit);
    return () => window.removeEventListener("storage", loadCredit);
  }, []);

  // เพิ่มรายการเกมและแอปพลิเคชันให้หลากหลายและครอบคลุมมากขึ้น
  const allServices = [
    {
      id: "val",
      name: "Valorant Points (VP)",
      category: "pc",
      badge: "ยอดฮิต 🔥",
      imageColor: "from-red-600 to-rose-950",
      icon: "🎯",
      description: "เติมเข้าไอดีเกม Valorant โซนไทย (Riot ID) ได้รับรวดเร็วทันใจ",
      packages: [
        { id: "v1", name: "325 VP", price: 115 },
        { id: "v2", name: "675 VP", price: 225 },
        { id: "v3", name: "1,325 VP", price: 445 },
        { id: "v4", name: "2,050 VP", price: 675 },
        { id: "v5", name: "3,650 VP", price: 1150 },
        { id: "v6", name: "5,350 VP", price: 1650 },
        { id: "v7", name: "11,000 VP", price: 3350 },
      ]
    },
    {
      id: "roblox",
      name: "Roblox Robux",
      category: "pc",
      badge: "คุ้มค่า ⚡",
      imageColor: "from-blue-700 to-indigo-950",
      icon: "🧱",
      description: "เติม Robux เข้าไอดี Roblox ปลอดภัย ได้ไว ไว้ใจได้ 100%",
      packages: [
        { id: "r1", name: "400 Robux", price: 135 },
        { id: "r2", name: "800 Robux", price: 265 },
        { id: "r3", name: "1,200 Robux", price: 395 },
        { id: "r4", name: "1,700 Robux", price: 550 },
        { id: "r5", name: "2,400 Robux", price: 770 },
        { id: "r6", name: "4,500 Robux", price: 1420 },
        { id: "r7", name: "10,000 Robux", price: 3100 },
      ]
    },
    {
      id: "hsr",
      name: "Honkai: Star Rail",
      category: "pc",
      badge: "เกมใหม่ 🌟",
      imageColor: "from-violet-700 to-purple-950",
      icon: "🚂",
      description: "เติม Oneiric Shard และ Express Supply Pass สะดวก ปลอดภัย",
      packages: [
        { id: "h1", name: "บัตร Express Pass", price: 159 },
        { id: "h2", name: "60 Shards", price: 32 },
        { id: "h3", name: "300 Shards", price: 165 },
        { id: "h4", name: "980 Shards", price: 495 },
        { id: "h5", name: "1,980 Shards", price: 990 },
        { id: "h6", name: "3,280 Shards", price: 1650 },
        { id: "h7", name: "6,480 Shards", price: 3250 },
      ]
    },
    {
      id: "genshin",
      name: "Genshin Impact",
      category: "pc",
      badge: "ยอดนิยม",
      imageColor: "from-cyan-700 to-teal-950",
      icon: "✨",
      description: "เติมคริสตัลและพรพระจันทร์เสี้ยว (Welkin Moon) ปลอดภัย 100%",
      packages: [
        { id: "g1", name: "พรพระจันทร์เสี้ยว (Welkin)", price: 159 },
        { id: "g2", name: "60 Crystals", price: 32 },
        { id: "g3", name: "300 Crystals", price: 165 },
        { id: "g4", name: "980 Crystals", price: 495 },
        { id: "g5", name: "1,980 Crystals", price: 990 },
        { id: "g6", name: "3,280 Crystals", price: 1650 },
        { id: "g7", name: "6,480 Crystals", price: 3250 },
      ]
    },
    {
      id: "ff",
      name: "Free Fire (เพชร)",
      category: "mobile",
      badge: "ฮิตในมือถือ",
      imageColor: "from-amber-600 to-orange-950",
      icon: "🔥",
      description: "เติมเพชร Free Fire ด้วย Player ID เติมไว ไม่ต้องใช้รหัสผ่าน",
      packages: [
        { id: "f1", name: "111 เพชร", price: 32 },
        { id: "f2", name: "355 เพชร", price: 95 },
        { id: "f3", name: "720 เพชร", price: 189 },
        { id: "f4", name: "1,450 เพชร", price: 375 },
        { id: "f5", name: "2,180 เพชร", price: 565 },
        { id: "f6", name: "3,640 เพชร", price: 935 },
        { id: "f7", name: "7,280 เพชร", price: 1850 },
      ]
    },
    {
      id: "rov",
      name: "RoV (คูปอง)",
      category: "mobile",
      badge: "MOBA",
      imageColor: "from-sky-600 to-blue-950",
      icon: "⚔️",
      description: "เติมคูปอง RoV การันตีเข้าชัวร์ 100% ผ่าน OpenID หรือ Garena",
      packages: [
        { id: "rv1", name: "40 คูปอง", price: 35 },
        { id: "rv2", name: "95 คูปอง", price: 79 },
        { id: "rv3", name: "215 คูปอง", price: 175 },
        { id: "rv4", name: "470 คูปอง", price: 350 },
        { id: "rv5", name: "975 คูปอง", price: 700 },
        { id: "rv6", name: "2,020 คูปอง", price: 1400 },
        { id: "rv7", name: "4,250 คูปอง", price: 2850 },
      ]
    },
    {
      id: "mlbb",
      name: "Mobile Legends (Diamonds)",
      category: "mobile",
      badge: "ยอดฮิต",
      imageColor: "from-blue-800 to-cyan-950",
      icon: "🛡️",
      description: "เติมเพชร Mobile Legends: Bang Bang รวดเร็ว ปลอดภัย",
      packages: [
        { id: "m1", name: "86 Diamonds", price: 35 },
        { id: "m2", name: "172 Diamonds", price: 70 },
        { id: "m3", name: "257 Diamonds", price: 105 },
        { id: "m4", name: "706 Diamonds", price: 275 },
        { id: "m5", name: "2195 Diamonds", price: 850 },
      ]
    },
    {
      id: "minecraft",
      name: "Minecraft Java & Bedrock",
      category: "pc",
      badge: "แซนด์บ็อกซ์",
      imageColor: "from-emerald-700 to-green-950",
      icon: "⛏️",
      description: "ซื้อไอดีแท้ Minecraft พีซี สลับเล่นได้ทั้ง Java และ Bedrock Edition",
      packages: [
        { id: "mc1", name: "Minecraft Key (Global)", price: 790 },
        { id: "mc2", name: "Minecoins 1,720 Coins", price: 350 },
        { id: "mc3", name: "Minecoins 3,500 Coins", price: 690 },
      ]
    },
    {
      id: "steam",
      name: "Steam Wallet Card (THB)",
      category: "giftcard",
      badge: "แนะนำ",
      imageColor: "from-slate-800 to-zinc-950",
      icon: "💳",
      description: "รหัสเติมเงินกระเป๋า Steam โซนไทย ส่งโค้ดไวอัตโนมัติ 24 ชม.",
      packages: [
        { id: "s1", name: "Steam Wallet 50฿", price: 55 },
        { id: "s2", name: "Steam Wallet 200฿", price: 210 },
        { id: "s3", name: "Steam Wallet 350฿", price: 365 },
        { id: "s4", name: "Steam Wallet 1,000฿", price: 1030 },
        { id: "s5", name: "Steam Wallet 2,000฿", price: 2050 },
      ]
    },
    {
      id: "fifa",
      name: "EA FC Online (FC)",
      category: "pc",
      badge: "กีฬา",
      imageColor: "from-indigo-700 to-slate-950",
      icon: "⚽",
      description: "เติมพอยท์ FC สำหรับเปิดแพ็กเกจนักเตะใน EA FC Online",
      packages: [
        { id: "fc1", name: "140 FC", price: 50 },
        { id: "fc2", name: "350 FC", price: 125 },
        { id: "fc3", name: "740 FC", price: 250 },
        { id: "fc4", name: "1,550 FC", price: 500 },
        { id: "fc5", name: "3,250 FC", price: 1000 },
      ]
    },
    {
      id: "discord",
      name: "Discord Nitro",
      category: "streaming",
      badge: "พิเศษ",
      imageColor: "from-indigo-600 to-blue-950",
      icon: "🤖",
      description: "อัปเกรด Discord Nitro ปลดล็อกสติกเกอร์ แชร์จอชัดๆ และอีโมจิเพียบ",
      packages: [
        { id: "d1", name: "Nitro Basic (1 เดือน)", price: 89 },
        { id: "d2", name: "Nitro Classic (1 เดือน)", price: 139 },
        { id: "d3", name: "Nitro Boost Full (1 เดือน)", price: 269 },
      ]
    },
    {
      id: "spotify",
      name: "Spotify Premium",
      category: "streaming",
      badge: "ฟังเพลง",
      imageColor: "from-green-600 to-emerald-950",
      icon: "🎧",
      description: "ฟังเพลงแบบไม่มีโฆษณาคั่น ข้ามเพลงได้ไม่จำกัด คุณภาพเสียงระดับ Hi-Fi",
      packages: [
        { id: "sp1", name: "รายบุคคล 1 เดือน", price: 69 },
        { id: "sp2", name: "รายบุคคล 3 เดือน", price: 189 },
        { id: "sp3", name: "แบบหารครอบครัว 1 ปี", price: 450 },
      ]
    },
    {
      id: "netflix",
      name: "Netflix Premium",
      category: "streaming",
      badge: "บันเทิง",
      imageColor: "from-red-800 to-stone-950",
      icon: "🎬",
      description: "บริการสตรีมมิ่งซีรีส์ หนังดัง คมชัด Ultra HD 4K",
      packages: [
        { id: "n1", name: "หารจอ 1 เดือน (ส่วนตัว)", price: 119 },
        { id: "n2", name: "หารจอ 3 เดือน", price: 330 },
        { id: "n3", name: "บัญชีส่วนตัว 1 เดือน (Ultra HD)", price: 410 },
      ]
    },
    {
      id: "youtube",
      name: "YouTube Premium",
      category: "streaming",
      badge: "ยอดนิยม",
      imageColor: "from-rose-700 to-red-950",
      icon: "▶️",
      description: "ดูยูทูปแบบไม่มีโฆษณาคั่น เล่นพื้นหลังได้ และฟังเพลงผ่าน YouTube Music",
      packages: [
        { id: "yt1", name: "แบบเชิญเข้าครอบครัว 1 เดือน", price: 45 },
        { id: "yt2", name: "แบบเชิญเข้าครอบครัว 6 เดือน", price: 220 },
        { id: "yt3", name: "แบบเชิญเข้าครอบครัว 1 ปี", price: 390 },
      ]
    }
  ];

  const filteredServices = allServices.filter(item => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchKeyword = item.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  const handleOpenModal = (game) => {
    setActiveModal(game);
    setSelectedPackage(game.packages[0]);
    setGameIdInput("");
    setPaymentMethod("qr"); 
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!gameIdInput.trim() || !activeModal || !selectedPackage) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (paymentMethod === "banking") {
      if (userCredit < selectedPackage.price) {
        alert("ยอดเครดิตของคุณไม่เพียงพอ กรุณาเลือกช่องทางอื่น");
        return;
      }
    }

    const now = new Date();
    const timeString = now.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) + " - " + now.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " น.";

    const paymentText = 
      paymentMethod === "qr" ? "QR PromptPay" : 
      paymentMethod === "wallet" ? "TrueMoney Wallet" : "Mobile Banking (เครดิต)";

    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      gameName: activeModal.name,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      targetId: gameIdInput,
      date: timeString,
      payment: paymentText,
      status: paymentMethod === "banking" ? "สำเร็จ" : "pending",
    };

    setActiveModal(null);

    if (paymentMethod === "banking") {
      const remainingCredit = userCredit - selectedPackage.price;
      setUserCredit(remainingCredit);
      localStorage.setItem("user_credit", remainingCredit.toString());
      window.dispatchEvent(new Event("storage"));

      const existingOrders = JSON.parse(localStorage.getItem("game_orders") || "[]");
      localStorage.setItem("game_orders", JSON.stringify([newOrder, ...existingOrders]));
      
      alert(`หักเครดิตสำเร็จ! คงเหลือ ${remainingCredit.toLocaleString()} บาท`);
      router.push("/history");
    } else {
      localStorage.setItem("pending_payment", JSON.stringify(newOrder));
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-6 sm:p-12">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        
        {/* Header พร้อมกล่องแสดงยอดเครดิตคงเหลือ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div>
            <Link href="/" className="text-xs text-blue-400 font-bold hover:underline">&larr; กลับสู่หน้าแรก</Link>
            <h1 className="text-3xl font-black text-white mt-2">ศูนย์รวมบริการเติมเกม & ซอฟต์แวร์</h1>
            <p className="text-slate-400 text-sm">เลือกเกมหรือบริการที่คุณต้องการ เติมไว ปลอดภัย ได้รับเครดิตชัวร์ 100% ตลอด 24 ชม.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl">
              <p className="text-[10px] text-slate-400">เครดิตคงเหลือของคุณ</p>
              <p className="text-xl font-black text-emerald-400">฿{userCredit.toLocaleString()}</p>
            </div>

            <Link
              href="/history"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap"
            >
              <span>ไปหน้าประวัติ</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Categories & Search */}
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            {[
              { id: "all", label: "ทั้งหมด" },
              { id: "pc", label: "เกม PC / คอนโซล" },
              { id: "mobile", label: "เกมมือถือ" },
              { id: "giftcard", label: "บัตรเติมเงิน / ไอเทม" },
              { id: "streaming", label: "สตรีมมิ่ง & อื่นๆ" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input 
              type="text"
              placeholder="ค้นหาเกม, บัตรเติมเงิน..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs w-full focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((game) => (
            <div 
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className={`h-32 rounded-2xl bg-gradient-to-r ${game.imageColor} p-5 flex flex-col justify-between text-white shadow-md relative overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold border border-white/15">
                      {game.badge}
                    </span>
                    <span className="text-2xl">{game.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-wide">{game.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {game.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenModal(game)}
                className="w-full bg-slate-800 hover:bg-blue-600 text-white text-xs font-black py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-blue-600"
              >
                <span>เลือกแพ็กเกจเติมเงิน</span>
                <span>&rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <p className="text-2xl">&#128269;</p>
            <p className="text-slate-200 font-bold text-sm">ไม่พบเกมหรือบริการที่คุณค้นหา</p>
            <p className="text-slate-500 text-xs">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่นี้ดูครับ</p>
          </div>
        )}

      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-1 rounded-lg font-bold">ยืนยันคำสั่งซื้อ</span>
                <h2 className="text-2xl font-black text-white mt-1">{activeModal.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeModal.description}</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">กรอกไอดีผู้ใช้ / Riot ID / UID / ลิงก์โปรไฟล์</label>
                <input 
                  type="text"
                  required
                  placeholder="เช่น PlayerName#1234 หรือ UID 12345678"
                  value={gameIdInput}
                  onChange={(e) => setGameIdInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">เลือกแพ็กเกจราคา</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                  {activeModal.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        selectedPackage?.id === pkg.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/50"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-xs font-black">{pkg.name}</span>
                      <span className={`text-xs font-bold mt-1 ${selectedPackage?.id === pkg.id ? "text-blue-100" : "text-blue-400"}`}>
                        ฿{pkg.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* เลือกช่องทางชำระเงิน */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">ช่องทางการชำระเงิน</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "qr", label: "QR PromptPay" },
                    { id: "wallet", label: "TrueMoney" },
                    { id: "banking", label: `เครดิต (มี ${userCredit.toLocaleString()} ฿)` },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                        paymentMethod === pay.id
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">ยอดที่ต้องชำระสุทธิ</p>
                  <p className="text-xl font-black text-blue-400">฿{selectedPackage?.price.toLocaleString()}</p>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-900/40 transition text-xs cursor-pointer"
                >
                  {paymentMethod === "banking" ? "ยืนยันชำระด้วยเครดิต" : "ไปหน้าชำระเงิน &rarr;"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}