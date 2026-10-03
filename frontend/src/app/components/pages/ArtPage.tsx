
import {
  BookOpen, Palette, Landmark, Church, Music, Users, Star, Scroll,
  Info, ChevronLeft, Quote
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { heroFadeScale, fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

// ─── Section 1: المقدمة وأبعاد الهوية القبطية ───────────────────────────────

export const introSection = [
  {
    id: "art-intro-1",
    title: "الأصالة والاستمرارية",
    icon: <Landmark size={32} className="text-red-700" />,
    points: [
      "تمثل الهوية القبطية شريانًا حضاريًا وفكريًا متصلًا يعبر العصور.",
      "نبتت من أصول مصرية قديمة فرعونية، واغتذت بالثقافة اليونانية والرومانية.",
      "اكتملت بالصياغة الإيمانية المسيحية والنسيج العربي.",
      "لم تكن هذه الهوية مجرد انغلاق على الذات، بل كانت فنًّا وثقافة عابرة للعصور تعبر عن وجدان الشعب وتصون عقيدته."
    ],
  },
  {
    id: "art-intro-2",
    title: "الجذور اللغوية والحضارية",
    icon: <BookOpen size={32} className="text-red-700" />,
    points: [
      "مفردة 'قبطي' في أصلها اللغوي والتاريخي تشير إلى 'المصري'.",
      "مشتقة من اليونانية Aigyptos وعن الهيروغليفية ها-كا-بتاح (Hwt-ka-Ptah).",
      "تعبر عن التراكم الحضاري الذي صهر العمارة، والأيقونة، واللحن، واللغة.",
      "صهرت الموروث الشفهي في قالب إيماني ووجداني واحد."
    ],
  },
  {
    id: "art-intro-3",
    title: "المحاور الخمسة للهوية القبطية",
    icon: <Star size={32} className="text-red-700" />,
    points: [
      "1. اللغة القبطية: تطور الخط، الترجمات الإنجيلية، وحفظ المصطلحات اللاهوتية.",
      "2. الآثار القبطية: الأديرة الأثرية (سقارة، سوهاج، سيناء، بيت شان)، والحنيات المعمارية.",
      "3. الفنون القبطية: فن المعمار، الأيقونة اللاهوتية (العذراء المرضعة)، والرموز والموسيقى.",
      "4. تاريخ الكنيسة وقوانينها: المجامع المسكونية، صيغة ميافزيت، والتشريعات والطقوس.",
      "5. العادات والتقاليد: احتفاليات الميمر، الوشم التراثي، والتقويم ومناسبات الحياة."
    ],
  },
];

// ─── Section 2: المحور الأول: اللغة القبطية ───────────────────────────────────

export const langSection = [
  {
    id: "art-lang-1",
    title: "نشأة الخط القبطي والتركيب الأبجدي",
    desc: "نبتت فكرة تدوين اللغة المصرية القديمة باستخدام الحروف اليونانية (24 حرفًا) مع إضافة 7 حروف ديموطيقية مستعارة من الخط الديموطيقي المتصل عن الهيراطيقية، للتعبير عن أصوات مصرية أصيلة لم تجد لها مكافئًا في اللغة اليونانية.",
    icon: <Scroll size={24} className="text-yellow-600" />,
  },
  {
    id: "art-lang-2",
    title: "الترجمة الإنجيلية الأولى",
    desc: "في القرن الثاني الميلادي، قام العلامة بانتينوس بمدارس الإسكندرية بمساعدة تلاميذه (وعلى رأسهم القديس إكليمنضس السكندري) بترجمة نصوص الكتاب المقدس إلى اللغة القبطية بمختلف اللهجات (الصعيدية، البحيرية، والفيومية).",
    icon: <BookOpen size={24} className="text-yellow-600" />,
  },
  {
    id: "art-lang-3",
    title: "حفظ المصطلحات اللاهوتية اليونانية",
    desc: "حرص المترجمون والآباء الأقباط على عدم ترجمة المصطلحات اللاهوتية اليونانية الدقيقة (مثل Ousia، Hypostasis، Prosopon، Homooúsios) بل استبقوها بلفظها اليوناني الأصلي مكتوبة بالحروف القبطية داخل النص لحفظ الدقة العقائدية واللاهوتية ومنع أي تحريف.",
    icon: <Info size={24} className="text-yellow-600" />,
  },
  {
    id: "art-lang-4",
    title: "لغة الشعب والبرية والوعظ الشفهي",
    desc: "في العصور الأولى كانت اليونانية لغة المجامع والسياسة، بينما كانت القبطية لغة الشعب والقرى والوعظ الإيماني. وتذكر المصادر أن الأنبا أنطونيوس الكبير (أبو الرهبان) كان يتحدث مع زائريه وتلاميذه باللغة القبطية الشفهية فقط.",
    icon: <Users size={24} className="text-yellow-600" />,
  },
  {
    id: "art-lang-5",
    title: "المخطوطات ثنائية اللغة (نهرين)",
    desc: "بدءًا من القرن الثاني عشر الميلادي، ظهرت المخطوطات ثنائية اللغة في شريطين متوازيين (نهر قبطي ونهر عربي) على نفس الصفحة لضمان استمرار فهم الصلوات والقراءات الكنسية بعد سيادة اللغة العربية.",
    icon: <Scroll size={24} className="text-yellow-600" />,
  },
  {
    id: "art-lang-6",
    title: "فك رموز الهيروغليفية بقواميس 'السُّلَّم'",
    desc: "اعتمد العلماء (بيترو ديلا فالي، وأثناسيوس كيرشر) على قواميس السلم القبطية-العربية، وهي التي مكنت العالم الفرنسي جان فرانسوا شامبليون في 27 سبتمبر 1822م من التعرف على القيم الصوتية للغة المصرية القديمة وفك رموز حجر رشيد والهيروغليفية.",
    icon: <Landmark size={24} className="text-yellow-600" />,
  },
];

// ─── Section 3: المحور الثاني: الآثار القبطية ──────────────────────────────────

export const antiquitiesSection = [
  {
    id: "art-ant-1",
    title: "دير أنبا إرميا بسقارة (القرن السادس م)",
    icon: "🏛️",
    points: [
      "يقع في منطقة سقارة الأثرية، ويعد موقعًا فريدًا يرجع للقرن السادس الميلادي.",
      "يضم محاريب وحنيات جدارية مزخرفة برسومات السيدة العذراء المرضعة والقديسين.",
      "كشفت الحفريات عن تماثيل وأعمدة عاجية وحجرية محفورة بمهارة فائقة.",
    ],
  },
  {
    id: "art-ant-2",
    title: "الدير الأحمر بسوهاج (القرن 6-8 م)",
    icon: "⛪",
    points: [
      "يقع غرب سوهاج، ويتميز بعمارته الفريدة الشبيهة بالمعابد المصرية القديمة.",
      "يضم في نصف القبة الشمالية جدارية أثرية نادرة (اكتشفت عام 1996م).",
      "تصوّر السيدة العذراء ترضع الطفل يسوع وهي تجلس على مقعد أرابيسك مطعم.",
    ],
  },
  {
    id: "art-ant-3",
    title: "دير سانت كاترين بسيناء",
    icon: "⛰️",
    points: [
      "يقع في قلب جنوب سيناء، ويضم كنيسة العليقة المقدسة (هيلانة 336م وجوستنيان القرن 6م).",
      "يحتوي الدير على أمبون خشب معشق بالصدف، وبلاطات القاشاني الدمشقي.",
      "وثق التراث المعماري الممتد وربط سيناء بجغرافية العهدين القديم والجديد.",
    ],
  },
  {
    id: "art-ant-4",
    title: "دير السيدة مريم ببيت شان (567 م)",
    icon: "✝️",
    points: [
      "يضم أرضيات فسيفسائية هندسية أثرية وغرفًا سكنية للنساك.",
      "يحتوي على أحواض معمودية مغطاة بالجص عليها رسومات صلبان حمراء.",
      "توثيق للمعموديات وممارسة طقس المعمودية بالتغطيس الكامل منذ القرون الأولى.",
    ],
  },
];

// ─── Section 4: المحور الثالث: الفنون القبطية ──────────────────────────────────

export const artsSection = [
  {
    id: "art-arts-1",
    title: "فن المعمار القبطي والزخرفة",
    points: [
      "السيمترية والتمركز: اعتمد الفنان القبطي على التوازن البصري وتحديد الأشكال بخطوط داكنة لإبراز معالم الرسم.",
      "ملء الفراغ: شغل الفراغات التشكيلية بالوريدات، والأقراص المستديرة، والأعشاب، والأفرع النباتية، والطيور المتناثرة للتعبير عن التصالح والسلام.",
    ],
    icon: <Palette size={32} className="text-red-700" />,
  },
  {
    id: "art-arts-2",
    title: "فن الأيقونة وأيقونة 'العذراء المرضعة'",
    points: [
      "الأيقونة كتعليم لاهوتي: إعلان عقيدي يثبت حقيقة تجسد السيد المسيح ويرد على البدع.",
      "أيقونة 'العذراء المرضعة': نمط قبطي أصيل ظهر بكثرة من القرن 5 إلى 12م لتأكيد كمال ناسوت المسيح وأنه جاع ورضع كبشر كامل رداً على الأوطاخية.",
    ],
    icon: <Star size={32} className="text-red-700" />,
  },
  {
    id: "art-arts-3",
    title: "الرموز اللاهوتية القبطية",
    points: [
      "العنخ والمثلث: تحول مفتاح الحياة الفرعوني (Ankh) إلى رمز للصلب وحياة الخلود، مع المثلث كرمز للثالوث القدوس.",
      "النسر والسمكة: يرمز النسر للقيامة والتسامي، بينما تشير السمكة (ΙΧΘΥΣ) لشعار الإيمان (يسوع المسيح ابن الله المخلص).",
    ],
    icon: <Church size={32} className="text-red-700" />,
  },
  {
    id: "art-arts-4",
    title: "فن الموسيقى القبطية والألحان",
    points: [
      "تعتمد على الروحانية الهادئة والتكرار النغمي الجذاب الذي يرفع الذهن والمشاعر.",
      "حدد الآباء (مثل إكليمنضس السكندري) استخدام أدوات إيقاعية بسيطة كـ'الدف والتريانتو' للضبط الطقسي مع رفض الآلات الصاخبة.",
      "فولكلور غنائي شفاهي زاخر في المناسبات والموالد.",
    ],
    icon: <Music size={32} className="text-red-700" />,
  },
  {
    id: "art-arts-5",
    title: "فن الشعر والقصص الأدبي والباترولوجي",
    points: [
      "استخدام الأوزان والبحور الشعرية في صياغة المدائح والترانيم وسير الشهداء الملحمية (مار جرجس، دميانة).",
      "علم الباترولوجي: مؤلفات آباء الإسكندرية الكبار (أثناسيوس، كيرلس، ديسقوروس) وأقوال شيوخ البرية في 'فردوس الآباء'.",
    ],
    icon: <BookOpen size={32} className="text-red-700" />,
  },
];

// ─── Section 5: المحور الرابع: تاريخ الكنيسة وقوانينها ────────────────────────

export const churchHistorySection = [
  {
    id: "art-ch-1",
    text: "شهدت مجامع نيقية (325م)، والقسطنطينية (381م)، وأفسس (431م) دورًا قياديًا لباباوات الإسكندرية في صياغة قانون الإيمان وتثبيت عقيدة تجسد الكلمة.",
    ref: "المجامع المسكونية الأولى",
  },
  {
    id: "art-ch-2",
    text: "صيغة ميافزيت (Miaphysite): التمسك بعبارة القديس كيرلس الكبير: 'طبيعة واحدة متجسدة لله الكلمة' والدفاع عنها أمام البدع النسطورية والأوطاخية.",
    ref: "الصيغة العقائدية",
  },
  {
    id: "art-ch-3",
    text: "كتاب الديداكية (تعليم الرسل): دليل سلوكي وليتورجي جمع في نهاية القرن 1 / بداية القرن 2م، ينص على المعمودية بالتغطيس، وصوم المعمد، والصلوات الإفخارستية.",
    ref: "الديداكية (تعليم الرسل)",
  },
  {
    id: "art-ch-4",
    text: "الدسقولية والتقليد الرسولي: تشريعات تنظم الرتب الكهنوتية (أساقفة، قسوس، شمامسة)، والمسؤوليات الإدارية، والواجبات الاجتماعية والطقسية للمؤمنين.",
    ref: "الدسقولية والتقليد الرسولي",
  },
  {
    id: "art-ch-5",
    text: "التقليد الرسولي لهيبوليتس (القرن 3م): يضم صلوات الرسامة الكنسية وطقوس المعمودية وترتيب قداس الإفخارستيا وصوم الاستعداد المقدس.",
    ref: "التقليد الرسولي",
  },
  {
    id: "art-ch-6",
    text: "تثبت الكشوف الأثرية في البراري المصرية أن معمار الأديرة القبطية كان يصمم ليوفر الاكتفاء الذاتي والتأمل الروحي، محتويًا على معاصر ومكتبات وصوامع للغلال.",
    ref: "الحياة الرهبانية والتنظيم",
  },
];

// ─── Section 6: المحور الخامس: العادات والتقاليد ─────────────────────────────

export const customsSection = [
  {
    id: "art-cust-1",
    title: "احتفالية الميمر والسامر الشعبي",
    points: [
      "احتفال شعبي وديني يقام عقب مواسم الحصاد في الصعيد.",
      "يجتمع أهل القرية حول شاعر الربابة أو الناقوس، وتقديم عشاء القرية والذبائح.",
      "إيقاد الشموع والتبرك بالماء والخبز في طقوس البركة الاجتماعية المتوارثة.",
    ],
    icon: "🌾",
  },
  {
    id: "art-cust-2",
    title: "فن الوشم القبطي (التاتو الشعبي)",
    points: [
      "دق وشم الصليب على معصم اليد لإثبات الهوية الدينية والانتماء.",
      "دق نقطة وشم للأطفال على الجبهة أو الأنف كعادة شعبية مأثورة للوقاية والعافية.",
      "استلهام الزخارف والرسومات من النقوش الخشبية والجبسية الكنسية.",
    ],
    icon: "✝️",
  },
  {
    id: "art-cust-3",
    title: "التقويم القبطي ومناسبات الحياة",
    points: [
      "استمرار استخدام أسماء الشهور الزراعية القبطية (مثل شهر أبيب لزمن الحصاد).",
      "طقوس دورة الحياة من السبوع، واختيار الاسم، وإيفاء النذور في الموالد الكنسية.",
      "ارتباط التقويم بتخليد ذكرى الشهداء بدءًا من اعتلاء دقلديانوس العرش عام 284م.",
    ],
    icon: "📅",
  },
];


// ─── Backward-Compatible Exports for SearchIndex ──────────────────────────────

export const artForms = [
  {
    id: "art-icons",
    title: "الأيقونات القبطية",
    description: "فن الأيقونة القبطية إنجيل معاش يعبّر عن العقيدة الصحيحة بسبع خصائص فنية وعقائدية رئيسية: التناظر، التمركز، المواجهة الروحية، ملء الفراغ، البساطة، النسب الروحية، والإطار المتماسك.",
    features: ["التناظر والتماثل الروحي", "الوجوه ذات العيون الواسعة", "البساطة وانسدال الملابس", "النسب الروحية للجسم المقدس"],
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "art-architecture",
    title: "العمارة القبطية",
    description: "يتميز فن المعمار القبطي بأصالة مذهلة نبعت من رحم الفن الشعبي البسيط، يدمج التأثيرات المعمارية الفرعونية واليونانية والرومانية والبيزنطية مع الاحتفاظ الكامل بالأصالة القومية.",
    features: ["الأقبية والقباب الطوبية والحجرية", "الطراز البازيليكي والمصلب", "الحنيات الحجرية (الشرقيات)", "الزخارف الجصية والبيزنطية"],
    color: "from-blue-500 to-blue-700",
  },
];

export const symbolism = [
  { id: "art-sym-1", symbol: "☩", name: "العنخ والصليب والمثلث", meaning: "اتحاد رمز الحياة الفرعوني بالصليب المسيحي مع المثلث رمز الثالوث القدوس" },
  { id: "art-sym-2", symbol: "🦅", name: "النسر", meaning: "رمز التجديد الروحي والنهوض من الموت والخطية" },
  { id: "art-sym-3", symbol: "🦁", name: "الأسد", meaning: "رمز القوة الإلهية والقيامة المجيدة — المسيح أسد سبط يهوذا" },
  { id: "art-sym-4", symbol: "🐟", name: "السمكة ICHTHYS", meaning: "الرمز الأقدم للإيمان المسيحي — يسوع المسيح ابن الله المخلص" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function ArtPage() {
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!fullscreenImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreenImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImage]);

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">

      {/* Hero Section */}
      <section className="relative isolate flex min-h-[55vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[88vh] items-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-orange-900 py-16 sm:py-24 md:py-32 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/art-hero-bg.jpg')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-red-950/60 via-red-950/40 to-orange-950/70" />
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg">الهوية القبطية</h1>
            <motion.p
              variants={heroFadeScale}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-4xl text-xl text-yellow-200 sm:text-2xl md:text-3xl drop-shadow-md"
            >
              حضارةٌ عابرة للعصور… وإيمانٌ وتراثٌ متجذرٌ في وجدان مصر
            </motion.p>
          </div>
        </div>
      </section>

      {/* Introduction Card */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mx-auto max-w-5xl rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-2xl sm:p-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-red-900 sm:text-3xl">
              <Info size={28} />
              المقدمة: مفهوم الهوية القبطية وأبعادها الحضارية
            </h2>
            <div className="text-right text-lg leading-relaxed text-gray-700 sm:text-xl">
              <p className="mb-4">
                تمثل الهوية القبطية شريانًا حضاريًا وفكريًا متصلًا يعبر العصور، نبت من أصول مصرية قديمة فرعونية، واغتذى بالثقافة اليونانية والرومانية، واكتمل بالصياغة الإيمانية المسيحية والنسيج العربي. لم تكن هذه الهوية مجرد انغلاق على الذات، بل كانت فنًّا وثقافة عابرة للعصور تعبر عن وجدان الشعب المصري وتصون عقيدته وصلواته وطقوسه.
              </p>
              <p>
                تظهر المصادر التاريخية أن الهوية القبطية استطاعت الاستمرار والازدهار عبر القرون بفضل مرونتها الثقافية؛ حيث استوعبت عناصر الفن والمعمار المصري القديم وصاغتها في خدمة الإيمان المسيحي والعبادة الكنسية.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: محاور الهوية القبطية */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">المحاور الخمسة للهوية القبطية</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {introSection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-red-900">{item.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-700 text-lg">
                          <ChevronLeft className="flex-shrink-0 text-yellow-500 mt-1" size={20} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative w-full">
                <button type="button" aria-label="تكبير صورة مخطوطة نجع حمادي" onClick={() => setFullscreenImage({ src: "/image/art-papyrus-nag-hammadi.jpg", alt: "مخطوطة نجع حمادي القبطية الأثرية" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/art-papyrus-nag-hammadi.jpg" alt="مخطوطة نجع حمادي القبطية الأثرية" className="w-full h-auto object-cover bg-red-100" onError={(e) => e.currentTarget.src = "/image/download.jpg"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: المحور الأول: اللغة القبطية */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">المحور الأول: اللغة القبطية (خلفية ثقافية)</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">تعتبر اللغة القبطية السجل التوثيقي الأصيل الذي حفظ وجدان المصريين ونصوصهم الإيمانية</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 gap-6">
                {langSection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="bg-white rounded-2xl p-6 shadow-md border-b-4 border-red-700 hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-red-50 p-2 rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-red-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative w-full">
                <button type="button" aria-label="تكبير صورة اللوحة الجدارية القبطية الأثرية" onClick={() => setFullscreenImage({ src: "/image/art-fresco-mural.jpg", alt: "لوحة جدارية قبطية أثرية" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/art-fresco-mural.jpg" alt="لوحة جدارية قبطية أثرية" className="w-full h-auto object-cover bg-red-100" onError={(e) => e.currentTarget.src = "/image/download (1).jpg"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: المحور الثاني: الآثار القبطية */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">المحور الثاني: الآثار القبطية (خلفية ثقافية جغرافية)</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">شواهد جغرافية ومكانية حية توثق حركة الرهبنة الأولى، وتنظم العبادة الليتورجية، وتكشف طبيعة البناء المعماري المميز لمصر</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 gap-6">
                {antiquitiesSection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="flex gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors">
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl h-fit text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.points.map((pt, idx) => (
                          <li key={idx} className="flex gap-2 text-gray-700 text-lg">
                            <ChevronLeft className="flex-shrink-0 text-yellow-500 mt-1" size={18} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-200 relative w-full">
                <button type="button" aria-label="تكبير صورة الفريسكو القبطي لحنية الهيكل" onClick={() => setFullscreenImage({ src: "/image/art-apse-fresco.jpg", alt: "فريسكو قبطي أثري لحنية الهيكل" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/art-apse-fresco.jpg" alt="فريسكو قبطي أثري لحنية الهيكل" className="w-full h-auto object-cover bg-stone-100" onError={(e) => e.currentTarget.src = "/image/download (2).jpg"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: المحور الثالث: الفنون القبطية */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">المحور الثالث: الفنون القبطية (خلفية ثقافية)</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">الفن الشعبي والتعليم البصري: فن شعبي أصيل خرج من رحم الشعب والفقراء ليكون 'تعليمًا مرسومًا' ينقل حقائق الإيمان إلى القلوب والعيون</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artsSection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-red-900">{item.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-700">
                          <ChevronLeft className="flex-shrink-0 text-yellow-500 mt-1" size={18} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              {/* Two Icons Side-by-Side */}
              <div className="grid sm:grid-cols-2 gap-6 w-full">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative w-full">
                  <button type="button" aria-label="تكبير صورة أيقونة السيدة العذراء والطفل يسوع" onClick={() => setFullscreenImage({ src: "/image/art-icon-virgin-mary.jpg", alt: "أيقونة السيدة العذراء مريم والطفل يسوع والملائكة" })} className="block w-full cursor-zoom-in text-right">
                    <img src="/image/art-icon-virgin-mary.jpg" alt="أيقونة السيدة العذراء مريم والطفل يسوع والملائكة" className="w-full h-auto object-cover bg-red-100" onError={(e) => e.currentTarget.src = "/image/download (3).jpg"} />
                  </button>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative w-full">
                  <button type="button" aria-label="تكبير صورة أيقونة العذراء والقديسين" onClick={() => setFullscreenImage({ src: "/image/art-icon-saints.jpg", alt: "أيقونة قبطية أثرية للسيدة العذراء ومجمع القديسين" })} className="block w-full cursor-zoom-in text-right">
                    <img src="/image/art-icon-saints.jpg" alt="أيقونة قبطية أثرية للسيدة العذراء ومجمع القديسين" className="w-full h-auto object-cover bg-red-100" onError={(e) => e.currentTarget.src = "/image/download (4).jpg"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: المحور الرابع: تاريخ الكنيسة وقوانينها */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">المحور الرابع: تاريخ الكنيسة وقوانينها (خلفية تاريخية)</h2>
              <p className="text-xl text-orange-100 mt-4 max-w-3xl mx-auto">حراسة الإيمان والنظام الكنسي: تاريخ الاستماتة في حفظ الإيمان الرسولي، وصياغة التشريعات والانضباط الطقسي والسلوكي</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {churchHistorySection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors relative">
                    <Quote className="absolute top-4 left-4 text-white/10" size={48} />
                    <p className="text-lg leading-relaxed mb-4 relative z-10 font-medium">{item.text}</p>
                    <div className="text-yellow-400 font-bold text-right relative z-10">
                      {item.ref}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Artifact Image */}
              <div className="max-w-2xl mx-auto w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-300/30 relative">
                <button type="button" aria-label="تكبير صورة مشط العاج الأثري" onClick={() => setFullscreenImage({ src: "/image/art-ivory-comb.jpg", alt: "مشط العاج القبطي الأثري المحفور بقصة قيامة لعازر" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/art-ivory-comb.jpg" alt="مشط العاج القبطي الأثري المحفور بقصة قيامة لعازر" className="w-full max-h-[480px] object-cover bg-red-900" onError={(e) => e.currentTarget.src = "/image/download (6).jpg"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: المحور الخامس: العادات والتقاليد القبطية */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">المحور الخامس: العادات والتقاليد القبطية (خلفية حضارية)</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">الموروث الشعبي والوجدان: تمثل الامتداد الوجداني والشعبي للحضارة المصرية حيث امتزج التدين بالدورة اليومية والاجتماعية للحياة</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customsSection.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="flex gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors">
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl h-fit text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.points.map((pt, idx) => (
                          <li key={idx} className="flex gap-2 text-gray-700">
                            <ChevronLeft className="flex-shrink-0 text-yellow-500 mt-1" size={18} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="max-w-2xl mx-auto w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative">
                <button type="button" aria-label="تكبير صورة كتاب المزامير القبطي الأثري" onClick={() => setFullscreenImage({ src: "/image/art-psalms-manuscript.jpg", alt: "كتاب المزامير القبطي الأثري (الإبصلمودية)" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/art-psalms-manuscript.jpg" alt="كتاب المزامير القبطي الأثري (الإبصلمودية)" className="w-full max-h-[500px] object-cover bg-red-100" onError={(e) => e.currentTarget.src = "/image/download.jpg"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="عرض الصورة بملء الشاشة"
          >
            <button type="button" aria-label="إغلاق الصورة" onClick={() => setFullscreenImage(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl text-white transition-colors hover:bg-white/30">
              ×
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className="max-h-full max-w-full cursor-zoom-out object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
