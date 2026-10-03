import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Clock, 
  Search, 
  Scroll, 
  Compass, 
  MapPin, 
  Users, 
  BookMarked, 
  Sparkles, 
  Layers, 
  Milestone,
  CheckCircle2,
  Calendar,
  Grid,
  ListFilter,
  Star
} from "lucide-react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { heroFadeScale, fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { trackTimelineOpen, trackTimelineEraSelected, trackSectionView } from "@/lib/analytics";

// Existing exports preserved for SearchIndex compatibility
export const oldTestament = [
  { id: "bible-ot-gen", name: "التكوين", chapters: 50, category: "التوراة" },
  { id: "bible-ot-ex", name: "الخروج", chapters: 40, category: "التوراة" },
  { id: "bible-ot-lev", name: "اللاويين", chapters: 27, category: "التوراة" },
  { id: "bible-ot-num", name: "العدد", chapters: 36, category: "التوراة" },
  { id: "bible-ot-deut", name: "التثنية", chapters: 34, category: "التوراة" },
  { id: "bible-ot-josh", name: "يشوع", chapters: 24, category: "التاريخ" },
  { id: "bible-ot-ps", name: "المزامير", chapters: 150, category: "الشعر" },
  { id: "bible-ot-prov", name: "الأمثال", chapters: 31, category: "الحكمة" },
  { id: "bible-ot-isa", name: "إشعياء", chapters: 66, category: "الأنبياء الكبار" },
  { id: "bible-ot-jer", name: "إرميا", chapters: 52, category: "الأنبياء الكبار" }
];

export const newTestament = [
  { id: "bible-nt-matt", name: "متى", chapters: 28, category: "الأناجيل" },
  { id: "bible-nt-mark", name: "مرقس", chapters: 16, category: "الأناجيل" },
  { id: "bible-nt-luke", name: "لوقا", chapters: 24, category: "الأناجيل" },
  { id: "bible-nt-john", name: "يوحنا", chapters: 21, category: "الأناجيل" },
  { id: "bible-nt-acts", name: "أعمال الرسل", chapters: 28, category: "التاريخ" },
  { id: "bible-nt-rom", name: "الرومية", chapters: 16, category: "رسائل بولس" },
  { id: "bible-nt-1cor", name: "كورنثوس الأولى", chapters: 16, category: "رسائل بولس" },
  { id: "bible-nt-2cor", name: "كورنثوس الثانية", chapters: 13, category: "رسائل بولس" },
  { id: "bible-nt-heb", name: "العبرانيين", chapters: 13, category: "الرسائل" },
  { id: "bible-nt-rev", name: "الرؤيا", chapters: 22, category: "النبوة" }
];

export const copticContributions = [
  {
    id: "bible-cc-translation",
    title: "الترجمة القبطية",
    description: "من أقدم ترجمات الكتاب المقدس، تمت في القرن الثالث الميلادي",
    details: [
      "ترجمة مباشرة من النصوص اليونانية الأصلية",
      "ساعدت في حفظ النص الكتابي الأصلي",
      "شهادة على صحة النصوص الموجودة",
      "استخدمت اللهجات القبطية المختلفة"
    ],
    icon: "📜",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "bible-cc-fathers",
    title: "التفاسير الآبائية",
    description: "كتب الآباء القبط تفاسير عميقة للكتاب المقدس",
    details: [
      "تفاسير القديس كيرلس الكبير",
      "تفاسير أوريجانوس",
      "شروحات القديس أثناسيوس",
      "كتابات ديديموس الضرير"
    ],
    icon: "✍️",
    color: "from-green-500 to-green-700"
  },
  {
    id: "bible-cc-manuscripts",
    title: "المخطوطات",
    description: "حفظت الكنيسة القبطية آلاف المخطوطات الثمينة",
    details: [
      "مخطوطات نجع حمادي",
      "مكتبة دير سانت كاترين",
      "مخطوطات وادي النطرون",
      "البرديات القبطية القديمة"
    ],
    icon: "📖",
    color: "from-purple-500 to-purple-700"
  }
];

// --- 🏛️ القسم الأول: الحقبات التاريخية الست ---
export interface EraItem {
  id: string;
  icon: string;
  title: string;
  range: string;
  summary: string;
  stages: string[];
  color: string;
}

export const timelineErasData: EraItem[] = [
  {
    id: "era-beginnings",
    icon: "🏛️",
    title: "حقبة البدايات والآباء",
    range: "من بدء الخلق وحتى انتقال بني إسرائيل إلى مصر.",
    summary: "تغطي أحداث الخلق والتاريخ البشري الأول، عهد الله مع الآباء (إبراهيم، إسحاق، يعقوب، يوسف) والاستقرار في كنعان ثم الهجرة إلى مصر.",
    stages: ["1. البدايات", "2. عصر الآباء"],
    color: "from-yellow-500 to-amber-700"
  },
  {
    id: "era-exodus",
    icon: "📜",
    title: "حقبة الخروج والشريعة والاستقرار",
    range: "من عبودية مصر وحتى عصر القضاة.",
    summary: "تستعرض عبودية مصر والخروج المعجزي، استلام الشريعة عند سيناء، التيه في البرية، وامتلاك كنعان في عصر يشوع والقضاة.",
    stages: ["3. مصر والخروج", "4. موسى وسيناء", "5. التيه في البرية", "6. يشوع ودخول كنعان", "7. عصر القضاة"],
    color: "from-emerald-500 to-teal-700"
  },
  {
    id: "era-kingdom",
    icon: "👑",
    title: "حقبة المملكة والهيكل وانقسام الدولة",
    range: "من تأسيس الملكية وحتى سقوط المملكة الشمالية وصمود يهوذا.",
    summary: "تغطي تأسيس الملكية مع شاول وداود، بناء الهيكل الأول في عهد سليمان، انقسام المملكة إلى إسرائيل ويهوذا، وأحداث المملكة الشمالية وتخريب آشور.",
    stages: ["8. صموئيل وشاول", "9. داود", "10. سليمان وبناء الهيكل", "11. انقسام المملكة", "12. المملكة الشمالية", "13. المملكة الجنوبية"],
    color: "from-purple-500 to-purple-700"
  },
  {
    id: "era-exile",
    icon: "🏛️",
    title: "حقبة السبي والعودة وإعادة البناء",
    range: "من سقوط نينوى وخراب أورشليم وحتى عصر نحميا.",
    summary: "تشمل سقوط نينوى، خراب أورشليم والسبي البابلي، مرسوم كورش الفارسي والعودة إلى صهيون، بناء الهيكل الثاني، وإصلاحات عزرا ونحميا.",
    stages: ["14. سقوط نينوى", "15. السبي البابلي", "16. خراب أورشليم", "17. العودة من السبي", "18. إعادة بناء الهيكل", "19. عزرا ونحميا"],
    color: "from-orange-500 to-stone-700"
  },
  {
    id: "era-prophecy",
    icon: "🕊️",
    title: "حقبة النبوءات وانتظار المَسِيح",
    range: "الأنبياء والثورة المكابية.",
    summary: "تغطي صياغة النبوءات المسكونية بالعهد الجديد، الثورة المكابية، والتطلع الروحي لمجيء الفادي.",
    stages: ["20. الأنبياء وانتظار مجيء المسيح"],
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "era-newtestament",
    icon: "✝️",
    title: "حقبة العهد الجديد والكنيسة الرسولية",
    range: "القرن الأول الميلادي.",
    summary: "تغطي حياة المسيح وخدمته وإعلاناته اللاهوتية، الصليب والقيامة، حلول الروح القدس، انطلاق الكنيسة الأولى، رحلات بولس الرسول، وسفر الرؤيا.",
    stages: [
      "21. العهد الجديد",
      "22. المسيح وخدمته",
      "23. الصليب والقيامة",
      "24. الكنيسة الأولى",
      "25. الرسل وانتشار الإنجيل",
      "26. بولس الرسول ورحلاته",
      "27. العصر الرسولي",
      "28. سفر الرؤيا"
    ],
    color: "from-red-500 to-red-700"
  }
];

