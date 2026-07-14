import { motion } from "motion/react";
import { 
  Car, 
  Keyboard, 
  Bed, 
  Cat, 
  Armchair, 
  Grid, 
  Wind, 
  Laptop,
  AlertCircle
} from "lucide-react";

export default function Problems() {
  const problems = [
    {
      id: "car",
      title: "Bụi trong ô tô",
      desc: "Tàn thuốc, cát sỏi, và vụn thức ăn rơi sâu trong các rãnh da ghế, rãnh để cốc và sàn thảm nỉ cực kỳ nhếch nhác.",
      icon: <Car className="w-6 h-6" />,
      tag: "Car Interior"
    },
    {
      id: "keyboard",
      title: "Bàn phím bẩn",
      desc: "Vụn bánh mỳ, da chết và tơ bụi lọt thỏm dưới kẽ phím cơ, làm giảm cảm giác gõ, kẹt phím và tích tụ hàng triệu vi khuẩn.",
      icon: <Keyboard className="w-6 h-6" />,
      tag: "Keyboard Crevices"
    },
    {
      id: "bed",
      title: "Giường nệm",
      desc: "Mạt bụi nhà siêu nhỏ ẩn mình sâu trong ga trải giường, nệm ngủ đe dọa trực tiếp đến hệ hô hấp nhạy cảm của trẻ nhỏ.",
      icon: <Bed className="w-6 h-6" />,
      tag: "Bed & Linen"
    },
    {
      id: "pets",
      title: "Lông thú cưng",
      desc: "Lông chó mèo bay lơ lửng, găm chặt vào thảm trải sàn, quần áo và chăn gối dọn hoài dọn mãi vẫn không hết.",
      icon: <Cat className="w-6 h-6" />,
      tag: "Pet Shedding"
    },
    {
      id: "sofa",
      title: "Ghế sofa",
      desc: "Mảnh vụn bánh quy, hạt dưa bám sâu ở khe gập sườn ghế sofa – nơi mà chổi quét thông thường đành phải đầu hàng.",
      icon: <Armchair className="w-6 h-6" />,
      tag: "Sofa Gaps"
    },
    {
      id: "doors",
      title: "Khe cửa trượt",
      desc: "Bụi đất mưa bám tụ két đen đóng bánh trong các đường rãnh ray cửa nhôm kính cực kỳ mất thẩm mỹ và kẹt ray.",
      icon: <Grid className="w-6 h-6" />,
      tag: "Sliding Rails"
    },
    {
      id: "ac",
      title: "Điều hòa bám bụi",
      desc: "Tấm lọc và lá tản nhiệt điều hòa phủ kín mảng bám bụi bẩn, thổi ra luồng khí có mùi hôi hám và hao tốn điện năng.",
      icon: <Wind className="w-6 h-6" />,
      tag: "Air Conditioner"
    },
    {
      id: "desk",
      title: "Bàn làm việc",
      desc: "Giấy vụn, bột gôm tẩy, và bụi mịn phân tán khắp mặt bàn máy tính, góc hẹp sau màn hình và đống dây điện chằng chịt.",
      icon: <Laptop className="w-6 h-6" />,
      tag: "Workstation"
    }
  ];

  return (
    <section id="problems" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            NỖI ĐAU DỌN DẸP THƯỜNG NHẬT
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4"
          >
            Bạn có đang gặp những vấn đề này?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500"
          >
            Sử dụng chổi truyền thống hay khăn lau không thể làm sạch được những hạt bụi mịn bám sâu và các ngóc ngách hẹp, phức tạp.
          </motion.p>
        </div>

        {/* Problems Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-700 border border-gray-200/50 group-hover:bg-brand group-hover:text-white group-hover:border-transparent transition-all duration-300 mb-5">
                  {problem.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-display flex items-center justify-between">
                  {problem.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed">
                  {problem.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                  {problem.tag}
                </span>
                <span className="text-xs font-semibold text-brand/0 group-hover:text-brand transition-all duration-300">
                  Cần giải pháp →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition callout */}
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">ĐỪNG LO LẮNG</p>
          <p className="text-lg font-medium text-gray-800">
            DODOTO mang tới kỷ nguyên vệ sinh di động mới, dẹp tan mọi phiền toái trên chỉ trong một nốt nhạc...
          </p>
        </div>

      </div>
    </section>
  );
}
