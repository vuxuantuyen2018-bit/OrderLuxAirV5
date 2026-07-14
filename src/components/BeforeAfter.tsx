import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Eye, Layers, Sparkles } from "lucide-react";
import { BEFORE_AFTER_SCENARIOS } from "../data";

export default function BeforeAfter() {
  const [activeScenarioId, setActiveScenarioId] = useState(BEFORE_AFTER_SCENARIOS[0].id);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeScenario = BEFORE_AFTER_SCENARIOS.find((s) => s.id === activeScenarioId) || BEFORE_AFTER_SCENARIOS[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="before-after" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Layers className="w-3.5 h-3.5" />
            HIỆU QUẢ TRỰC QUAN
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Hiệu Quả Làm Sạch Thực Tế
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Kéo thanh trượt qua trái/phải để kiểm chứng sức mạnh dọn dẹp tuyệt đối của Dodoto Lux Air V5 trên các loại chất liệu và vị trí khó nhằn.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {BEFORE_AFTER_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenarioId(scenario.id);
                setSliderPosition(50); // reset slider to center on switch
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold font-display tracking-wide border cursor-pointer transition-all duration-300 ${
                activeScenarioId === scenario.id
                  ? "bg-brand border-transparent text-white shadow-lg shadow-brand/15"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        {/* Interactive Before/After Slider Component */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl select-none cursor-ew-resize bg-gray-100"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* AFTER (Cleaned) Image - Base Background */}
          <img
            src={activeScenario.afterImg}
            alt="After Cleaned"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          
          {/* AFTER Badges (Bottom Right) */}
          <div className="absolute bottom-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {activeScenario.labelAfter}
          </div>

          {/* BEFORE (Dirty) Image - Clipped Overlay */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeScenario.beforeImg}
              alt="Before Dirty"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ width: containerRef.current?.getBoundingClientRect().width }}
            />
            
            {/* BEFORE Badges (Bottom Left) */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-lg whitespace-nowrap">
              TRƯỚC: {activeScenario.labelBefore}
            </div>
          </div>

          {/* SLIDER SEPARATOR LINE & HANDLE */}
          <div 
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Red Circular Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
              </svg>
            </div>
          </div>

          {/* Floating Slider Help Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-gray-100 text-gray-700 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-brand animate-pulse" />
            Kéo núm đỏ để so sánh
          </div>

        </div>

      </div>
    </section>
  );
}