// --- 📇 القسم الثاني: بطاقات المحتوى التفاعلي (28 بطاقة) ---
export interface TimelineCard {
  id: number;
  testament: "ot" | "nt";
  testamentLabel: string;
  title: string;
  era: string;
  event: string;
  people: string;
  books: string;
  places: string;
  context: string;
  iconType: string;
}

export const timelineCardsData: TimelineCard[] = [
  // 📌 بطاقات العهد القديم (1 - 20)
  {
    id: 1,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "البدايات",
    era: "حقبة التكوين الأولى",
    event: "خلق العالم والتاريخ الأول للبشرية وطوفان نوح وسفينة أرارات وبناء برج بابل.",
    people: "آدم، حواء، نوح",
    books: "سفر التكوين (الإصحاحات 1-11)",
    places: "أور، جبل أرارات، بابل",
    context: "الروايات الأولى للبشرية ومقارنتها بالآثار الشرقية القديمة (مثل أترا هاسس وملحمة جلجامش).",
    iconType: "🌍"
  },
  {
    id: 2,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "عصر الآباء",
    era: "عصر الآباء الأوائل",
    event: "عهد الله مع الآباء، تقديم إسحاق ذبيحة، وبركة يعقوب وانتقال بني إسرائيل إلى مصر.",
    people: "إبراهيم، إسحاق، يعقوب، يوسف",
    books: "سفر التكوين (الإصحاحات 12-50)",
    places: "أور الكلدانيين، كنعان، الخليل، مصر",
    context: "ترك أور والاستقرار في كنعان ثم الهجرة إلى مصر بسبب المجاعة.",
    iconType: "⛺"
  },
  {
    id: 3,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "مصر والخروج",
    era: "عصر الخروج المعجزي",
    event: "عبودية بني إسرائيل في مصر والضربات العشر والخروج المعجزي عبر البحر الأحمر.",
    people: "موسى، فرعون مصر",
    books: "سفر الخروج",
    places: "مصر القديمة، البحر الأحمر",
    context: "حدث محوري في تشكيل الهوية الجماعية والذاكرة التاريخية للعهد القديم.",
    iconType: "🌊"
  },
  {
    id: 4,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "موسى وسيناء",
    era: "حقبة سيناء والشريعة",
    event: "إبرام العهد عند جبل سيناء، استلام ألواح الشريعة العشر، وتأسيس خيمة الاجتماع.",
    people: "موسى النبي",
    books: "الخروج، اللاويين، التثنية",
    places: "جبل سيناء، البرية",
    context: "تأسيس الشريعة والطقوس الكهنوتية والحلول الإلهي في الخيمة.",
    iconType: "📜"
  },
  {
    id: 5,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "التيه في البرية",
    era: "حقبة البرية",
    event: "تجوال الشعب لمدة 40 سنة لإعداد جيل جديد وتنقية الإيمان حتى وفاة موسى.",
    people: "موسى النبي",
    books: "سفر العدد، سفر التثنية",
    places: "برية سيناء وتاران",
    context: "إعداد الشعب لدخول أرض الميعاد وختام أسفار التوراة الخمسة.",
    iconType: "🏜️"
  },
  {
    id: 6,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "يشوع ودخول كنعان",
    era: "عصر الاستقرار الأول",
    event: "عبور نهر الأردن، سقوط أسوار أريحا، وامتلاك وتقسيم أرض كنعان بين الأسباط.",
    people: "يشوع بن نون",
    books: "سفر يشوع",
    places: "أرض كنعان، نهر الأردن، أريحا",
    context: "بدء تاريخ بني إسرائيل وتثبيت وجودهم في الأرض المقدسة.",
    iconType: "🎺"
  },
  {
    id: 7,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "عصر القضاة",
    era: "حقبة القضاة وراعوث",
    event: "كفاح الشعب تحت حكم القضاة، وقصة راعوث الموآبية وبوعز في حقل بيت لحم.",
    people: "القضاة، راعوث، بوعز",
    books: "سفر القضاة، سفر راعوث",
    places: "أرض كنعان، بيت لحم",
    context: "استقرار قبلي وصراعات محلية وتوطيد سلالة داود الملكية.",
    iconType: "🌾"
  },
  {
    id: 8,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "صموئيل وشاول",
    era: "حقبة تأسيس الملكية",
    event: "نذر صموئيل في شيلوه، التحول من الحكم القبلي إلى مسح شاول أول ملك.",
    people: "صموئيل النبي، شاول الملك",
    books: "سفر صموئيل الأول",
    places: "شيلوه، أرض كنعان",
    context: "تأسيس نظام الملكية بناءً على طلب الشعب لتذليل الصراعات.",
    iconType: "👑"
  },
  {
    id: 9,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "داود",
    era: "أواخر القرن 9 / أوائل 8 ق.م (أثرياً)",
    event: "صعود داود وتوحيد المملكة وجعل أورشليم عاصمة وتثبيت سلالة \"بيت داود\".",
    people: "الملك داود",
    books: "صموئيل الثاني، أخبار الأيام، المزامير",
    places: "أورشليم (القدس)",
    context: "إثبات سلالة داود أثرياً بنقش تل القاضي (تل دان) الآرامي المكتشف عام 1993م.",
    iconType: "🛡️"
  },
  {
    id: 10,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "سليمان وبناء الهيكل",
    era: "القرن 10 ق.م (تقليدياً)",
    event: "بناء الهيكل الأول في أورشليم، ازدهار المملكة، واستقبال ملكة سبأ.",
    people: "الملك سليمان، ملكة سبأ",
    books: "الملوك الأول، أخبار الأيام، الحكمة",
    places: "أورشليم (الهيكل الأول)",
    context: "مركزية العبادة الكهنوتية واللاوية وتأسيس أورشليم كمركز ديني دولي.",
    iconType: "🏛️"
  },
  {
    id: 11,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "انقسام المملكة",
    era: "حقبة المملكة الانقسامية",
    event: "انقسام الدولة عقب سليمان إلى مملكة إسرائيل (شمالاً) ومملكة يهوذا (جنوباً).",
    people: "ملوك إسرائيل ويهوذا",
    books: "سفر الملوك الأول، أخبار الأيام",
    places: "السامرة، أورشليم",
    context: "تدهور الصراعات الداخلية وتشتت المواقف الدينية والشريعة.",
    iconType: "⚡"
  },
  {
    id: 12,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "المملكة الشمالية",
    era: "القرن 12 إلى 8 ق.م (سقوط 722 ق.م)",
    event: "أحداث إسرائيل الشمالية، خدمة إيليا النبي عند نهر كريث، وسقوط السامرة على يد آشور.",
    people: "ملوك إسرائيل، إيليا النبي",
    books: "الملوك الأول والثاني، عاموس، هوشع",
    places: "السامرة، جبل حوريب، نهر كريث",
    context: "صعود الإمبراطورية الآشورية الحديثة وتدمير المملكة الشمالية.",
    iconType: "🔥"
  },
  {
    id: 13,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "المملكة الجنوبية",
    era: "القرن 8 إلى 6 ق.م (سقوط 586 ق.م)",
    event: "صمود مملكة يهوذا، إصلاحات يوشيا الملك، والتخريب الآشوري لمدن الجنوب.",
    people: "يوشيا الملك، إرميا، إشعياء",
    books: "الملوك الثاني، أخبار الأيام، إشعياء",
    places: "أورشليم، مدن جنوب يهوذا",
    context: "التوثيق الأثري للحملات الآشورية في جنوب يهوذا المذكورة بالملوك الثاني.",
    iconType: "🏰"
  },
  {
    id: 14,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "سقوط نينوى",
    era: "حقبة سقوط آشور",
    event: "رسائل النبوءات والدعوات الموجهة لعاصمة آشور وتوبتها التاريخية.",
    people: "يونان النبي، ناحوم النبي",
    books: "سفر يونان، سفر ناحوم",
    places: "مدينة نينوى",
    context: "دعوة التوبة لأهل نينوى وصومهم التاريخي الموثق كنسياً وتاريخياً.",
    iconType: "🐋"
  },
  {
    id: 15,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "السبي البابلي",
    era: "حوالي 586 ق.م (أو 587 ق.م)",
    event: "سقوط يهوذا، تدمير أورشليم والهيكل، ونفي الشعب إلى بابل وتدوين التاريخ التثنوي.",
    people: "نبوخذ نصر البابلي، حزقيال، دانيال",
    books: "الملك الثاني، إرميا، حزقيال، دانيال",
    places: "مدينة بابل، أورشليم",
    context: "صياغة التاريخ التثنوي والتراث الديني أثناء فترة المنفى البابلي.",
    iconType: "⛓️"
  },
  {
    id: 16,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "خراب أورشليم",
    era: "587 / 586 ق.م",
    event: "حصار البابليين للقدس، هدم هيكل سليمان بالكامل، ورثاء إرميا للنكبة.",
    people: "البابليون، سكان يهوذا",
    books: "سفر الملوك الثاني، مراثي إرميا",
    places: "أورشليم (القدس)",
    context: "الانهيار السياسي والديني للمملكة الجنوبية ونفي السكان.",
    iconType: "💔"
  },
  {
    id: 17,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "العودة من السبي",
    era: "حوالي 538 ق.م (الفترة الفارسية)",
    event: "مرسوم كورش الفارسي بالعودة، وتشكيل أسفار التوراة الخمسة في شكلها النهائي.",
    people: "كورش الفارسي، العائدون إلى صهيون",
    books: "عزرا، نحميا، أخبار الأيام",
    places: "أورشليم، يهوذا (مدينات يهود)",
    context: "صعود الإمبراطورية الفارسية وتثبيت النص التوراتي التجميعي.",
    iconType: "🕊️"
  },
  {
    id: 18,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "إعادة بناء الهيكل",
    era: "القرن 6 - 5 ق.م",
    event: "تأسيس وبناء الهيكل الثاني بأورشليم واستعادة العبادة الكهنوتية والطقسية.",
    people: "الكهنة والعائدون من بابل",
    books: "سفر عزرا، حجي، زكريا",
    places: "أورشليم (الهيكل الثاني)",
    context: "استعادة مركزية القدس والهيكل الثاني كقلب روحي للشعب العائد.",
    iconType: "🏗️"
  },
  {
    id: 19,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "عزرا ونحميا",
    era: "حوالي 400 ق.م (القرن 5-4 ق.م)",
    event: "إعادة عزرا الكاتب للتوراة من بابل، بناء نحميا لأسوار أورشليم وتأسيس المكتبة.",
    people: "عزرا الكاتب، نحميا الحاكم",
    books: "سفر عزرا، سفر نحميا",
    places: "أورشليم (القدس)",
    context: "تنظيم الجماعة الدينية حول الشريعة وتجميع الأسفار المقدسة.",
    iconType: "🧱"
  },
  {
    id: 20,
    testament: "ot",
    testamentLabel: "العهد القديم",
    title: "الأنبياء وانتظار المسيا",
    era: "القرن 8 ق.م إلى 2 ق.م",
    event: "صياغة النبوءات بالعهد الجديد، الثورة المكابية 167 ق.م، وكتابة دانيال (168-164 ق.م).",
    people: "إشعياء، إرميا، دانيال، الماكابيون",
    books: "أسفار الأنبياء، دانيال، المكابيين",
    places: "يهوذا، الشتات الهلنستي",
    context: "النبوءات بالعهد الجديد وانتظار الفداء الإلهي وحرية العبادة.",
    iconType: "🕯️"
  },

  // ✝️ بطاقات العهد الجديد (21 - 28)
  {
    id: 21,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "العهد الجديد",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "تدوين 27 سفرًا باللغة اليونانية الكوينية في ظل الهيمنة الرومانية (27 ق.م).",
    people: "يسوع المسيح، الرسل والكتّاب",
    books: "الأناجيل الأربعة، الرسائل، الأعمال، الرؤيا",
    places: "الشرق الأدنى، العالم المتوسطي",
    context: "انتشار الثقافة اليونانية وسيادة الحكم الروماني كخلفية لظهور الإنجيل.",
    iconType: "📖"
  },
  {
    id: 22,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "المسيح وخدمته",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "حياة يسوع الناصري وتعاليمه وإعلان قيصرية فيلبس واعتراف بطرس بلاهوته.",
    people: "يسوع المسيح، سمعان بطرس، التلاميذ",
    books: "إنجيل متى، مرقس، لوقا، يوحنا",
    places: "الجليل، قيصرية فيلبس، جبل حرمون",
    context: "إعلان الإيمان بـ\"ابن الله الحي\" مقابل معبد أغسطس ونبع الهاوية الوثني.",
    iconType: "✝️"
  },
  {
    id: 23,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "الصليب والقيامة",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "آلام يسوع وصلبه وموته وقيامته لإتمام الفداء الموعود وتأسيس العهد الجديد.",
    people: "يسوع المسيح، التلاميذ",
    books: "الأناجيل الأربعة القانونية",
    places: "أورشليم (القدس)",
    context: "الحدث المحوري والتأسيسي للإيمان المسيحي والفداء الإلهي.",
    iconType: "☀️"
  },
  {
    id: 24,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "الكنيسة الأولى",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "حلول الروح القدس في يوم العنصرة ونشوء الجماعة المسيحية الأولى بأورشليم.",
    people: "بطرس الرسول، يعقوب البار",
    books: "سفر أعمال الرسل",
    places: "أورشليم (القدس)",
    context: "الحياة المشتركة والشفاءات والاضطهادات الأولى وتوسع الكنيسة.",
    iconType: "🕊️"
  },
  {
    id: 25,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "الرسل وانتشار الإنجيل",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "امتداد الرسالة إلى غير اليهود، عقد مجلس أورشليم، والانفصال عن اليهودية.",
    people: "بطرس، يعقوب، الرسل",
    books: "أعمال الرسل، الرسائل العامة",
    places: "أورشليم، أنطاكية، مدن المتوسط",
    context: "قبول الأمم في الإيمان والانطلاق لتأسيس الكنائس الإقليمية.",
    iconType: "⛵"
  },
  {
    id: 26,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "بولس الرسول ورحلاته",
    era: "القرن الأول الميلادي (القرن 1 م)",
    event: "اهتداء بولس الدمشقي، رحلاته التبشيرية الثلاث، تدوين 13 رسالة، وسجنه بروما.",
    people: "بولس الطرسوسي، حنانيا الدمشقي",
    books: "أعمال الرسل، رسائل بولس الـ 13",
    places: "طريق دمشق، أنطاكية، مدن المتوسط، روما",
    context: "انتشار المسيحية في حواضر الإمبراطورية الرومانية وصولاً للمحاكمة بروما.",
    iconType: "✉️"
  },
  {
    id: 27,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "العصر الرسولي",
    era: "أواخر القرن الأول الميلادي",
    event: "تنظيم الكنائس وتثبيت القانون الرسولي المكون من 27 سفرًا وتناقله عبر الآباء.",
    people: "الرسل الأقنوميون، الآباء الرسوليون",
    books: "أسفار العهد الجديد (27 سفرًا)",
    places: "العالم المتوسطي الشرقي",
    context: "صيانة التعليم الأصلي والرد على الانحرافات والعقائد الوافدة.",
    iconType: "🏛️"
  },
  {
    id: 28,
    testament: "nt",
    testamentLabel: "العهد الجديد",
    title: "سفر الرؤيا",
    era: "أواخر القرن الأول الميلادي",
    event: "رؤى يوحنا النبوية في جزيرة بطمس الموجهة لكنائس آسيا السبع وحقائق الآخرة.",
    people: "يوحنا البطمسي",
    books: "سفر رؤيا يوحنا",
    places: "جزيرة بطمس، كنائس آسيا السبع",
    context: "الأدب الرؤيوي، صور المرأة والوحش وأورشليم الجديدة الممتلئة مجداً.",
    iconType: "👑"
  }
];

