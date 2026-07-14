import { motion, AnimatePresence } from "motion/react";
import { X, PlayCircle, ShieldCheck } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  videoTitle?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) {
  // Use a fallback public demo video if none provided
  const targetVideoUrl = videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";
  const title = videoTitle || "Giới thiệu máy hút bụi cầm tay không dây Dodoto Lux Air V5";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-zinc-950 rounded-3xl w-full max-w-3xl aspect-video shadow-2xl overflow-hidden z-15 border border-white/10 flex flex-col justify-between"
          >
            {/* Header info overlays */}
            <div className="absolute top-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-20">
              <div className="flex items-center gap-2 text-white">
                <PlayCircle className="w-5 h-5 text-brand" />
                <h4 className="text-xs sm:text-sm font-bold truncate max-w-[200px] sm:max-w-md font-display">
                  {title}
                </h4>
              </div>
              
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white hover:text-white p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="w-full h-full flex items-center justify-center relative">
              <video
                src={targetVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom info banner */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between z-20 text-left">
              <div className="flex items-center gap-2 text-white/70 text-[10px] sm:text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Trải nghiệm thực tế 100% không chỉnh sửa hiệu ứng</span>
              </div>
              <span className="text-brand text-[10px] sm:text-xs font-bold font-mono tracking-wider uppercase">DODOTO OFFICIAL</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
