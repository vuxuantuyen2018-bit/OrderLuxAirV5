import { motion } from "motion/react";
import { Check, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";
import { IMAGES } from "../data";

export default function Solution() {
  return (
    <section id="solution" className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            GIẢI PHÁP ĐỘT PHÁ 2026
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Một chiếc máy – Làm sạch mọi nơi.
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            Dodoto Lux Air V5 phá vỡ ranh giới của những chiếc máy hút bụi cầm tay truyền thống nhờ sự kết hợp khí động học đỉnh cao.
          </p>
        </div>

        {/* Zig-Zag Row 1: Image Left, Content Right (2-in-1 Suction & Blowing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 group flex items-center justify-center">
              <img
                src={IMAGES.blowAction}
                alt="Dodoto Lux Air V5 2-in-1 Hút và Thổi"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain bg-white group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand text-white text-xs font-semibold font-mono px-3 py-1.5 rounded-full shadow-lg">
                ĐỘC QUYỀN HÚT & THỔI
              </div>
            </div>
            {/* Visual background badge decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand/5 -z-10 rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-brand" />
              <span className="text-xs font-mono font-bold uppercase text-brand tracking-widest">Sức mạnh đa năng</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Công nghệ Dual-Storm 2 trong 1:<br />
              Phía trước HÚT cực mạnh – Phía sau THỔI siêu tốc
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Không chỉ dừng lại ở chức năng hút bụi truyền thống, Dodoto Lux Air V5 tích hợp cổng thổi áp lực ở phần đuôi máy. Bạn có thể sử dụng máy để thổi bay mạng nhện, dọn sạch kẽ phím máy tính bám bẩn hoặc biến máy thành một chiếc bơm khí điện tử tiện lợi để bơm phao bơi, bóng bay cực nhanh.
            </p>

            <ul className="space-y-3.5">
              {[
                "Lực hút xoáy Cyclone 30.000Pa cuốn trôi tàn thuốc, đinh ốc, mảnh vụn.",
                "Đầu thổi khí nén hội tụ thổi bay mạt bụi bám két trong khe hẹp taplo.",
                "Tháo lắp các đầu chuyển đổi nhanh chỉ trong 2 giây.",
                "Tự dọn sạch tấm lọc HEPA bằng chính luồng khí thổi cực mạnh của máy."
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-500 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Zig-Zag Row 2: Image Right, Content Left (Luxury Portability & Accessories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-brand" />
              <span className="text-xs font-mono font-bold uppercase text-brand tracking-widest">Trọn bộ phụ kiện</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Phụ kiện tháo lắp đa năng<br />
              Thiết kế không dây, dọn dẹp không giới hạn
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Với thiết kế tay cầm công thái học cân bằng lực trọng tâm, trọng lượng chỉ vỏn vẹn 400g cho phép bạn giơ cao dọn dẹp quạt thông gió, rèm cửa hay trần nhà cả tiếng đồng hồ mà không lo mỏi khớp cổ tay. Đi kèm trọn bộ đầu hút, đầu thổi chuyên dụng thông minh.
            </p>

            <ul className="space-y-3.5">
              {[
                "Đầu hút khe dẹp siêu dài luồn lách khe ghế da ô tô, gầm giường hẹp.",
                "Đầu hút chổi lông mềm quét dọn bàn phím, ghế Sofa nỉ êm dịu không trầy xước.",
                "Ống nối dài khí động học giúp vươn xa tới các góc điều hòa treo tường.",
                "Thiết kế hộp chứa bụi tháo lắp 1 chạm sạch sẽ, không bẩn tay."
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-500 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 group flex items-center justify-center">
              <img
                src={IMAGES.solutionLifestyle}
                alt="Trọn bộ phụ kiện Dodoto Lux Air V5"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain bg-white group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                VẬT LIỆU ABS CHỐNG CHÁY CAO CẤP
              </div>
            </div>
            {/* Visual background badge decoration */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-200/50 -z-10 rounded-2xl" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