// --- 📚 القسم الثالث: الأدلة والقوائم المجمعة لمرجعية الموقع ---
export const chronologicalMilestones = [
  { step: 1, era: "القرن 18 ق.م", approxYear: -1800, periodType: "ق.م", event: "قصة أترا هاسس الأكادية للطوفان.", badge: "آثار بلاد الرافدين", color: "#f59e0b" },
  { step: 2, era: "بين 1300 - 1000 ق.م", approxYear: -1300, periodType: "ق.م", event: "ملحمة جلجامش البابلية.", badge: "أدب الشرق القديم", color: "#f97316" },
  { step: 3, era: "القرن 12 - 7 ق.م", approxYear: -1100, periodType: "ق.م", event: "صعود وتراجع الإمبراطورية الآشورية.", badge: "تاريخ إمبراطوري", color: "#8b5cf6" },
  { step: 4, era: "أواخر القرن 9 / أوائل 8 ق.م", approxYear: -820, periodType: "ق.م", event: "نقش تل القاضي (تل دان) الآرامي المكتشف عام 1993م الذي يذكر \"بيت داود\".", badge: "إثبات سلالة داود", color: "#ef4444" },
  { step: 5, era: "نهاية القرن 8 ق.م", approxYear: -701, periodType: "ق.م", event: "التخريب الآشوري الموثق أثرياً لمدن جنوب يهوذا (الملوك الثاني 18: 13).", badge: "توثيق حفريات أثرية", color: "#dc2626" },
  { step: 6, era: "القرن 8 - 6 ق.م", approxYear: -700, periodType: "ق.م", event: "كتابة معظم أسفار الأنبياء.", badge: "تدوين نبوي", color: "#3b82f6" },
  { step: 7, era: "587 / 586 ق.م", approxYear: -587, periodType: "ق.م", event: "سقوط أورشليم وهدم الهيكل الأول والسبي البابلي.", badge: "منعطف تاريخي", color: "#b91c1c" },
  { step: 8, era: "538 ق.م", approxYear: -538, periodType: "ق.م", event: "مرسوم كورش الفارسي بالعودة وتشكيل التوراة بالشكل النهائي (538-332 ق.م).", badge: "مرسوم فارسي", color: "#10b981" },
  { step: 9, era: "حوالي 400 ق.م", approxYear: -400, periodType: "ق.م", event: "عودة عزرا الكاتب وتأسيس مكتبة نحميا.", badge: "إعادة البناء والشريعة", color: "#14b8a6" },
  { step: 10, era: "القرن 3 ق.م - القرن 1 م", approxYear: -250, periodType: "ق.م - م", event: "النطاق الزمني لكتابة مخطوطات البحر الميت بقمران (اكتشفت 1946-1956م).", badge: "مخطوطات قمران", color: "#7c3aed" },
  { step: 11, era: "168 - 164 ق.م", approxYear: -168, periodType: "ق.م", event: "كتابة إصحاحات دانيال (10-12) وحوادث الثورة المكابية 167 ق.م.", badge: "عصر المكابيين", color: "#eab308" },
  { step: 12, era: "27 ق.م", approxYear: -27, periodType: "ق.م", event: "تأسيس عهد الزعامة الروماني والهيمنة على الشرق الأدنى.", badge: "الإمبراطورية الرومانية", color: "#a8a29e" },
  { step: 13, era: "القرن 1 م", approxYear: 30, periodType: "م", event: "تدوين أسفار العهد الجديد الـ 27 باللغة اليونانية الكوينية.", badge: "نصوص الإنجيل", color: "#3b82f6" },
  { step: 14, era: "70 م", approxYear: 70, periodType: "م", event: "تدمير الرومان للهيكل الثاني بأورشليم.", badge: "خراب الهيكل الثاني", color: "#ef4444" },
];

