import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingCart, ShieldAlert, Sparkles, Flame, Clock } from "lucide-react";

interface CTAProps {
  onOpenCheckout: () => void;
}

export default function CTA({ onOpenCheckout }: CTAProps) {
  // 3-hour countdown timer for flash sale FOMO
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 45 * 60 + 12); // 2h 45m 12s in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return 2 * 3600 + 45 * 60 + 12; // loop for demonstration
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: h.toString().padStart(2, "0"),
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section id="cta-bottom" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      
      {/* Intense red radial backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* FOMO Flash Sale Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand text-white text-xs font-extrabold tracking-wider mb-6 shadow-lg shadow-brand/15 font-mono uppercase"
        >
          <Flame className="w-4 h-4 fill-current animate-bounce text-amber-300" />
          FLASH SALE CHỈ TRONG HÔM NAY
        </motion.div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
          Nâng cấp trải nghiệm vệ sinh<br />ngay hôm nay.
        </h2>

        {/* Countdown timer with premium brand red cards */}
        <div className="flex items-center justify-center gap-3 mb-10 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <span className="bg-brand text-white rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center font-mono font-bold text-2xl sm:text-3xl shadow-lg shadow-brand/15 border border-transparent">
              {hours}
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1.5 font-bold">Giờ</span>
          </div>
          <span className="text-2xl text-brand font-mono font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-brand text-white rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center font-mono font-bold text-2xl sm:text-3xl shadow-lg shadow-brand/15 border border-transparent">
              {minutes}
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1.5 font-bold">Phút</span>
          </div>
          <span className="text-2xl text-brand font-mono font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-brand text-white rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center font-mono font-bold text-2xl sm:text-3xl shadow-lg shadow-brand/15 border border-transparent">
              {seconds}
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1.5 font-bold">Giây</span>
          </div>
        </div>

        {/* Clean, high-converting price comparison box with Red border & White surface */}
        <div className="bg-white border-2 border-brand/20 rounded-3xl p-8 max-w-md mx-auto mb-10 shadow-xl relative before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 before:bg-brand before:rounded-t-2xl">
          <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Mức Giá Ưu Đãi Độc Quyền</p>
          
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-base sm:text-lg text-gray-450 line-through decoration-brand decoration-2 font-medium">
              1.000.000đ
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-brand font-mono tracking-tight flex items-baseline">
              595.000đ
            </span>
            <span className="bg-brand text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-md animate-pulse">
              -40%
            </span>
          </div>

          <p className="text-xs text-emerald-600 font-bold mb-5">
            ✓ Tiết kiệm ngay 405.000đ và nhận trọn bộ quà tặng
          </p>

          <button
            onClick={onOpenCheckout}
            className="w-full bg-brand hover:bg-brand-hover text-white text-base sm:text-lg font-bold py-4 rounded-full shadow-lg shadow-brand/20 hover:shadow-2xl hover:shadow-brand/35 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 active:scale-98"
          >
            <ShoppingCart className="w-5 h-5" />
            ĐẶT HÀNG NGAY TRONG FLASH SALE
          </button>
        </div>

        {/* Small Trust footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand" />
            <span>Miễn phí vận chuyển toàn quốc</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Tặng kèm 8 đầu hút/thổi độc quyền</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-brand" />
            <span>1 Đổi 1 trong 30 ngày đầu</span>
          </div>
        </div>

      </div>
    </section>
  );
}
