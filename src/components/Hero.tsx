import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, Shield, Truck, RotateCcw, CreditCard, ChevronDown } from "lucide-react";
import { IMAGES } from "../data";

interface HeroProps {
  onOpenCheckout: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenCheckout, onOpenVideo }: HeroProps) {
  // Counters for premium stats
  const [suction, setSuction] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [weight, setWeight] = useState(500);

  useEffect(() => {
    // Animate suction from 0 to 30,000
    const suctionDuration = 1500;
    const suctionStep = Math.ceil(30000 / (suctionDuration / 20));
    const suctionInterval = setInterval(() => {
      setSuction((prev) => {
        if (prev >= 30000) {
          clearInterval(suctionInterval);
          return 30000;
        }
        return prev + suctionStep;
      });
    }, 20);

    // Animate RPM from 0 to 120,000
    const rpmStep = Math.ceil(120000 / (suctionDuration / 20));
    const rpmInterval = setInterval(() => {
      setRpm((prev) => {
        if (prev >= 120000) {
          clearInterval(rpmInterval);
          return 120000;
        }
        return prev + rpmStep;
      });
    }, 20);

    // Animate weight down from 500g to 400g
    const weightInterval = setInterval(() => {
      setWeight((prev) => {
        if (prev <= 400) {
          clearInterval(weightInterval);
          return 400;
        }
        return prev - 2;
      });
    }, 15);

    return () => {
      clearInterval(suctionInterval);
      clearInterval(rpmInterval);
      clearInterval(weightInterval);
    };
  }, []);

  const trustBadges = [
    { icon: <Truck className="w-4 h-4 text-brand" />, text: "Miễn phí vận chuyển toàn quốc với mọi đơn hàng" },
    { icon: <Shield className="w-4 h-4 text-brand" />, text: "Bảo hành 24 tháng" },
    { icon: <RotateCcw className="w-4 h-4 text-brand" />, text: "Dùng thử 15 ngày, Đổi trả 30 ngày đầu" },
    { icon: <CreditCard className="w-4 h-4 text-brand" />, text: "Thanh toán khi nhận hàng" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center overflow-hidden bg-radial from-white via-gray-50 to-gray-100"
    >
      {/* Decorative gradient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col justify-between h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Text Content Block */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
            
            {/* Tagline / Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand/5 border border-brand/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-brand font-mono">
                SIÊU PHẨM CÔNG NGHỆ 2026
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.2] text-gray-900 mb-6"
            >
              Máy hút bụi cầm tay không dây <br />
              <span className="text-brand relative inline-block mt-2">Dodoto Lux Air V5<span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand/10 -z-10 rounded-full" /></span>
            </motion.h1>

            {/* Description Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-xl leading-relaxed mb-8"
            >
              Lực hút lốc xoáy <strong className="text-gray-900 font-semibold">30.000Pa</strong> – Động cơ không chổi than siêu tốc <strong className="text-gray-900 font-semibold">160W</strong> – Tích hợp tính năng <strong>Hút và Thổi 2 trong 1</strong> đỉnh cao.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={onOpenCheckout}
                className="bg-brand hover:bg-brand-hover text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-brand/15 hover:shadow-2xl hover:shadow-brand/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
              >
                MUA NGAY - ĐANG GIẢM 40%
              </button>
              <a
                href="https://www.tiktok.com/@dodotostore/video/7641552085216955655?_r=1&_d=secCgYIASAHKAESPgo8kLsVE%2F%2Fsqv%2BG%2BmDu47iMI%2B3QCk6qiYVzsYnWx2MRPSh5Gj%2BDHsg%2FWWIZwvI%2B2rQ0olG33wh5y5AQhC6fGgA%3D&_svg=1&biz_cover_on=0&card_desc_fallback=1&checksum=be7fc28ec97dec9e7e59e0b20cffb7e813fed7f1c75f827afdfa8c4fa786ea43&ec_shared_reflux_dynamic_params=%7B%22placeholder_material_id%22%3A%227641552085216955655%22%2C%22placeholder_origin_cover%22%3A%22https%253A%252F%252Fp16-common-sign.tiktokcdn.com%252Ftos-alisg-p-0037%252FoQBaHi7B6IPBniYCEuwfQx9ygVCVAIwIM1IhAA~tplv-tiktokx-origin.jpeg%253Fdr%253D14572%2526refresh_token%253D82b829fd%2526x-expires%253D1815537600%2526x-signature%253DkMHPxhG39EE3n8tYNDs2gE%25252B%25252F2d4%25253D%2526t%253D4d5b0474%2526ps%253D13740610%2526shp%253Dd05b14bd%2526shcp%253D34ff8df6%2526idc%253Dmy2%2526s%253DPUBLISH%22%2C%22placeholder_product_id%22%3A%221735654414588216660%22%2C%22placeholder_video_id%22%3A%227641552085216955655%22%7D&ec_shared_reflux_scene=shop_tab_feed&item_author_type=2&link_reflow_popup_iteration_sharer=%7B%22click_empty_to_play%22%3A1%2C%22dynamic_cover%22%3A1%2C%22profile_clickable%22%3A1%2C%22follow_to_play_duration%22%3A-1%7D&mid=7494102957739608080&og_size_on=0&panel_source_v2=share_panel&preview_pb=0&reflow_page_type=1&reflow_sign_scene=1&region=VN&rgssign=2.1.J7J_1gqAfVgDWNKIwJpySQ&sec_user_id=MS4wLjABAAAAT5NGFqfJm887we-6kLW_Kwxw3fDz1_qg-e9GmInq-dOzcUHZwUlfqte8ebRVkZsd&share_app_id=1233&share_enter_from=others_homepage&share_item_id=7641552085216955655&share_link_id=671BFA53-9C10-41E6-903C-8FD9F406622A&share_region=VN&share_scene=2&share_source=app_panel_share&sharer_language=vi&sharing_page_26_reverse=v1&social_share_type=0&source=h5_t&sp_level=1&sp_root_d=secCgYIASAHKAESPgo8kLsVE%2F%2Fsqv%2BG%2BmDu47iMI%2B3QCk6qiYVzsYnWx2MRPSh5Gj%2BDHsg%2FWWIZwvI%2B2rQ0olG33wh5y5AQhC6fGgA%3D&sp_root_share_link_id=671BFA53-9C10-41E6-903C-8FD9F406622A&sp_root_u=dc68631cgfbjbd&timestamp=1784003545&tt_from=copy&u_code=dc68631cgfbjbd&ug_btm=b5836%2Cb2878&user_id=6821507516133016578&utm_campaign=client_share&utm_medium=ios&utm_source=copy&vid_fwc_v6=1"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-800 hover:text-gray-900 font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4.5 h-4.5 fill-gray-800 text-gray-800" />
                XEM VIDEO REVIEW
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-4 gap-x-6 w-full max-w-md border-t border-gray-200/60 pt-6"
            >
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product Image Stage (Interactive Apple/Dyson style) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-[480px] flex items-center justify-center py-6"
            >
              {/* Product Glow Layer */}
              <div className="absolute inset-0 bg-radial from-brand/5 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Float container */}
              <div className="relative z-10 animate-float w-full flex justify-center">
                <img
                  src={IMAGES.heroProduct}
                  alt="Dodoto Lux Air V5 Handheld Cordless Vacuum"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-full h-auto object-contain max-h-[500px] drop-shadow-[0_20px_50px_rgba(216,31,38,0.12)]"
                />
              </div>

              {/* Overlay labels/decorations */}
              <div className="absolute top-12 left-0 bg-white/80 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl p-3.5 flex items-center gap-3 animate-float-delayed z-20">
                <span className="p-2 rounded-xl bg-brand/5 text-brand">
                  <WindIcon className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">LUỒNG KHÍ KÉP</span>
                  <span className="text-xs font-semibold text-gray-800">Hút & Thổi 2-in-1</span>
                </div>
              </div>
            </motion.div>

            {/* Performance Live Counters (Bento styling under the image) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 w-full max-w-[500px] mt-6"
            >
              <div className="bg-white/70 backdrop-blur-xs border border-gray-200/50 rounded-2xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-200">
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">ÁP LỰC HÚT</p>
                <p className="text-2xl sm:text-3xl font-display font-bold text-brand tracking-tight font-mono">
                  {suction.toLocaleString()}
                  <span className="text-xs font-medium text-gray-500 ml-0.5">Pa</span>
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xs border border-gray-200/50 rounded-2xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-200">
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">ĐỘNG CƠ SIÊU TỐC</p>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight font-mono">
                  {rpm >= 100000 ? `${(rpm / 1000).toFixed(0)}K` : (rpm / 1000).toFixed(0)}
                  <span className="text-xs font-medium text-gray-500 ml-0.5"> RPM</span>
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xs border border-gray-200/50 rounded-2xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-200">
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">TRỌNG LƯỢNG MÁY</p>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight font-mono">
                  {weight}
                  <span className="text-xs font-medium text-gray-500 ml-0.5">g</span>
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center mt-12 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <a href="#problems" className="flex flex-col items-center">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">KHÁM PHÁ V5</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
      <path d="M17.5 15.6A2 2 0 1 1 18 12H2" />
      <path d="M9.8 5.8A2 2 0 1 0 9 9h13" />
    </svg>
  );
}
