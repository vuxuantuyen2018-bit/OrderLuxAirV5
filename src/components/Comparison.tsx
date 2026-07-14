import { motion } from "motion/react";
import { Check, X, Shield, Sparkles, AlertCircle, Award } from "lucide-react";
import { COMPARISON_DATA } from "../data";

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Visual ambient glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-50/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            SO SÁNH THÔNG MINH
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Tại Sao Nên Chọn Lux Air V5?
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Đặt lên bàn cân so sánh chi tiết để hiểu rõ vì sao Dodoto Lux Air V5 vượt trội hoàn toàn so với các phân khúc khác trên thị trường.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Tính năng / Tiêu chí</th>
                  
                  {/* Highlight Column Header for Lux Air V5 */}
                  <th className="p-6 text-center bg-brand/[0.02] border-x border-brand/10 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand" />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-[10px] font-bold font-mono uppercase mb-2">
                      ĐỀ XUẤT NÊN MUA
                    </span>
                    <h4 className="text-base font-bold text-gray-900 font-display">DODOTO LUX AIR V5</h4>
                  </th>
                  
                  <th className="p-6 text-center text-gray-500">
                    <h4 className="text-sm font-semibold font-display">Máy hút bụi mini giá rẻ</h4>
                    <span className="text-[10px] text-gray-400 font-medium">Khoảng 150K - 300K</span>
                  </th>
                  
                  <th className="p-6 text-center text-gray-500">
                    <h4 className="text-sm font-semibold font-display">Máy hút bụi truyền thống</h4>
                    <span className="text-[10px] text-gray-400 font-medium">Phân khúc cồng kềnh</span>
                  </th>
                </tr>
              </thead>
              
              <tbody>
                {COMPARISON_DATA.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-gray-100 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                    }`}
                  >
                    {/* Feature Label */}
                    <td className="p-6 text-sm font-semibold text-gray-800 font-display">
                      {row.feature}
                    </td>

                    {/* Dodoto Lux Air V5 Core cell */}
                    <td className="p-6 text-center bg-brand/[0.015] border-x border-brand/5">
                      <div className="flex flex-col items-center justify-center">
                        <span className="p-1 rounded-full bg-brand/5 text-brand mb-1.5 inline-block">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {row.luxAir}
                        </span>
                      </div>
                    </td>

                    {/* Cheap generic mini */}
                    <td className="p-6 text-center">
                      <div className="flex flex-col items-center justify-center opacity-70">
                        <span className="p-1 rounded-full bg-red-50 text-red-500 mb-1.5 inline-block">
                          <X className="w-4 h-4" />
                        </span>
                        <span className="text-sm text-gray-500">
                          {row.cheapHandheld}
                        </span>
                      </div>
                    </td>

                    {/* Traditional large corded */}
                    <td className="p-6 text-center">
                      <div className="flex flex-col items-center justify-center opacity-70">
                        <span className="p-1 rounded-full bg-amber-50 text-amber-500 mb-1.5 inline-block">
                          <AlertCircle className="w-4 h-4" />
                        </span>
                        <span className="text-sm text-gray-500">
                          {row.traditionalVac}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Quick takeaway bar beneath comparison table */}
          <div className="bg-brand/5 px-6 py-5 border-t border-brand/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-brand">
              <Shield className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold font-display">
                Cam kết chất lượng: Hoàn tiền 100% nếu phát hiện hàng nhái, hàng kém chất lượng.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium font-mono">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              THƯƠNG HIỆU DODOTO VIỆT NAM CHÍNH HÃNG
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
