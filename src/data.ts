import { 
  ProblemItem, 
  SolutionItem, 
  HotspotItem, 
  FeatureItem, 
  ComparisonRow, 
  BeforeAfterScenario, 
  ReviewItem, 
  TikTokVideoItem, 
  FAQItem 
} from "./types";

// Images mapped from real Dodoto.vn URLs provided by user
export const IMAGES = {
  heroProduct: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-motilyjbkgloe9.webp", // Glowing/high-tech internal view
  techExploded: "https://dodoto.vn/wp-content/uploads/2026/07/b079a262-e73a-48cb-a96c-50bd3062fb77.png", // Full elegant product shot
  techDetails: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-motimmgf6a697d@resize_w900_nl.webp", // Filter & charging details
  solutionLifestyle: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-motim5uqq70ie2.webp", // Laid out accessories or vacuum action
  carCleaning: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-motim5tcpeyqaf.webp", // Vacuuming car leather seat
  sofaKeyboard: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-motim9ix6ku923.webp", // Laptop / sofa dusting action
  displayScreen: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-moak424v6t598a.webp", // Close-up of digital display
  suctionPower: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-mp4x632vomq644.webp", // Debris clearing particles
  blowAction: "https://dodoto.vn/wp-content/uploads/2026/07/vn-11134207-81ztc-mp4x4uk4jf9e11@resize_w900_nl.webp", // Blowing & vacuuming demonstration
};

export const PROBLEMS_DATA: ProblemItem[] = [
  {
    id: "car",
    title: "Bụi trong ô tô",
    description: "Các khe ghế, rãnh điều hòa và thảm sàn tích tụ bụi mịn và vụn thức ăn cực kỳ khó vệ sinh bằng khăn lau thông thường.",
    imageUrl: IMAGES.carCleaning
  },
  {
    id: "keyboard",
    title: "Bàn phím bám bẩn",
    description: "Kẽ phím máy tính là nơi ẩn nấp lý tưởng của mạt bụi, tàn thuốc và da chết, gây mất vệ sinh và kẹt phím.",
    imageUrl: IMAGES.sofaKeyboard
  },
  {
    id: "bed",
    title: "Giường nệm & Ghế sofa",
    description: "Bụi mịn và lông thú cưng bám sâu trong các sợi vải Sofa, giường nệm là tác nhân hàng đầu gây dị ứng da và hô hấp.",
    imageUrl: IMAGES.solutionLifestyle
  },
  {
    id: "gaps",
    title: "Khe cửa & Góc hẹp",
    description: "Những góc chết, rãnh cửa trượt và sau tủ lạnh hẹp sâu làm nản lòng mọi nỗ lực dọn dẹp nhà cửa truyền thống.",
    imageUrl: IMAGES.blowAction
  }
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "solution-1",
    title: "Thiết kế 2 trong 1: Hút mạnh mẽ phía trước - Thổi sạch sẽ phía sau",
    description: "Không chỉ dừng lại ở việc hút sạch các mảnh vụn. Dodoto Lux Air V5 tích hợp thêm cổng thổi siêu áp ở đuôi máy, giúp bạn dễ dàng thổi bay bụi bẩn bám cứng trong các khe hẹp điều hòa ô tô, linh kiện máy tính, hoặc thổi phồng phao bơi, nệm hơi nhanh chóng.",
    bullets: [
      "Đầu hút chổi quét đa năng loại bỏ bụi cứng đầu trên bề mặt vải và bàn phím.",
      "Đầu thổi siêu tốc dọn sạch bụi bẩn ở những nơi đầu hút không thể len lỏi.",
      "Chuyển đổi linh hoạt giữa các chế độ chỉ trong 2 giây.",
      "Thổi sạch lõi lọc HEPA dễ dàng bằng chính luồng khí thổi cực mạnh."
    ],
    imageUrl: IMAGES.blowAction
  },
  {
    id: "solution-2",
    title: "Nhỏ gọn tối đa - Động cơ không chổi than 160W đỉnh cao công nghệ",
    description: "Được trang bị động cơ không chổi than thế hệ mới quay với tốc độ cực cao lên tới 120.000 vòng/phút, mang lại lực hút lốc xoáy 30.000Pa bền bỉ mà không bị nóng máy hay hao mòn chổi than như các dòng máy giá rẻ.",
    bullets: [
      "Trọng lượng siêu nhẹ chỉ 400g cầm tay không lo mỏi mệt.",
      "Động cơ không chổi than tuổi thọ cao gấp 10 lần động cơ thường.",
      "Công nghệ giảm tiếng ồn chủ động dưới 65dB, êm ái khi sử dụng.",
      "Thiết kế phong cách tối giản Bắc Âu sang trọng, nâng tầm không gian sống."
    ],
    imageUrl: IMAGES.techExploded
  }
];

