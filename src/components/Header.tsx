import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenCheckout: () => void;
}

export default function Header({ onOpenCheckout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Vấn đề", href: "#problems" },
    { name: "Giải pháp", href: "#solution" },
    { name: "Công nghệ", href: "#tech" },
    { name: "Tính năng", href: "#features" },
    { name: "So sánh", href: "#comparison" },
    { name: "Đánh giá", href: "#reviews" },
    { name: "Hỏi đáp", href: "#faq" },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass shadow-xs py-3 border-b border-gray-200/50" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-wider text-brand flex items-center gap-1.5">
              LUX AIR V5
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center text-xs text-gray-500 gap-1 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Bảo hành 24T chính hãng
            </div>
            <button
              onClick={onOpenCheckout}
              className="bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-brand/10 hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              MUA NGAY
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenCheckout}
              className="bg-brand text-white p-2 rounded-full cursor-pointer shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand p-1.5 rounded-md focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden glass border-b border-gray-200/50 absolute top-full left-0 w-full animate-fade-in-down shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand hover:bg-gray-50/50 rounded-lg transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200/40 flex flex-col gap-3">
              <div className="flex items-center text-xs text-gray-600 gap-1.5 px-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Miễn phí vận chuyển toàn quốc với mọi đơn hàng
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCheckout();
                }}
                className="w-full bg-brand hover:bg-brand-hover text-white text-center font-semibold py-3 rounded-full shadow-lg shadow-brand/15 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                MUA NGAY - ĐANG GIẢM 40%
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
