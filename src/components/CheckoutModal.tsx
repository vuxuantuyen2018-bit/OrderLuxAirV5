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
        if (appsScriptUrl && appsScriptUrl.trim()) {
          // Push directly to Google Apps Script Web App without requiring OAuth
          await appendOrderViaAppsScript(orderData, appsScriptUrl);
        } else {
          console.warn("VITE_APPS_SCRIPT_URL is not configured. Order will be stored locally in localStorage.");
        }
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

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium pb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Dodoto cam kết bảo mật thông tin khách hàng tuyệt đối 100%</span>
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
