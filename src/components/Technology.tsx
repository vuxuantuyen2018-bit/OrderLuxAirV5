import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, ShieldCheck, Eye, Compass, Info } from "lucide-react";
import { HOTSPOTS_DATA, IMAGES } from "../data";
import { HotspotItem } from "../types";

export default function Technology() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem>(HOTSPOTS_DATA[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<HotspotItem | null>(null);

  return (
    <section id="tech" className="py-24 bg-white text-gray-900 relative overflow-hidden">
      
      {/* Light subtle grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,35,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,35,42,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic ambient soft red glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider mb-4 font-mono"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            BẢN VẼ CHI TIẾT CẮT LỚP
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Đột Phá Công Nghệ Cắt Lớp
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Khám phá kiến trúc cơ khí chính xác bên trong Dodoto Lux Air V5. Di chuột vào các điểm định vị để xem chi tiết linh kiện.
          </p>
        </div>

        {/* Interactive Interactive Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Exploded View Image Container (Left/Center) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl border border-gray-200/80 bg-gray-50/50 p-4 sm:p-8 shadow-xl flex items-center justify-center">
              
              {/* Product Internal Image */}
              <img
                src={IMAGES.techExploded}
                alt="Dodoto Lux Air V5 Exploded View"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none max-h-[380px] opacity-95 transition-opacity group-hover:opacity-100"
              />

              {/* Pulsing Hotspots Layer */}
              {HOTSPOTS_DATA.map((spot) => {
                const isSelected = activeHotspot.id === spot.id;
                const isHovered = hoveredHotspot?.id === spot.id;

                return (
                  <div
                    key={spot.id}
                    className="absolute cursor-pointer z-20 group"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onMouseEnter={() => setHoveredHotspot(spot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={() => setActiveHotspot(spot)}
                  >
                    {/* Pulsing Outer Ring */}
                    <span className={`absolute -inset-2.5 rounded-full transition-all duration-300 ${
                      isSelected 
                        ? "bg-brand/30 animate-ping" 
                        : "bg-brand/10 group-hover:bg-brand/20 group-hover:animate-ping"
                    }`} />
                    
                    {/* Hotspot Core Dot */}
                    <span className={`relative flex items-center justify-center w-5 h-5 rounded-full shadow-md border transition-all duration-300 ${
                      isSelected 
                        ? "bg-brand border-white scale-120 text-white" 
                        : "bg-white border-brand text-brand group-hover:bg-brand group-hover:text-white"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </span>

                    {/* Miniature floating tooltip on hover */}
                    <AnimatePresence>
                      {isHovered && !isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white border border-gray-200 text-gray-900 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap z-30 shadow-lg"
                        >
                          {spot.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Floating interactive instructions badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-gray-500 font-medium shadow-xs">
                <Eye className="w-3.5 h-3.5 text-brand animate-pulse" />
                Click vào điểm sáng để giải mã linh kiện
              </div>
            </div>
          </div>

          {/* Technology Details Panel (Right Card) */}
          <div className="lg:col-span-4 flex flex-col h-full justify-between">
            
            <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-gray-100 transition-all duration-300 h-full flex flex-col justify-between relative before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 before:bg-brand before:rounded-t-3xl">
              
              <div>
                {/* Panel Label */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">
                    CHỈ SỐ CHI TIẾT
                  </span>
                  <Compass className="w-4 h-4 text-gray-400" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Component Name */}
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-1.5">
                      {activeHotspot.name}
                    </h3>
                    
                    {/* Technical spec code */}
                    <span className="inline-block text-xs font-mono font-medium text-brand mb-5 px-2.5 py-0.5 rounded bg-brand/5 border border-brand/10">
                      {activeHotspot.description}
                    </span>

                    {/* Detailed Explanation */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                      {activeHotspot.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Security & standards compliance indicators */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <span>Sản phẩm đạt kiểm định an toàn kỹ thuật quốc gia.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Info className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Thiết kế vỏ chống rò rỉ khí áp suất cao độc quyền.</span>
                </div>
              </div>

            </div>

            {/* Quick interactive shortcuts to select other hotspots */}
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center lg:justify-start">
              {HOTSPOTS_DATA.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`text-[10px] font-semibold font-mono tracking-wider px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer uppercase ${
                    activeHotspot.id === spot.id
                      ? "bg-brand border-transparent text-white shadow-lg shadow-brand/15"
                      : "bg-white border-gray-200 text-gray-500 hover:text-brand hover:border-brand"
                  }`}
                >
                  {spot.name.split(" ")[0]}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
