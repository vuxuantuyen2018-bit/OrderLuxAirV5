import React from "react";
import { Facebook, Youtube, ShieldCheck, Mail, PhoneCall, HelpCircle, FileText } from "lucide-react";

export default function Footer() {
  const policies = [
    { name: "Chính sách dùng thử 15 ngày", href: "#" },
    { name: "Chính sách đổi trả 30 ngày", href: "#" },
    { name: "Chính sách bảo hành 24 tháng", href: "#" },
    { name: "Điều khoản dịch vụ & Sử dụng", href: "#" },
  ];

  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-8 border-t border-gray-200/80 relative overflow-hidden">
      
      {/* Decorative tiny brand red glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 flex flex-col items-start space-y-4">
            <span className="font-display font-black text-2xl tracking-wider text-gray-900 flex items-center gap-1.5">
              DODOTO <span className="text-[10px] bg-brand text-white px-1.5 py-0.5 rounded-xs font-mono font-medium">LUX</span>
            </span>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              Thương hiệu đồ gia dụng và thiết bị vệ sinh thông minh cao cấp tại Việt Nam. Dodoto luôn tiên phong mang những đột phá công nghệ mới nhất phục vụ gia đình Việt.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200/60 hover:bg-brand text-gray-650 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200/60 hover:bg-brand text-gray-650 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200/60 hover:bg-brand text-gray-650 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <TikTokIcon className="w-4.5 h-4.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Column 2: Policies */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-900 uppercase border-l-2 border-brand pl-2.5">
              HỖ TRỢ & CHÍNH SÁCH
            </h4>
            <ul className="space-y-2 text-sm">
              {policies.map((policy, idx) => (
                <li key={idx}>
                  <a href={policy.href} className="hover:text-brand transition-colors flex items-center gap-2 text-gray-600">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    <span>{policy.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-900 uppercase border-l-2 border-brand pl-2.5">
              ĐỊA CHỈ & LIÊN HỆ
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <PhoneCall className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold font-mono">Hotline: 0866.106.833</span>
                  <span className="text-[11px] text-gray-400">Hỗ trợ đặt hàng và bảo hành (8:00 - 22:00)</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold font-mono">support@dodoto.vn</span>
                  <span className="text-[11px] text-gray-400">Phản hồi khiếu nại & hợp tác đại lý kinh doanh</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold">Công ty Cổ phần Công nghệ Dodoto Việt Nam</span>
                  <span className="text-xs text-gray-400">Số 120 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal credentials and Copyright */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <span>© 2026 Dodoto.vn - Bản quyền thuộc về Cty CP Dodoto Việt Nam.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              MST: 0102345678 cấp ngày 15/03/2022
            </span>
          </div>

          {/* Ministry of Industry and Trade certification seal */}
          <a 
            href="http://online.gov.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <img 
              src="https://ecomviet.gov.vn/images/logo_bct.png" 
              alt="Đã thông báo Bộ Công Thương" 
              className="h-9 object-contain"
              onError={(e) => {
                // simple fallback text or icon if gov logo fails to load
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </a>
        </div>

      </div>
    </footer>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