export const archaeologicalDiscoveries = [
  {
    title: "نقش تل القاضي (تل دان)",
    description: "نقش آرامي يعود لأواخر القرن 9 ق.م يثبت تاريخية سلالة داود الملكية.",
    significance: "يُعتبر أول وأقوى شاهد أثري معاصر يذكر سلالة 'بيت داود' خارج النص الكتابي، ويدحض ادعاءات نفي تاريخية الملك داود.",
    tag: "القرن 9 ق.م",
    icon: "🏺",
    color: "from-blue-500 to-blue-700"
  },
  {
    title: "التخريب الآشوري بيهوذا",
    description: "أدلة حفريات أثرية جنوب القدس تطابق نص سفر الملوك الثاني (18: 13).",
    significance: "كشفت الحفريات طبقات الحريق والدمار المتطابقة تماماً مع سجلات حملات سنحاريب الآشوري ضد مدن يهوذا الحصينة.",
    tag: "نهاية القرن 8 ق.م",
    icon: "🔥",
    color: "from-red-500 to-red-700"
  },
  {
    title: "مخطوطات البحر الميت (قمران)",
    description: "981 مخطوطة و15,000 قطعة ترجع بين القرن 3 ق.م والقرن 1 م تؤكد أمانة حفظ النصوص.",
    significance: "أعظم كشف مخطوطاتي في القرن العشرين، أثبت التطابق المذهل بين نصوص العهد القديم عبر ألف سنة من النساخة.",
    tag: "القرن 3 ق.م - 1 م",
    icon: "📜",
    color: "from-purple-500 to-purple-700"
  },
  {
    title: "معبد أغسطس ونبع الهاوية لقيصرية فيلبس",
    description: "بقايا أثرية تثبت الخلفية التاريخية لحوار إعلان الإيمان في متى 16.",
    significance: "تُظهر الخلفية الجغرافية عند سفح جبل حرمون وصخرته الشاهقة أمام المعابد الوثنية، حيث قال المسيح: 'على هذه الصخرة أبني كنيستي'.",
    tag: "القرن 1 م",
    icon: "🏛️",
    color: "from-emerald-500 to-teal-700"
  }
];

