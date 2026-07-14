import React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Cpu, 
  Wind, 
  Unplug, 
  BatteryCharging, 
  VolumeX, 
  RefreshCw, 
  Usb, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { FEATURES_DATA } from "../data";

// Custom mapping to convert mock strings to lucide icons
const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  ShieldAlert: <Unplug className="w-6 h-6" />, // mapped to wireless / unplugged
  BatteryCharging: <BatteryCharging className="w-6 h-6" />,
  VolumeX: <VolumeX className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  Usb: <Usb className="w-6 h-6" />,
};

interface FeaturesProps {
  onOpenCheckout: () => void;
}

export default function Features({ onOpenCheckout }: FeaturesProps) {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            TÍNH NĂNG VƯỢT TRỘI
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Trang Bị Cao Cấp Vượt Tầm Giá
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Mỗi chi tiết trên Dodoto Lux Air V5 đều được tính toán tối ưu dựa trên nhu cầu sử dụng thực tế của khách hàng.
          </p>
        </div>

        {/* Features 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES_DATA.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px -15px rgba(216,31,38,0.08)",
                borderColor: "rgba(216,31,38,0.15)"
              }}
              className="bg-white border border-gray-100 rounded-3xl p-6.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/0 group-hover:bg-brand/3 rounded-full blur-2xl transition-all duration-300" />

              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-brand/5 group-hover:text-brand transition-colors duration-300 mb-6 border border-gray-100">
                  {iconMap[feat.iconName] || <Zap className="w-6 h-6" />}
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3.5 group-hover:text-brand transition-colors duration-200 font-display">
                  {feat.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Card Footer indicator */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-brand transition-colors duration-200">
                <span>Xem chi tiết</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Action Callout Card */}
        <div className="bg-gradient-to-r from-brand to-brand-hover text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-mono font-bold tracking-widest text-white/80 uppercase mb-2 block">
              ƯU ĐÃI FLASH SALE ĐẶC BIỆT
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Giảm ngay 40% trọn bộ sản phẩm và quà tặng cao cấp
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Đặt mua Dodoto Lux Air V5 hôm nay để nhận ngay bộ 8 đầu vòi hút/thổi chuyên dụng, củ sạc & cáp sạc Type-C và miễn phí vận chuyển toàn quốc với mọi đơn hàng.
            </p>
          </div>

          <div className="flex flex-col items-center shrink-0 w-full md:w-auto z-10">
            <button
              onClick={onOpenCheckout}
              className="w-full md:w-auto bg-white hover:bg-gray-100 text-brand text-base font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-center"
            >
              NHẬN ƯU ĐÃI NGAY
            </button>
            <span className="text-xs text-white/80 mt-3 font-medium">
              Chỉ áp dụng cho 100 khách hàng đặt mua đầu tiên trong hôm nay!
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
