import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Flame, Sparkles } from "lucide-react";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Solution from "./components/Solution";
import Technology from "./components/Technology";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import BeforeAfter from "./components/BeforeAfter";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

// Modals
import CheckoutModal from "./components/CheckoutModal";
import VideoModal from "./components/VideoModal";

// Types
import { TikTokVideoItem } from "./types";

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TikTokVideoItem | undefined>(undefined);
  const [showStickyBuy, setShowStickyBuy] = useState(false);

  // Monitor scroll height to trigger the Sticky Mobile Buy Button
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button when scrolling down past 600px
      if (window.scrollY > 600) {
        setShowStickyBuy(true);
      } else {
        setShowStickyBuy(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOpenMainVideo = () => {
    setSelectedVideo(undefined); // use fallback introduction video
    setIsVideoOpen(true);
  };

  const handlePlayTikTokVideo = (video: TikTokVideoItem) => {
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  return (
    <div id="dodoto-landing-app" className="relative min-h-screen bg-light-bg overflow-x-hidden font-sans">
      
      {/* 1. Header Navigation */}
      <Header onOpenCheckout={handleOpenCheckout} />
      
      {/* 2. Hero Section (Parallax & Counters) */}
      <Hero onOpenCheckout={handleOpenCheckout} onOpenVideo={handleOpenMainVideo} />

      {/* 3. Problems Section (Grid Bento) */}
      <Problems />

      {/* 4. Solutions Section (Zig-zag Layout) */}
      <Solution />

      {/* 5. Technology Section (Exploded Hotspots) */}
      <Technology />

      {/* 6. Features Section (Specs & Cards) */}
      <Features onOpenCheckout={handleOpenCheckout} />

      {/* 7. Comparison Section (Pricing Matrix) */}
      <Comparison />

      {/* 8. Before / After Slider Section (Split Sweep) */}
      <BeforeAfter />

      {/* 9. Reviews Section (Apple style) */}
      <Reviews />

      {/* 11. FAQ Section (Accordion) */}
      <FAQ />

      {/* 12. Final CTA (FOMO countdown & pricing) */}
      <CTA onOpenCheckout={handleOpenCheckout} />


      {/* 14. Checkout/Order Form Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {/* 15. Lightbox Video Player Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={selectedVideo?.videoUrl}
        videoTitle={selectedVideo?.title}
      />

      {/* 16. Sticky Mobile Buy Button (Hồ sơ chuyển đổi tối đa) */}
      <AnimatePresence>
        {showStickyBuy && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 left-0 w-full z-45 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-3 px-4 md:hidden flex items-center justify-between gap-4"
          >
            {/* Product details and Flash Sale pricing */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">DODOTO LUX V5</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-brand font-mono">595.000đ</span>
                <span className="text-[10px] text-gray-400 line-through font-mono">1.000k</span>
              </div>
            </div>

            {/* Glowing CTA Button */}
            <button
              onClick={handleOpenCheckout}
              className="bg-brand hover:bg-brand-hover text-white text-xs font-extrabold px-6 py-3.5 rounded-full shadow-lg shadow-brand/15 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              MUA NGAY (GIẢM 40%)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secondary desktop subtle order banner alert */}
      <AnimatePresence>
        {showStickyBuy && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 bg-zinc-950 text-white py-3 px-4.5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
            <div className="flex items-center gap-1 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-brand" />
              <span>Flash Sale Đang Diễn Ra:</span>
              <strong className="text-brand font-bold">GIẢM 40%</strong>
            </div>
            <button
              onClick={handleOpenCheckout}
              className="bg-brand hover:bg-brand-hover text-white text-[10px] font-extrabold px-4 py-2 rounded-full transition-all ml-1 cursor-pointer"
            >
              CHỐT ĐƠN
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