export const typologicalSymbols = [
  {
    symbol: "العهد الجديد الموعود",
    otContext: "نبوة إرميا النبي (31: 31) بقطع عهد جديد مع بيت إسرائيل ويهوذا مغفور الخطايا ومكتوب في القلوب.",
    ntFulfillment: "تأسيس العهد الجديد بدم المسيح الفادي في العشاء السري، والتأكيد على اكتمال الناموس بالنعمة والحق.",
    badge: "العهد والنعمة"
  },
  {
    symbol: "صخرة الإيمان",
    otContext: "استخدام صخرة جبل حرمون الشاهقة ومعاقل الصخور في مزامير داود كرمز للحماية واللجوء الإلهي.",
    ntFulfillment: "إعلان قيصرية فيلبس واعتراف بطرس بلاهوت المسيح 'أنت هو المسيح ابن الله الحي'، وثبات الكنيسة وصمودها أمام أبواب الجحيم.",
    badge: "ثبات الكنيسة"
  },
  {
    symbol: "ذبيحة إسحاق",
    otContext: "تقديم إبراهيم لابنه الوحيد المحبوب إسحاق ذبيحة على جبل المريا وفداؤه بالكبش الممسك في الغابة.",
    ntFulfillment: "فداء الله للبشرية بتقديم الابن الوحيد يسوع المسيح ذبيحة كفارية حية على الصليب لخلاص العالم.",
    badge: "الفداء بالصليب"
  },
  {
    symbol: "شفرة وصوم يونان",
    otContext: "بقاء يونان النبي ثلاثة أيام وثلاث ليالٍ في جوف الحوت، ومناداته بالتوبة لأهل نينوى وخلاصهم.",
    ntFulfillment: "إشارة المسيح الصريحة لآية يونان النبي كمثال لموته ودفنه وقيامته في اليوم الثالث، وانفتاح باب الإيمان والتوبة للأمم.",
    badge: "القيامة والبشارة"
  }
];