export const HOTSPOTS_DATA: HotspotItem[] = [
  {
    id: "motor",
    name: "Động cơ không chổi than 160W",
    description: "Brushless Motor 120,000 RPM",
    x: 48,
    y: 42,
    detail: "Động cơ nam châm vĩnh cửu siêu tốc độ, đạt công suất 160W, tạo áp lực hút chân không lên tới 30.000Pa cực đại mà vẫn giữ nhiệt độ máy luôn mát mẻ."
  },
  {
    id: "dualstorm",
    name: "Hệ thống hút và thổi Dual Storm",
    description: "2-in-1 Dual Storm Aero",
    x: 18,
    y: 35,
    detail: "Công nghệ điều hướng luồng khí kép độc quyền. Phía trước tạo lốc xoáy hút bụi cực mạnh, phía sau nén khí tạo vòi phun thổi bụi siêu áp suất lực đẩy cao."
  },
  {
    id: "cyclone",
    name: "Buồng lọc Cyclone lốc xoáy kép",
    description: "Double Cyclone System",
    x: 62,
    y: 32,
    detail: "Tách bụi thô và các hạt lớn ra khỏi luồng không khí bằng lực ly tâm mạnh mẽ, giúp bảo vệ bộ lọc tinh lọc HEPA không bị nghẽn tắc, duy trì lực hút tối đa."
  },
  {
    id: "hepa",
    name: "Lõi lọc HEPA đa lớp chuẩn H13",
    description: "Washable HEPA H13 Filter",
    x: 75,
    y: 45,
    detail: "Lọc sạch 99.97% các hạt bụi mịn có kích thước nhỏ tới 0.3 micromet, phấn hoa, vi khuẩn và chất gây dị ứng. Có thể rửa sạch tái sử dụng nhiều lần bảo vệ môi trường."
  },
  {
    id: "turbohood",
    name: "Chụp gió tăng áp thiết kế khí động học",
    description: "Aerodynamic Turbo Hood",
    x: 88,
    y: 38,
    detail: "Thiết kế họng gió hội tụ phỏng sinh học giúp tăng tốc độ dòng khí chạy qua đầu hút, tối đa hóa hiệu suất chuyển đổi điện năng thành lực hút thực tế."
  },
  {
    id: "battery",
    name: "Pin Lithium-Ion dung lượng cao",
    description: "High-density Lithium Cells",
    x: 35,
    y: 65,
    detail: "Hệ thống pin 2 cell dòng xả cao kết hợp chip quản lý năng lượng BMS 3.0 thông minh, cung cấp thời gian hoạt động liên tục lên đến 35 phút ở chế độ tiêu chuẩn."
  },
  {
    id: "cooling",
    name: "Hệ thống tản nhiệt chủ động Air-Cool",
    description: "Active Cooling Airflow",
    x: 52,
    y: 72,
    detail: "Các khe thoát gió được tính toán khí động học để dẫn luồng khí mát đi qua khoang pin và động cơ liên tục, ngăn ngừa quá nhiệt, kéo dài tuổi thọ thiết bị vượt trội."
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "feat-1",
    title: "Lực hút siêu khủng 30.000Pa",
    description: "Hút sạch mọi loại bụi mịn, mảnh vụn bánh mì, cát sỏi, đồng xu và cả đinh ốc chỉ trong 1 lần lướt qua.",
    iconName: "Zap"
  },
  {
    id: "feat-2",
    title: "Động cơ không chổi than 160W",
    description: "Công nghệ Brushless bền bỉ vượt trội, tốc độ quay 120.000 vòng/phút, không phát tia lửa điện, cực kỳ an toàn.",
    iconName: "Cpu"
  },
  {
    id: "feat-3",
    title: "2 chế độ Hút & Thổi độc đáo",
    description: "Đầu hút dọn dẹp vết bẩn bề mặt, đầu thổi dọn sạch các góc khuất sâu hay kẽ hở siêu hẹp hoặc thổi phao.",
    iconName: "Wind"
  },
  {
    id: "feat-4",
    title: "Hoàn toàn không dây 400g",
    description: "Tự do di chuyển dọn dẹp nhà cửa, xe hơi hay mang đi du lịch. Trọng lượng siêu nhẹ giúp cầm lâu không mỏi tay.",
    iconName: "ShieldAlert" // we will map icons properly in react code
  },
  {
    id: "feat-5",
    title: "Pin Lithium dung lượng lớn",
    description: "Dọn dẹp thoải mái toàn bộ xe hơi hoặc căn hộ với thời lượng sử dụng liên tục lên đến 35 phút dọn dẹp.",
    iconName: "BatteryCharging"
  },
  {
    id: "feat-6",
    title: "Độ ồn cực thấp < 65dB",
    description: "Sử dụng công nghệ tiêu âm nhiều lớp, không làm phiền em bé đang ngủ hay gây khó chịu cho thú cưng.",
    iconName: "VolumeX"
  },
  {
    id: "feat-7",
    title: "Bộ lọc HEPA rửa được",
    description: "Lõi lọc chuẩn H13 chặn bụi mịn tuyệt đối. Tháo lắp nhanh và dễ dàng rửa sạch bằng nước để tái sử dụng.",
    iconName: "RefreshCw"
  },
  {
    id: "feat-8",
    title: "Sạc Type-C & Củ sạc đi kèm",
    description: "Sạc tiện lợi Type-C và củ sạc đi kèm, thời gian sạc là 4-5h. Lưu ý: chỉ sử dụng củ và dây sạc 5V-2A đi kèm, không hỗ trợ sạc nhanh.",
    iconName: "Usb"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Động cơ",
    luxAir: "Không chổi than 160W (120k RPM)",
    isLuxBetter: true,
    cheapHandheld: "Có chổi than 40W (30k RPM)",
    traditionalVac: "Có chổi than 600W-1200W"
  },
  {
    feature: "Lực hút thực tế",
    luxAir: "30.000 Pa (Cực mạnh)",
    isLuxBetter: true,
    cheapHandheld: "4.000 - 6.000 Pa (Yếu)",
    traditionalVac: "15.000 - 20.000 Pa (Khá mạnh)"
  },
  {
    feature: "Chức năng thổi bụi",
    luxAir: "Có (Cổng thổi siêu áp ở đuôi)",
    isLuxBetter: true,
    cheapHandheld: "Không có",
    traditionalVac: "Hầu như không có"
  },
  {
    feature: "Tính linh động",
    luxAir: "Không dây, cầm tay (Nặng 400g)",
    isLuxBetter: true,
    cheapHandheld: "Không dây (Nặng 600g-800g)",
    traditionalVac: "Có dây cồng kềnh (Nặng 3kg-5kg)"
  },
  {
    feature: "Độ ồn khi hoạt động",
    luxAir: "≤ 65dB (Êm ái, dễ chịu)",
    isLuxBetter: true,
    cheapHandheld: "80dB - 85dB (Ồn, rè rít)",
    traditionalVac: "85dB - 90dB (Rất lớn, chói tai)"
  },
  {
    feature: "Bộ lọc khí",
    luxAir: "HEPA H13 (Lọc 99.97% bụi mịn)",
    isLuxBetter: true,
    cheapHandheld: "Lưới thép thô hoặc HEPA mỏng",
    traditionalVac: "Lọc túi vải thô hoặc HEPA dày bẩn"
  },
  {
    feature: "Cổng sạc & Năng lượng",
    luxAir: "Sạc Type-C (kèm củ sạc 5V-2A, sạc 4-5h), pin Lithium 2 cell",
    isLuxBetter: true,
    cheapHandheld: "Cáp sạc tròn cổ điển, pin chai nhanh",
    traditionalVac: "Cắm điện 220V trực tiếp bất tiện"
  }
];

