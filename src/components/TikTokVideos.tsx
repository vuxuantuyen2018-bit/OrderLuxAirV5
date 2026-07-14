import { motion } from "motion/react";
import { Play, Eye, Clock, MessageSquareHeart } from "lucide-react";
import { TIKTOK_VIDEOS } from "../data";
import { TikTokVideoItem } from "../types";

interface TikTokVideosProps {
  onPlayVideo: (video: TikTokVideoItem) => void;
}

export default function TikTokVideos({ onPlayVideo }: TikTokVideosProps) {
  return (
    <section id="tiktok-videos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            XU HƯỚNG TIKTOK
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Trải Nghiệm Thực Tế Trên Mạng Xã Hội
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500">
            Xem ngay các đoạn Clip đập hộp và sử dụng máy Dodoto Lux Air V5 thực tế cực kỳ mãn nhãn nhận về hàng triệu lượt thích.
          </p>
        </div>

        {/* 4-Column Vertical Video Grid (TikTok Aspect Ratio) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TIKTOK_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => onPlayVideo(video)}
              className="group relative aspect-9/16 rounded-3xl overflow-hidden bg-zinc-950 border border-gray-100 shadow-lg cursor-pointer flex flex-col justify-end"
            >
              {/* Product Thumbnail background with referrers safe */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />

              {/* High-quality dark visual overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* View Count Overlay (Top Left) */}
              <div className="absolute top-4 left-4 glass-dark border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] text-white font-semibold z-10">
                <Eye className="w-3 h-3 text-brand" />
                <span>{video.views}</span>
              </div>

              {/* Duration Overlay (Top Right) */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] text-white/90 font-mono z-10">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>

              {/* Pulsing Central Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:bg-white group-hover:text-brand text-white">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Text info block (Bottom) */}
              <div className="p-4 sm:p-5 relative z-10 text-left">
                <span className="text-[9px] font-mono font-bold tracking-widest text-brand uppercase mb-1.5 block">
                  #DODOTO_V5_REVIEWS
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                  {video.title}
                </h4>
                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                  <span>@dodoto.official</span>
                  <span className="text-brand">Xem Ngay</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