export function BiblePage() {
  const [activeTestamentFilter, setActiveTestamentFilter] = useState<"all" | "ot" | "nt">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [activeReferenceTab, setActiveReferenceTab] = useState<"dates" | "archaeology" | "typology">("dates");

  // Filtering cards based on search and testament filter
  const filteredCards = useMemo(() => {
    return timelineCardsData.filter((card) => {
      const matchesFilter =
        activeTestamentFilter === "all" || card.testament === activeTestamentFilter;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFilter;

      const matchesQuery =
        card.title.toLowerCase().includes(query) ||
        card.era.toLowerCase().includes(query) ||
        card.event.toLowerCase().includes(query) ||
        card.people.toLowerCase().includes(query) ||
        card.books.toLowerCase().includes(query) ||
        card.places.toLowerCase().includes(query) ||
        card.context.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [activeTestamentFilter, searchQuery]);

  return (
    <PageWrapper className="min-h-screen bg-white overflow-hidden text-gray-800" dir="rtl">
      
      {/* 🌟 HERO SECTION (نفس هيرو صفحة History بالضبط) 🌟 */}
      <section className="hp-hero relative min-h-[55vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] py-16 sm:py-24 flex items-center overflow-hidden bg-gradient-to-br from-stone-950 via-orange-950 to-amber-900">
        <div className="hp-hero-bg absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <div 
              className="w-full h-full bg-cover bg-center opacity-75 sm:opacity-80"
              style={{ backgroundImage: "url('/image/ChatGPT Image Sep 10, 2026, 07_12_16 PM.png')" }}
            />
          </motion.div>
          <div className="hp-depth-soft absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="hp-depth-strong absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-200/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950/65 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-5xl">
          <motion.div
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            className="hp-hero-kicker inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 mb-8 text-sm sm:text-base text-yellow-200 backdrop-blur-sm"
          >
            <Star size={18} />
            رحلة الكلمة والتدبير عبر التاريخ
          </motion.div>

          <motion.h1
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="hp-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-bold leading-tight drop-shadow-2xl"
          >
            الكتاب المقدس عبر التاريخ
          </motion.h1>

          <motion.p
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="hp-hero-copy text-lg sm:text-xl md:text-2xl text-yellow-200 max-w-4xl mx-auto leading-relaxed"
          >
            خريطة زمنية شاملة، بطاقات تفاعلية للعهدين، وشواهد أثرية ونبوية موثقة
          </motion.p>

          {/* Quick Jump Action Buttons */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            animate="show" 
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a 
              href="#eras-overview"
              className="inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-gradient-to-r from-orange-600 to-red-700 px-6 py-3 text-sm sm:text-base font-bold text-white shadow-xl shadow-red-950/30 transition-all hover:scale-105"
            >
              <Compass size={18} />
              <span>الحقبات الست الكبرى</span>
            </a>

            <a 
              href="#timeline-cards"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
            >
              <Layers size={18} />
              <span>البطاقات التفاعلية (28)</span>
            </a>

            <a 
              href="#archaeology-reference"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
            >
              <Milestone size={18} />
              <span>الأدلة والشواهد الأثرية</span>
            </a>
          </motion.div>

          {/* Facts & Stats bar */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            animate="show" 
            transition={{ delay: 0.7 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-bold text-yellow-300">6</span>
              <span className="text-xs sm:text-sm text-yellow-100">حقبات تاريخية</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-bold text-yellow-300">28</span>
              <span className="text-xs sm:text-sm text-yellow-100">محطة تفاعلية</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-bold text-yellow-300">14+</span>
              <span className="text-xs sm:text-sm text-yellow-100">شاهداً أثرياً</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-bold text-yellow-300">100%</span>
              <span className="text-xs sm:text-sm text-yellow-100">تطابق كتابي وأثري</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🏛️ القسم الأول: الخريطة الزمنية العامة (مقسمة بالحقبات التاريخية) 🏛️ */}
      <section id="eras-overview" className="hp-era-overview-section py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-section-head text-center mb-14"
          >
            <span className="inline-block rounded-full bg-red-50 border border-red-200/60 px-4 py-1.5 text-xs sm:text-sm font-bold text-red-800 mb-3">
              🏛️ أولاً: الخريطة العامة
            </span>
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 text-red-900 font-bold">
              الخريطة الزمنية العامة (مقسمة بالحقبات التاريخية)
            </h2>
            <p className="hp-section-copy text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              مسيرة العهد الإلهي وتاريخ خلاص البشرية مقسماً إلى ست حقبات تاريخية محورية من بدء الخليقة حتى ختام العصر الرسولي وسفر الرؤيا.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {timelineErasData.map((era, index) => (
              <motion.article
                key={era.id}
                onClick={() => trackTimelineEraSelected(era.title, 'bible')}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="hp-era-card group rounded-3xl p-6 sm:p-7 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
              >
                {/* Decorative ghost number matching HistoryPage style */}
                <div className="pointer-events-none absolute left-3 top-3 text-6xl font-black leading-none text-red-900/5 select-none">
                  0{index + 1}
                </div>

                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${era.color} mb-5 shadow-md`}>
                    <span className="text-2xl">{era.icon}</span>
                  </div>

                  <h3 className="font-bold text-xl sm:text-2xl text-red-950 mb-3 group-hover:text-red-800 transition-colors">
                    {era.title}
                  </h3>

                  {/* Range / النطاق */}
                  <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-3.5 border border-gray-200/70 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <Clock size={16} className="mt-0.5 flex-shrink-0 text-red-700" />
                    <div>
                      <strong className="text-red-900 ml-1">النطاق:</strong>
                      <span>{era.range}</span>
                    </div>
                  </div>

                  {/* Summary / الملخص */}
                  <p className="text-sm leading-relaxed text-gray-600 mb-6">
                    {era.summary}
                  </p>
                </div>

                {/* Stages Pills / الفترات المتضمنة */}
                <div className="border-t border-gray-100 pt-4">
                  <span className="block text-xs font-bold text-red-800 mb-2">الفترات المتضمنة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {era.stages.map((stage) => (
                      <span
                        key={stage}
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-100/80"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 📇 القسم الثاني: بطاقات المحتوى التفاعلي (Interactive Timeline Cards) 📇 */}
      <section id="timeline-cards" className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-stone-100 border-t border-gray-200/60">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-section-head text-center mb-12"
          >
            <span className="inline-block rounded-full bg-red-50 border border-red-200/60 px-4 py-1.5 text-xs sm:text-sm font-bold text-red-800 mb-3">
              📇 ثانياً: المحتوى التفاعلي
            </span>
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 text-red-900 font-bold">
              بطاقات المحتوى التفاعلي 
            </h2>
            <p className="hp-section-copy text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              28 محطة زمنية تفصيلية تستعرض الأحداث الرئيسية، الشخصيات، الأسفار، الأماكن، والشواهد الأثرية الموثقة.
            </p>
          </motion.div>

          {/* Interactive Toolbar matching HistoryPage aesthetic */}
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-3xl bg-white p-4 sm:p-5 shadow-lg border border-gray-100">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTestamentFilter("all")}
                className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeTestamentFilter === "all"
                    ? "bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-md shadow-red-950/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/70"
                }`}
              >
                <span>جميع المحطات</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeTestamentFilter === "all" ? "bg-white/20 text-white" : "bg-gray-200/70 text-gray-700"}`}>28</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTestamentFilter("ot")}
                className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeTestamentFilter === "ot"
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-950/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/70"
                }`}
              >
                <span>📌 بطاقات العهد القديم</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeTestamentFilter === "ot" ? "bg-white/20 text-white" : "bg-gray-200/70 text-gray-700"}`}>20</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTestamentFilter("nt")}
                className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeTestamentFilter === "nt"
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md shadow-red-950/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/70"
                }`}
              >
                <span>✝️ بطاقات العهد الجديد</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeTestamentFilter === "nt" ? "bg-white/20 text-white" : "bg-gray-200/70 text-gray-700"}`}>8</span>
              </button>
            </div>

            {/* Search Input & View Switch */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <Search size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في الأحداث، الشخصيات، الأسفار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 py-2.5 pr-10 pl-8 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* View Switch */}
              <div className="flex rounded-2xl border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  title="عرض الشبكة"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl p-2 transition-colors ${viewMode === "grid" ? "bg-white text-red-800 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <Grid size={17} />
                </button>
                <button
                  type="button"
                  title="عرض الخط الزمني"
                  onClick={() => {
                    setViewMode("timeline");
                    trackTimelineOpen("bible");
                  }}
                  className={`rounded-xl p-2 transition-colors ${viewMode === "timeline" ? "bg-white text-red-800 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <ListFilter size={17} />
                </button>
              </div>
            </div>

          </div>

          {/* Cards counter */}
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-gray-600 px-2 font-medium">
            <span>
              عرض <strong className="text-red-900">{filteredCards.length}</strong> محطة من أصل 28
            </span>
            {searchQuery && (
              <span>
                تصفية حسب: "<strong className="text-red-800">{searchQuery}</strong>"
              </span>
            )}
          </div>

          {/* CARDS DISPLAY */}
          {filteredCards.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-lg">
              <Search size={44} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-800">لا توجد نتائج مطابقة لبحثك</h3>
              <p className="mt-2 text-sm text-gray-500">جرب استخدام كلمات بحث بديلة أو إعادة ضبط التصفية.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveTestamentFilter("all"); }}
                className="mt-5 rounded-full bg-gradient-to-r from-orange-600 to-red-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:scale-105 transition-all"
              >
                إعادة ضبط البحث
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW */
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCards.map((card) => {
                const isOt = card.testament === "ot";
                return (
                  <motion.div
                    key={card.id}
                    variants={staggerItem}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="hp-era-card group rounded-3xl p-6 sm:p-7 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      {/* Top Badges Row */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span 
                            className={`flex h-8 w-8 items-center justify-center rounded-xl font-mono text-xs sm:text-sm font-bold ${
                              isOt 
                                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {card.id}
                          </span>
                          <span 
                            className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                              isOt 
                                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {card.testamentLabel}
                          </span>
                        </div>
                        <span className="text-2xl" title={card.title}>{card.iconType}</span>
                      </div>

                      {/* Title & Era */}
                      <h3 className="text-xl sm:text-2xl font-bold text-red-950 group-hover:text-red-700 transition-colors mb-1">
                        {card.title}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-red-700 mb-4">
                        {card.era}
                      </div>

                      {/* Main Event Box */}
                      <div className="mb-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-200/80 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                        <strong className="block text-red-900 text-xs mb-1.5 font-bold">الحدث الرئيسي:</strong>
                        {card.event}
                      </div>

                      {/* Meta Details Grid */}
                      <div className="space-y-3 text-xs sm:text-sm text-gray-700 border-t border-gray-100 pt-4">
                        <div className="flex items-start gap-2.5">
                          <Users size={16} className="mt-0.5 flex-shrink-0 text-red-700" />
                          <div className="leading-relaxed">
                            <strong className="text-red-900 ml-1">الشخصيات:</strong>
                            <span className="text-gray-700">{card.people}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <BookMarked size={16} className="mt-0.5 flex-shrink-0 text-blue-700" />
                          <div className="leading-relaxed">
                            <strong className="text-blue-900 ml-1">الأسفار:</strong>
                            <span className="text-gray-700">{card.books}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <MapPin size={16} className="mt-0.5 flex-shrink-0 text-emerald-700" />
                          <div className="leading-relaxed">
                            <strong className="text-emerald-900 ml-1">الأماكن:</strong>
                            <span className="text-gray-700">{card.places}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Context & Archaeology */}
                    <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 border border-gray-200/70 text-xs text-gray-600 leading-relaxed">
                      <strong className="text-red-800 font-bold ml-1">الخلفية والآثار:</strong>
                      <span>{card.context}</span>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* TIMELINE VIEW (بنفس تصميم hp-global-timeline في HistoryPage) */
            <div className="hp-global-timeline max-w-4xl mx-auto relative space-y-6">
              <div className="hidden sm:block absolute right-28 top-0 bottom-0 w-px bg-gradient-to-b from-red-900/0 via-red-800/30 to-orange-900/0" />
              {filteredCards.map((card) => {
                const isOt = card.testament === "ot";
                return (
                  <motion.div
                    key={card.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    className="hp-tl-item flex items-start gap-3 sm:gap-4 transition-all"
                  >
                    <div className="flex-shrink-0 w-16 sm:w-24 text-left text-xs sm:text-base font-bold text-red-700 pt-1">
                      #{card.id}
                    </div>

                    <div 
                      className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 mt-2 rounded-full ring-4 ring-white shadow-lg" 
                      style={{ backgroundColor: isOt ? "#3b82f6" : "#ef4444" }} 
                    />

                    <div className="flex-1 rounded-3xl bg-white p-5 sm:p-6 shadow-lg border border-gray-100 text-sm sm:text-base text-gray-700 leading-relaxed">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-red-950">{card.title}</h3>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isOt ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}>
                            {card.testamentLabel}
                          </span>
                        </div>
                        <span className="text-xs text-red-700 font-semibold">{card.era}</span>
                      </div>

                      <p className="font-bold text-gray-900 mb-4">{card.event}</p>

                      <div className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm border-t border-gray-100 pt-3">
                        <div><strong className="text-red-900">الشخصيات:</strong> {card.people}</div>
                        <div><strong className="text-blue-900">الأسفار:</strong> {card.books}</div>
                        <div><strong className="text-emerald-900">الأماكن:</strong> {card.places}</div>
                        <div><strong className="text-red-800">الخلفية والآثار:</strong> {card.context}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 📚 القسم الثالث: الأدلة والقوائم المجمعة لمرجعية الموقع 📚 */}
      <section id="archaeology-reference" className="py-16 sm:py-24 bg-white border-t border-gray-200/60">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-section-head text-center mb-12"
          >
            <span className="inline-block rounded-full bg-red-50 border border-red-200/60 px-4 py-1.5 text-xs sm:text-sm font-bold text-red-800 mb-3">
              📚 ثالثاً: الأدلة والشواهد
            </span>
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 text-red-900 font-bold">
              الأدلة والقوائم المجمعة لمرجعية الموقع
            </h2>
            <p className="hp-section-copy text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              شواهد تاريخية وأثرية موثقة، تسلسل التواريخ المحددة، والرموز النبوية التي تربط العهدين.
            </p>
          </motion.div>

          {/* Reference Sub-Navigation Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex flex-wrap rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-1.5 border border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveReferenceTab("dates")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeReferenceTab === "dates"
                    ? "bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-md shadow-red-950/20"
                    : "text-gray-700 hover:text-red-900 hover:bg-white/50"
                }`}
              >
                <Calendar size={16} />
                <span>1. التسلسل الزمني للتواريخ المحددة</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveReferenceTab("archaeology")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeReferenceTab === "archaeology"
                    ? "bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-md shadow-red-950/20"
                    : "text-gray-700 hover:text-red-900 hover:bg-white/50"
                }`}
              >
                <Scroll size={16} />
                <span>2. سجل الاكتشافات والشواهد الأثرية</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveReferenceTab("typology")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeReferenceTab === "typology"
                    ? "bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-md shadow-red-950/20"
                    : "text-gray-700 hover:text-red-900 hover:bg-white/50"
                }`}
              >
                <Sparkles size={16} />
                <span>3. رموز وتطابق العهدين</span>
              </button>
            </div>
          </div>

          {/* TAB 1: التسلسل الزمني للتواريخ المحددة أثرياً وتاريخياً */}
          {activeReferenceTab === "dates" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gray-200/80 bg-gradient-to-br from-slate-50 to-stone-100 p-6 sm:p-10 shadow-xl"
            >
              <div className="mb-8 border-b border-gray-200 pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-red-900 flex items-center gap-3">
                    <Calendar className="text-red-700" />
                    <span>التسلسل الزمني للتواريخ المحددة أثرياً وتاريخياً</span>
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                    مرتبة ترتيباً زمنياً تصاعدياً دقيقاً من أقدم تاريخ موثق بالشرق القديم (القرن 18 ق.م) وصولاً لخراب الهيكل الثاني (70 م).
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-200 px-4 py-2 text-xs font-bold text-red-800 shadow-sm flex items-center gap-2">
                  <Clock size={16} className="text-red-600" />
                  <span>14 محطة زمنية مرتبة تسلسلياً (من الأقدم إلى الأحدث)</span>
                </div>
              </div>

              {/* Vertical Chronological Timeline (مطابق لتسلسل الخط الزمني في صفحة History) */}
              <div className="hp-global-timeline max-w-4xl mx-auto relative space-y-5">
                <div className="hidden sm:block absolute right-32 top-0 bottom-0 w-px bg-gradient-to-b from-red-900/0 via-red-800/30 to-orange-900/0" />
                
                {chronologicalMilestones.map((item) => (
                  <motion.div 
                    key={item.step}
                    whileHover={{ x: -4 }}
                    className="hp-tl-item flex items-start gap-3 sm:gap-5 transition-all"
                  >
                    {/* Step & Date column on the right */}
                    <div className="flex-shrink-0 w-24 sm:w-28 text-left pt-1">
                      <span className="block text-[11px] font-bold text-gray-500 font-mono">
                        المحطة {item.step < 10 ? `0${item.step}` : item.step}
                      </span>
                      <span className="block font-mono text-xs sm:text-sm font-extrabold text-red-800 mt-0.5">
                        {item.era}
                      </span>
                    </div>

                    {/* Timeline Node Dot */}
                    <div 
                      className="flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 mt-2 rounded-full ring-4 ring-white shadow-lg" 
                      style={{ backgroundColor: item.color }} 
                    />

                    {/* Content Card */}
                    <div className="flex-1 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-red-900 bg-red-50 border border-red-200/70 px-2.5 py-0.5 rounded-lg">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                          {item.periodType === "ق.م" ? "قبل الميلاد" : item.periodType === "م" ? "ميلادية" : "عصر انتقالي"}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-medium">
                        {item.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: سجل الاكتشافات والشواهد الأثرية الموثقة */}
          {activeReferenceTab === "archaeology" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gray-200/80 bg-gradient-to-br from-slate-50 to-stone-100 p-6 sm:p-10 shadow-xl"
            >
              <div className="mb-8 border-b border-gray-200 pb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-red-900 flex items-center gap-3">
                  <Scroll className="text-red-700" />
                  <span>سجل الاكتشافات والشواهد الأثرية الموثقة</span>
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  أبرز الحفريات والنقوش المكتشفة التي تطابق نص العهدين وتؤكد دقتهما التاريخية.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {archaeologicalDiscoveries.map((discovery, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${discovery.color} shadow-md text-2xl`}>
                        {discovery.icon}
                      </div>
                      <span className="rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-bold text-red-800">
                        {discovery.tag}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-red-950 mb-3">
                      {discovery.title}
                    </h4>

                    <p className="text-sm sm:text-base font-medium text-gray-700 mb-4 leading-relaxed">
                      {discovery.description}
                    </p>

                    <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-200 text-xs sm:text-sm leading-relaxed text-gray-600">
                      <strong className="block text-red-900 font-bold mb-1">الأهمية والدلالة العلمية:</strong>
                      {discovery.significance}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: رموز العهد القديم وتطابق العهد الجديد */}
          {activeReferenceTab === "typology" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gray-200/80 bg-gradient-to-br from-slate-50 to-stone-100 p-6 sm:p-10 shadow-xl"
            >
              <div className="mb-8 border-b border-gray-200 pb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-red-900 flex items-center gap-3">
                  <Sparkles className="text-red-700" />
                  <span>رموز العهد القديم وتطابق العهد الجديد</span>
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  كيف تنبأ العهد القديم بالرموز والظلال، وكيف أعلن العهد الجديد اكتمالها الفعلي في شخص يسوع المسيح.
                </p>
              </div>

              <div className="space-y-6">
                {typologicalSymbols.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-gray-100 pb-3">
                      <h4 className="text-xl sm:text-2xl font-bold text-red-950 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-red-700" />
                        <span>{item.symbol}</span>
                      </h4>
                      <span className="rounded-full bg-red-50 text-red-800 border border-red-200 px-3.5 py-1 text-xs font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-blue-200/70 bg-blue-50/60 p-4 sm:p-5">
                        <span className="inline-block text-xs font-bold text-blue-800 mb-2">📌 رمز وظل العهد القديم</span>
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-medium">
                          {item.otContext}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-red-200/70 bg-red-50/60 p-4 sm:p-5">
                        <span className="inline-block text-xs font-bold text-red-800 mb-2">✝️ التحقيق والاكتمال في العهد الجديد</span>
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-medium">
                          {item.ntFulfillment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* FOOTER CALLOUT / SCRIPTURE QUOTE (مطابق لأسلوب صفحة History) */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-stone-950 via-orange-950 to-amber-900 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Scroll size={48} className="mx-auto mb-4 text-yellow-300" />
          <div className="text-6xl sm:text-8xl text-yellow-400/80 mb-2 leading-none">"</div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-100 leading-relaxed mb-6">
            كُلُّ الْكِتَابِ هُوَ مُوحىً بِهِ مِنَ اللهِ، وَنَافِعٌ لِلتَّعْلِيمِ وَالتَّوْبِيخِ، لِلتَّقْوِيمِ وَالتَّأْدِيبِ الَّذِي فِي الْبِرِّ
          </blockquote>
          <div className="w-16 sm:w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl font-bold text-yellow-300">
            — 2 تيموثاوس 3: 16
          </p>
        </div>
      </section>

    </PageWrapper>
  );
}