export const BEFORE_AFTER_SCENARIOS: BeforeAfterScenario[] = [
  {
    id: "car-seat",
    title: "Nội thất Ô tô",
    beforeImg: "https://dodoto.vn/wp-content/uploads/2026/07/hut-noi-that-o-to-ban.webp",
    afterImg: "https://dodoto.vn/wp-content/uploads/2026/07/hut-o-to-sach.webp",
    labelBefore: "Bụi cát, thức ăn rơi vãi kẽ ghế",
    labelAfter: "Sạch bong kin kít trong 10 giây"
  },
  {
    id: "sofa-dust",
    title: "Đệm Ghế Sofa",
    beforeImg: "https://dodoto.vn/wp-content/uploads/2026/07/hut-ga-giuong-ban.webp",
    afterImg: "https://dodoto.vn/wp-content/uploads/2026/07/ga-giuong-sach.webp",
    labelBefore: "Lông thú cưng bám dính sợi vải",
    labelAfter: "Hút sạch sâu tận gốc sợi vải"
  },
  {
    id: "keyboard-key",
    title: "Kẽ phím Máy tính",
    beforeImg: "https://dodoto.vn/wp-content/uploads/2026/07/hut-khe-ke-may-tinh-ban.webp",
    afterImg: "https://dodoto.vn/wp-content/uploads/2026/07/hut-ban-phim-sach.webp",
    labelBefore: "Vụn bánh & bụi bám dưới kẽ phím",
    labelAfter: "Thổi sạch bóng không còn một vết"
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Phan Anh Tuấn",
    role: "Chủ xe Mazda 3 - Hà Nội",
    rating: 5,
    text: "Quá bất ngờ với lực hút của chiếc máy nhỏ gọn này. Mình hay hút bụi ô tô, mấy khe nhỏ ở taplo hay kẽ ghế da xe trước dọn cực khổ mà dùng Lux Air V5 thổi phát bụi bay ra rồi hút sạch luôn. Thiết kế cực sang trọng, cất vừa hộc cánh cửa xe luôn.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    date: "03/07/2026"
  },
  {
    id: "rev-2",
    name: "Nguyễn Thùy Linh",
    role: "Nhân viên văn phòng - TP.HCM",
    rating: 5,
    text: "Bàn làm việc của mình nhiều đồ decor với bàn phím cơ rất dễ bám bụi mịn. Máy này vừa có đầu chổi hút vừa có đầu thổi tiện dã man. Mình dùng thổi sạch bụi bàn phím cơ nhanh gọn lẹ. Pin trâu dọn cả tuần chưa hết.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    date: "10/07/2026"
  },
  {
    id: "rev-3",
    name: "Trần Minh Đức",
    role: "Kỹ sư công nghệ - Đà Nẵng",
    rating: 5,
    text: "Máy hút khỏe, hoạt động êm, nhiều đầu hút vừa có thể hút vụn bánh bàn làm việc, trên ô tô, nhan trên bàn thờ, nói chung là con này đa di năng. Rất đáng tiền nha",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    date: "12/07/2026"
  }
];

