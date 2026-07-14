import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Truck, ShoppingBag, Sparkles, CheckCircle2, Ticket, Settings, Info, Save } from "lucide-react";
import { initAuth, googleSignIn, appendOrderToSheet, appendOrderViaAppsScript } from "../lib/googleSheets";
import { GOOGLE_SHEETS_CONFIG } from "../lib/config";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  // Form fields state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default cash on delivery
  
  // Quantity state
  const [quantity, setQuantity] = useState(1);
  
  // Upsell state
  const [buyExtraHepa, setBuyExtraHepa] = useState(false);
  const [buyGoldWarranty, setBuyGoldWarranty] = useState(false);
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Google Sheets state
  const [token, setToken] = useState<string | null>(null);
  const [sheetError, setSheetError] = useState("");
  const [googleSheetsConnected, setGoogleSheetsConnected] = useState(false);

  // Administrative configuration state (persisted in localStorage)
  const [useAppsScript, setUseAppsScript] = useState(() => {
    const stored = localStorage.getItem("gas_enabled");
    return stored !== null ? stored === "true" : GOOGLE_SHEETS_CONFIG.useAppsScript;
  });
  
  const [appsScriptUrl, setAppsScriptUrl] = useState(() => {
    const stored = localStorage.getItem("gas_url");
    return stored || GOOGLE_SHEETS_CONFIG.appsScriptUrl;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminUrlInput, setAdminUrlInput] = useState(appsScriptUrl);
  const [adminMethod, setAdminMethod] = useState<"oauth" | "gas">(useAppsScript ? "gas" : "oauth");
  const [adminSaveSuccess, setAdminSaveSuccess] = useState(false);

  // Calculation helpers
  const basePrice = 595000;
  const extraHepaPrice = 49000;
  const goldWarrantyPrice = 99000;
  const shippingFee = 35000;
  
  const currentSubtotal = (basePrice * quantity) + (buyExtraHepa ? extraHepaPrice : 0) + (buyGoldWarranty ? goldWarrantyPrice : 0);
  const shippingDiscount = -35000; // Free shipping promo
  const currentTotal = currentSubtotal + shippingFee + shippingDiscount;

  // Listen to Google Sheets OAuth status
  useEffect(() => {
    const unsubscribe = initAuth(
      (_user, activeToken) => {
        setToken(activeToken);
        setGoogleSheetsConnected(true);
      },
      () => {
        setToken(null);
        setGoogleSheetsConnected(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Reset form on modal close or open
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setNotes("");
      setBuyExtraHepa(false);
      setBuyGoldWarranty(false);
      setErrors({});
      setQuantity(1);
      setSheetError("");
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên của bạn";
    
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])([0-9]{8})$/;
    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại liên hệ";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ (Ví dụ: 0912345678)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email (Gmail) của bạn";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Địa chỉ email không hợp lệ (Ví dụ: name@gmail.com)";
    }
    
    if (!address.trim()) newErrors.address = "Vui lòng nhập địa chỉ nhận hàng chi tiết";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSheetError("");

    try {
      const generatedOrderId = "DDT" + Math.floor(100000 + Math.random() * 900000);
      
      const orderData = {
        fullName,
        phone,
        email,
        address,
        notes,
        quantity
      };

      if (useAppsScript) {
        if (!appsScriptUrl || !appsScriptUrl.trim()) {
          throw new Error("Chưa cấu hình đường dẫn Google Apps Script Web App URL. Vui lòng bấm vào nút Cấu hình ở góc dưới để thiết lập!");
        }
        // Push directly to Google Apps Script Web App without requiring OAuth
        await appendOrderViaAppsScript(orderData, appsScriptUrl);
      } else {
        // Fallback to Google OAuth
        let activeToken = token;

        // Force Google login if we don't have an active token yet
        if (!activeToken) {
          try {
            const result = await googleSignIn();
            if (result) {
              activeToken = result.accessToken;
              setToken(result.accessToken);
              setGoogleSheetsConnected(true);
            } else {
              throw new Error("Không thể kết nối tài khoản Google của bạn.");
            }
          } catch (authErr: any) {
            console.error("Auth error during order submission:", authErr);
            setIsSubmitting(false);
            setSheetError("Vui lòng cho phép quyền truy cập Google Sheets để gửi đơn hàng thành công!");
            return;
          }
        }

        // Push via standard REST API
        if (activeToken) {
          await appendOrderToSheet(orderData, activeToken);
        }
      }

      setOrderId(generatedOrderId);

      // Save to local storage for persistence
      const localOrderData = {
        orderId: generatedOrderId,
        customerName: fullName,
        phone,
        email,
        address,
        notes,
        paymentMethod,
        quantity,
        buyExtraHepa,
        buyGoldWarranty,
        total: currentTotal,
        date: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN")
      };

      const existingOrders = JSON.parse(localStorage.getItem("dodoto_orders") || "[]");
      existingOrders.push(localOrderData);
      localStorage.setItem("dodoto_orders", JSON.stringify(existingOrders));

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setIsSubmitting(false);
      setSheetError(
        err.message || "Có lỗi xảy ra khi gửi đơn hàng lên Google Sheets. Vui lòng kiểm tra quyền truy cập hoặc thử lại!"
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark Overlay Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden z-15 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand" />
                <h3 className="text-lg font-bold text-gray-900 font-display">
                  {isSuccess ? "Đặt Hàng Thành Công!" : "Xác Nhận Đơn Hàng Dodoto V5"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8 flex-1">
              {!isSuccess ? (
                /* Checkout Form Screen */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Promotional Alert */}
                  <div className="bg-brand/5 border border-brand/10 rounded-2xl p-4 flex items-start gap-3">
                    <span className="p-1.5 rounded-xl bg-brand/10 text-brand">
                      <Ticket className="w-4 h-4 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-brand block uppercase tracking-wider font-mono">ƯU ĐÃI ĐÃ ĐƯỢC ÁP DỤNG</span>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed font-medium">
                        Bạn mua sản phẩm với giá ưu đãi <strong className="text-brand font-semibold">595.000đ</strong> (Gốc 1.000.000đ). Nhận thêm quà tặng và <strong className="text-gray-900 font-semibold">Miễn phí vận chuyển toàn quốc với mọi đơn hàng</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Customer Information Grid */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                      1. THÔNG TIN KHÁCH HÀNG CHÍNH XÁC
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5"> Họ và tên người nhận <span className="text-brand">*</span></label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ví dụ: Nguyễn Văn A"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                            errors.fullName ? "border-brand focus:border-brand" : "border-gray-200 focus:border-gray-900"
                          }`}
                        />
                        {errors.fullName && <p className="text-xs font-semibold text-brand mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5"> Số điện thoại nhận hàng <span className="text-brand">*</span></label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ví dụ: 0912345678"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                            errors.phone ? "border-brand focus:border-brand" : "border-gray-200 focus:border-gray-900"
                          }`}
                        />
                        {errors.phone && <p className="text-xs font-semibold text-brand mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Gmail input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5"> Địa chỉ Gmail <span className="text-brand">*</span></label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ví dụ: nguyenvana@gmail.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                          errors.email ? "border-brand focus:border-brand" : "border-gray-200 focus:border-gray-900"
                        }`}
                      />
                      {errors.email && <p className="text-xs font-semibold text-brand mt-1">{errors.email}</p>}
                    </div>

                    {/* Address Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5"> Địa chỉ nhận hàng chi tiết <span className="text-brand">*</span></label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                          errors.address ? "border-brand focus:border-brand" : "border-gray-200 focus:border-gray-900"
                        }`}
                      />
                      {errors.address && <p className="text-xs font-semibold text-brand mt-1">{errors.address}</p>}
                    </div>

                    {/* Notes Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5"> Ghi chú thêm (Không bắt buộc)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ví dụ: Giao hàng giờ hành chính, gọi trước khi giao..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-brand/20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Quantity Selector Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                      2. CHỌN SỐ LƯỢNG SẢN PHẨM
                    </h4>
                    
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Máy hút bụi Dodoto Lux Air V5</span>
                        <span className="text-xs text-brand font-bold font-mono mt-0.5">595.000đ / bộ</span>
                      </div>
                      
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-150 active:scale-95 transition-all text-lg font-bold select-none cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-mono font-bold text-sm text-gray-900 bg-white h-10 flex items-center justify-center border-x border-gray-200">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-150 active:scale-95 transition-all text-lg font-bold select-none cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>



                  {/* Bill Details Summary */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="space-y-2 border-b border-gray-200/60 pb-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Máy hút bụi Dodoto Lux Air V5 ({quantity} bộ)</span>
                        <span className="font-mono font-semibold text-gray-800">{(basePrice * quantity).toLocaleString("vi-VN")}đ</span>
                      </div>
                      
                      {buyExtraHepa && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Mua kèm: Lõi lọc HEPA phụ</span>
                          <span className="font-mono font-semibold text-gray-800">+49.000đ</span>
                        </div>
                      )}

                      {buyGoldWarranty && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Mua kèm: Gói bảo hành vàng 5 năm</span>
                          <span className="font-mono font-semibold text-gray-800">+99.000đ</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Phí giao hàng toàn quốc</span>
                        <span className="font-mono text-gray-400 line-through">35.000đ</span>
                      </div>
                      <div className="flex justify-between text-sm text-brand font-medium">
                        <span>Ưu đãi miễn phí ship</span>
                        <span className="font-mono">-35.000đ</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 mt-1">
                      <span className="font-bold text-gray-900 text-base font-display">Tổng số tiền thanh toán:</span>
                      <span className="text-2xl font-black text-brand font-mono">
                        {currentTotal.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>

                  {/* Errors display only */}
                  {sheetError && (
                    <div className="bg-brand/5 text-brand border border-brand/10 text-xs font-semibold rounded-xl p-3 text-center leading-relaxed">
                      ⚠️ {sheetError}
                    </div>
                  )}

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-hover text-white text-base sm:text-lg font-bold py-4 rounded-full shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer disabled:bg-gray-400 disabled:shadow-none text-center"
                  >
                    {isSubmitting ? "Đang gửi thông tin và lưu đơn..." : "XÁC NHẬN ĐẶT HÀNG NGAY"}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium pb-2 border-b border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Dodoto cam kết bảo mật thông tin khách hàng tuyệt đối 100%</span>
                  </div>

                  {/* Administrative System Configuration Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminOpen(!isAdminOpen);
                        setAdminUrlInput(appsScriptUrl);
                        setAdminMethod(useAppsScript ? "gas" : "oauth");
                        setAdminSaveSuccess(false);
                      }}
                      className="w-full text-gray-400 hover:text-gray-600 transition-colors py-2 flex items-center justify-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider border border-gray-250/30 hover:bg-gray-50 rounded-xl uppercase"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      {isAdminOpen ? "Ẩn cấu hình Google Sheet" : "Cấu hình Google Sheet (Dành cho Admin)"}
                    </button>
                    
                    <AnimatePresence>
                      {isAdminOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50 border border-gray-200 rounded-2xl p-4 mt-2 text-left space-y-3"
                        >
                          {/* Admin-only connection status display */}
                          <div className="space-y-2 mb-3">
                            {useAppsScript ? (
                              appsScriptUrl && appsScriptUrl.trim() ? (
                                <div className="text-[11px] text-emerald-700 bg-emerald-50/80 border border-emerald-100/60 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  Trạng thái: Google Apps Script Web App ĐANG HOẠT ĐỘNG
                                </div>
                              ) : (
                                <div className="text-[11px] text-amber-700 bg-amber-50/80 border border-amber-100/60 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  Trạng thái: CHƯA CẤU HÌNH Google Apps Script Web App
                                </div>
                              )
                            ) : googleSheetsConnected ? (
                              <div className="text-[11px] text-emerald-700 bg-emerald-50/80 border border-emerald-100/60 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  Trạng thái: Đã kết nối tài khoản Google Sheets (OAuth)
                              </div>
                            ) : (
                              <div className="text-[11px] text-amber-700 bg-amber-50/80 border border-amber-100/60 rounded-xl py-2 px-3.5 flex items-center justify-center gap-2 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  Trạng thái: Chưa xác thực Google Sheets OAuth
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                            <Info className="w-3.5 h-3.5 text-brand" />
                            <span>PHƯƠNG THỨC KẾT NỐI GOOGLE SHEETS</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                            <button
                              type="button"
                              onClick={() => setAdminMethod("gas")}
                              className={`py-2 px-3 rounded-xl border text-center transition-all ${
                                adminMethod === "gas"
                                  ? "border-brand bg-brand/5 text-brand"
                                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Apps Script (Khuyên dùng)
                            </button>
                            <button
                              type="button"
                              onClick={() => setAdminMethod("oauth")}
                              className={`py-2 px-3 rounded-xl border text-center transition-all ${
                                adminMethod === "oauth"
                                  ? "border-brand bg-brand/5 text-brand"
                                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Google Auth (OAuth Popup)
                            </button>
                          </div>

                          {adminMethod === "gas" ? (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                                  Google Apps Script Web App URL
                                </label>
                                <input
                                  type="url"
                                  value={adminUrlInput}
                                  onChange={(e) => setAdminUrlInput(e.target.value)}
                                  placeholder="https://script.google.com/macros/s/.../exec"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand font-mono text-xs"
                                />
                              </div>

                              <div className="bg-white border border-gray-100 rounded-xl p-3 space-y-2 text-[11px] text-gray-600 leading-normal">
                                <p className="font-bold text-gray-800">💡 Hướng dẫn tạo & lấy URL Apps Script:</p>
                                <ol className="list-decimal pl-4 space-y-1">
                                  <li>Mở file Google Sheet có ID: <code className="font-mono bg-gray-50 px-1 py-0.5 rounded text-brand">1THWURCQO6nfik52NaCnkFdj8plwdJsL9If084Tai_1I</code></li>
                                  <li>Vào menu <strong className="text-gray-800">Tiện ích mở rộng (Extensions)</strong> &gt; <strong className="text-gray-800">Apps Script</strong></li>
                                  <li>Xóa hết code mặc định đi, copy và paste đoạn code Apps Script bên dưới vào</li>
                                  <li>Bấm <strong className="text-gray-800">Triển khai (Deploy)</strong> &gt; <strong className="text-gray-800">Tùy chọn triển khai mới (New deployment)</strong></li>
                                  <li>Chọn loại <strong className="text-gray-800">Ứng dụng web (Web app)</strong></li>
                                  <li>Cấu hình: <strong className="text-gray-800">Thực thi dưới danh nghĩa (Execute as)</strong> là <strong className="text-emerald-600">Tôi (Me)</strong>; <strong className="text-gray-800">Ai có quyền truy cập (Who has access)</strong> là <strong className="text-emerald-600">Bất kỳ ai (Anyone)</strong></li>
                                  <li>Bấm Triển khai, xác thực quyền truy cập và copy đường dẫn Web App dán vào ô bên trên và bấm Lưu!</li>
                                </ol>

                                <div className="mt-3">
                                  <p className="font-bold text-gray-800 mb-1">📋 Mã nguồn Apps Script hỗ trợ Google Sheet:</p>
                                  <textarea
                                    readOnly
                                    value={`function doPost(e) {
  try {
    var sheetId = "1THWURCQO6nfik52NaCnkFdj8plwdJsL9If084Tai_1I";
    var sheetName = "LUX AIR V5";
    
    var doc = SpreadsheetApp.openById(sheetId);
    var sheet = doc.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(["HỌ VÀ TÊN", "SỐ ĐIỆN THOẠI", "ĐỊA CHỈ GMAIL", "ĐỊA CHỈ NHẬN HÀNG", "GHI CHÚ", "SỐ LƯỢNG", "THỜI GIAN"]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.address || "",
      data.notes || "",
      data.quantity || 1,
      new Date().toLocaleString("vi-VN")
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                                    className="w-full h-24 p-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-[9px] text-gray-600 resize-none focus:outline-none focus:ring-0"
                                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                                  />
                                  <span className="text-[10px] text-gray-400 block mt-0.5 text-center">Bấm đúp chuột vào khung để chọn tất cả và Sao chép</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                              <div className="text-[11px] text-gray-500 space-y-1 leading-normal">
                                <p className="font-bold text-gray-700">📌 Chế độ Google Auth (OAuth Popup):</p>
                                <p>Đơn hàng được lưu trực tiếp bằng tài khoản Google của bạn. Tuy nhiên, khách hàng (người mua) có thể sẽ nhận được thông báo yêu cầu xác nhận OAuth của Google nếu trình duyệt của họ chặn cookie bên thứ ba hoặc popup. Nên ưu tiên dùng chế độ Apps Script để có tỷ lệ chuyển đổi chốt đơn cao nhất!</p>
                              </div>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const isGas = adminMethod === "gas";
                              setUseAppsScript(isGas);
                              setAppsScriptUrl(adminUrlInput);
                              localStorage.setItem("gas_enabled", isGas ? "true" : "false");
                              localStorage.setItem("gas_url", adminUrlInput);
                              setAdminSaveSuccess(true);
                              setSheetError("");
                              setTimeout(() => setAdminSaveSuccess(false), 2000);
                            }}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {adminSaveSuccess ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Đã lưu cấu hình thành công!
                              </>
                            ) : (
                              <>
                                <Save className="w-3.5 h-3.5" />
                                LƯU CẤU HÌNH HỆ THỐNG
                              </>
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </form>
              ) : (
                /* Celebratory digital receipt (Success state) */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full border-2 border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-50">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-gray-900 font-display">Cảm Ơn Bạn Đã Tin Tưởng!</h4>
                    <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                      Đơn hàng của bạn đã được tiếp nhận thành công trên hệ thống. Sẽ có nhân viên gọi điện lại để xác nhận nhé.
                    </p>
                  </div>

                  {/* Receipt block */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/60 text-left max-w-md mx-auto space-y-3.5">
                    <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Mã đơn hàng:</span>
                      <span className="font-mono font-bold text-gray-900 text-sm bg-gray-200/50 px-2.5 py-1 rounded-md">{orderId}</span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Họ tên khách hàng:</span>
                        <strong className="text-gray-900 font-semibold">{fullName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Số điện thoại:</span>
                        <strong className="text-gray-900 font-semibold">{phone}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Địa chỉ Gmail:</span>
                        <strong className="text-gray-900 font-semibold">{email}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Số lượng sản phẩm:</span>
                        <strong className="text-gray-900 font-semibold">{quantity} bộ</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Hình thức thanh toán:</span>
                        <strong className="text-gray-900 font-semibold">{paymentMethod === "cod" ? "COD - Nhận hàng trả tiền" : "Chuyển khoản ngân hàng"}</strong>
                      </div>
                      <div className="flex justify-between pt-2.5 border-t border-gray-200 font-semibold text-gray-900 text-base">
                        <span>Tổng thanh toán:</span>
                        <strong className="text-brand text-lg font-mono font-black">{currentTotal.toLocaleString("vi-VN")}đ</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={onClose}
                      className="bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-8 py-3 rounded-full cursor-pointer transition-colors"
                    >
                      Tiếp tục tìm hiểu sản phẩm
                    </button>
                    <a
                      href="https://dodoto.vn/"
                      className="border border-gray-300 hover:border-gray-900 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-sm font-semibold px-8 py-3 rounded-full cursor-pointer transition-colors text-center"
                    >
                      Quay lại Trang chủ Dodoto.vn
                    </a>
                  </div>

                  {/* Quality Assurance note */}
                  <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5 pt-4">
                    <Truck className="w-4 h-4 text-brand" />
                    <span>Dự kiến giao hàng hỏa tốc trong 2-3 ngày làm việc tới.</span>
                  </div>

                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
