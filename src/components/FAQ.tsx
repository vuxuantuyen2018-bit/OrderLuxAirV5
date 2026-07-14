import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, MessageCircleQuestion } from "lucide-react";
import { FAQ_DATA } from "../data";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-50/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            HỖ TRỢ KHÁCH HÀNG
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Giải Đáp Câu Hỏi Thường Gặp
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Dưới đây là tổng hợp những thắc mắc phổ biến nhất của quý khách hàng về siêu phẩm máy hút bụi Dodoto V5.
          </p>
        </div>

        {/* Elegant Accordion Stack */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openId === faq.id;
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "bg-white border-brand/20 shadow-lg shadow-brand/2" 
                    : "bg-white border-gray-200/60 hover:border-gray-400"
                }`}
              >
                {/* Header click bar */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 sm:py-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-3.5 items-center">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? "text-brand" : "text-gray-400"
                    }`} />
                    <span className="text-sm sm:text-base font-bold text-gray-900 font-display leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-brand" : ""
                  }`} />
                </button>

                {/* Animated expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 sm:pl-[50px] border-t border-gray-100 bg-gray-50/20">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support callout footer */}
        <div className="mt-12 text-center bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <span className="text-sm text-gray-600">Bạn vẫn còn băn khoăn?</span>
          <a 
            href="tel:0866106833" 
            className="text-brand font-bold ml-1 hover:underline text-sm inline-flex items-center gap-1.5"
          >
            Liên hệ Hotline tư vấn 24/7: 0866.106.833
          </a>
        </div>

      </div>
    </section>
  );
}