export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: "tiktok-1",
    title: "Thử thách dọn dẹp nội thất ô tô siêu bẩn cùng Lux Air V5",
    views: "1.2M lượt xem",
    duration: "0:45",
    thumbnailUrl: IMAGES.carCleaning,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "tiktok-2",
    title: "Chức năng thổi bụi máy tính cực đỉnh của Dodoto V5",
    views: "845K lượt xem",
    duration: "0:30",
    thumbnailUrl: IMAGES.sofaKeyboard,
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    id: "tiktok-3",
    title: "Đập hộp siêu phẩm máy hút bụi không dây luxury của năm",
    views: "2.1M lượt xem",
    duration: "1:00",
    thumbnailUrl: IMAGES.displayScreen,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "tiktok-4",
    title: "Làm sạch lông mèo bám cứng đầu trên ghế sofa trong 5 giây",
    views: "620K lượt xem",
    duration: "0:50",
    thumbnailUrl: IMAGES.solutionLifestyle,
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Lực hút 30.000Pa của Dodoto Lux Air V5 mạnh cỡ nào?",
    answer: "Lực hút 30.000Pa là một thông số cực kỳ ấn tượng đối với dòng máy hút bụi mini cầm tay. Với lực hút này, máy không chỉ hút sạch bụi mịn bám sâu mà còn dễ dàng nhấc bổng các vật nặng như đồng xu, đinh ốc, cát thô, hạt đậu hay lông động vật bám sâu trong các kẽ nội thất ô tô và giường nệm vải."
  },
  {
    id: "faq-2",
    question: "Chức năng thổi bụi của máy hoạt động như thế nào?",
    answer: "Máy có thiết kế luồng khí thẳng hai đầu thông minh. Ở phía đuôi máy được trang bị cổng sạc khí tăng áp chuyên dụng. Khi bạn lắp vòi phun thổi vào đuôi máy, luồng khí thải nén cực mạnh từ động cơ siêu tốc sẽ được dẫn hướng hẹp tạo thành vòi phun siêu áp, thổi bay bụi cứng đầu bám sâu trên linh kiện máy tính, kẽ điều hòa xe hơi hoặc khe phím."
  },
  {
    id: "faq-3",
    question: "Động cơ không chổi than (Brushless Motor) có ưu điểm gì so với động cơ thường?",
    answer: "Động cơ không chổi than sử dụng từ trường nam châm vĩnh cửu xoay chuyển bằng điện tử nên không bị ma sát chổi than. Điều này mang lại 3 ưu điểm vượt trội: 1) Tốc độ quay cao gấp 4 lần (lên đến 120.000 RPM) tạo lực hút mạnh hơn; 2) Hoạt động êm ái hơn, hạn chế tiếng ồn; 3) Tuổi thọ động cơ bền bỉ gấp 10 lần và không bị suy giảm hiệu suất theo thời gian."
  },
  {
    id: "faq-4",
    question: "Thời lượng pin sạc và thời gian sử dụng thực tế là bao lâu?",
    answer: "Dodoto Lux Air V5 tích hợp pin Lithium-Ion dòng xả cao hiệu năng lớn với hệ thống pin 2 cell. Ở chế độ Tiêu chuẩn dọn dẹp nhẹ nhàng, máy hoạt động liên tục lên tới 35 phút. Ở chế độ Siêu cấp Turbo lực hút tối đa 30.000Pa dọn vết bẩn nặng dính cứng, máy hoạt động từ 15-18 phút liên tục. Máy sử dụng cổng sạc Type-C tiện lợi (có củ sạc và dây sạc đi kèm), thời gian sạc đầy khoảng 4-5 giờ. Lưu ý: Chỉ sử dụng củ và dây sạc 5V-2A đi kèm, không hỗ trợ sạc nhanh để đảm bảo tuổi thọ pin tối đa."
  },
  {
    id: "faq-5",
    question: "Lõi lọc HEPA của máy có cần thay thế thường xuyên không?",
    answer: "Lõi lọc HEPA chuẩn H13 của máy được thiết kế bằng màng sợi thủy tinh đa lớp mật độ cao siêu bền. Bạn hoàn toàn có thể tháo rời dốc sạch bụi và RỬA SẠCH bằng nước lạnh, sau đó phơi thật khô là có thể tiếp tục sử dụng bình thường. Khuyên dùng rửa sạch lõi lọc sau mỗi 5-7 lần sử dụng để duy trì lực hút ở trạng thái mạnh nhất. Thông thường lõi lọc có độ bền từ 6-12 tháng mới cần thay thế định kỳ."
  },
  {
    id: "faq-6",
    question: "Chính sách bảo hành và đổi trả của thương hiệu Dodoto như thế nào?",
    answer: "Dodoto cam kết mang lại trải nghiệm an tâm mua sắm tuyệt đối cho khách hàng: Bảo hành chính hãng 24 tháng, dùng thử 15 ngày, đổi trả trong vòng 30 ngày đầu."
  }
];
