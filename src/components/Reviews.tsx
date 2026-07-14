import { motion } from "motion/react";
import { Star, CheckCircle2, Quote, Heart } from "lucide-react";
import { REVIEWS_DATA } from "../data";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Decorative blurry nodes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Heart className="w-3.5 h-3.5" />
            KHÁCH HÀNG CHIA SẺ
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Đánh giá từ những khách hàng đã sử dụng sản phẩm
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Cảm nhận thực tế và những đánh giá trung thực từ những khách hàng đã trải nghiệm sản phẩm Dodoto Lux Air V5.
          </p>
        </div>

        {/* Aggregated Rating Bento Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-100 shadow-md text-center flex flex-col justify-center items-center">
            <span className="text-5xl font-extrabold text-gray-900 tracking-tight font-display mb-2">4.9</span>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">Tuyệt vời • Đánh giá thực tế</span>
            <p className="text-xs text-gray-400 mt-2">Điểm số hài lòng tuyệt đối được tổng hợp trực tiếp từ trải nghiệm thực tế của người dùng</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/60 rounded-2xl p-5 border border-gray-100 text-center">
              <span className="text-2xl font-bold text-gray-900 font-mono">98.5%</span>
              <p className="text-xs text-gray-500 mt-1 font-medium">Khách hàng sẽ giới thiệu cho người thân và bạn bè sử dụng</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-5 border border-gray-100 text-center">
              <span className="text-2xl font-bold text-gray-900 font-mono">99.2%</span>
              <p className="text-xs text-gray-500 mt-1 font-medium">Hài lòng về chất lượng đóng gói và dịch vụ giao hàng nhanh</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-5 border border-gray-100 text-center">
              <span className="text-2xl font-bold text-gray-900 font-mono">100%</span>
              <p className="text-xs text-gray-500 mt-1 font-medium">Bảo hành 24 tháng, dùng thử 15 ngày, đổi trả 30 ngày đầu</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid (Apple card layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md flex flex-col justify-between relative group"
            >
              {/* Giant elegant background quote symbol */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100/70 group-hover:text-red-50/70 transition-colors" />

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial body */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic mb-8">
                  "{review.text}"
                </p>
              </div>

              {/* Customer Profile Row */}
              <div className="flex items-center gap-4 relative z-10 border-t border-gray-100 pt-5">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-gray-900 font-display">
                      {review.name}
                    </span>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50/50 shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {review.role}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5">
                    Đã mua: {review.date}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
