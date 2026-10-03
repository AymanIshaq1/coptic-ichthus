import {
  BookOpen, Users, Crown, Wand2, HeartPulse, Clock, Globe,
  Search, ShieldCheck, Scale, CloudLightning,
  Zap, Ghost, ScrollText, Quote, Info, ChevronLeft,
  Brain, Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { AnimatePresence, motion } from "motion/react";
import { heroFadeScale, fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { trackSectionView } from "@/lib/analytics";

export const section1 = [
  {
    id: "teach-s1-logos",
    title: "1. اللوجوس (الكلمة)",
    points: [
      "دُعي السيد المسيح بـ \"الكلمة\" في مواضع هامة لتأكيد لاهوته.",
      "كلمة \"اللوجوس\" اليونانية لا تعني مجرد لفظة، بل تعني \"عقل الله الناطق\" أو \"نطق الله العاقل\".",
      "عقل الله لا ينفصل عن الله، وإذا كان المسيح هو عقل الله، فهو إذن أزلي وغير مخلوق.",
      "الأقنوم الثاني (اللوجوس) هو أقنوم المعرفة والعقل في الثالوث القدوس."
    ],
    icon: <Brain size={32} className="text-red-700" />
  },
  {
    id: "teach-s1-son",
    title: "2. بنوة المسيح للآب",
    points: [
      "البشر جميعاً دُعوا أبناء الله بالإيمان أو المحبة أو التبني، ومع ذلك يظلون مخلوقات وعبيداً لله.",
      "بنوة المسيح للآب تختلف كلياً، فهي بنوة من جوهر الله وطبيعته.",
      "شهد الآب لهذه البنوة الفريدة بمعجزات عظيمة في يوم العماد (الثيئوفانيا) وفي يوم التجلي.",
      "اعتراف الناس بأن المسيح \"ابن الله\" كان يرتبط دائماً بقوة معجزية خارقة، كما حدث عند مشيه على الماء أو تفتيح عيني المولود أعمى."
    ],
    icon: <Users size={32} className="text-red-700" />
  },
  {
    id: "teach-s1-right",
    title: "3. الجلوس عن يمين الآب",
    points: [
      "الآب غير محدود وليس له يمين أو شمال مكاني.",
      "كلمة \"اليمين\" ترمز إلى القوة والبر والعظمة.",
      "عبارة الجلوس عن يمين الآب تعني أن مرحلة إخلاء الذات للمسيح قد انتهت، ودخل الابن في مجده وقوته."
    ],
    icon: <Crown size={32} className="text-red-700" />
  }
];

// Data for Section 2
export const section2 = [
  { id: "teach-s2-creator", title: "الخالق", desc: "المسيح خلق مواد لم تكن موجودة كما في معجزة إشباع الجموع من خمس خبزات، وتحويل الماء خمراً، وخلق عينين للمولود أعمى من الطين.", icon: <Wand2 size={24} className="text-yellow-600" /> },
  { id: "teach-s2-life", title: "معطي الحياة", desc: "أقام الموتى بمجرد الأمر، مثل إقامة ابنة يايرس، وابن أرملة نايين، ولعازر بعد موته بأربعة أيام.", icon: <HeartPulse size={24} className="text-yellow-600" /> },
  { id: "teach-s2-eternal", title: "فوق الزمان (الأزلي)", desc: "أعلن المسيح وجوده قبل إبراهيم، وهو أصل داود، ومخارجه منذ أيام الأزل قبل كون العالم.", icon: <Clock size={24} className="text-yellow-600" /> },
  { id: "teach-s2-omnipresent", title: "الوجود في كل مكان", desc: "وعد المؤمنين بأنه يكون في وسطهم حيثما اجتمعوا باسمه، وهو موجود في السماء وعلى الأرض وفي الفردوس في نفس الوقت.", icon: <Globe size={24} className="text-yellow-600" /> },
  { id: "teach-s2-searcher", title: "فاحص القلوب", desc: "كان المسيح يعلم أفكار الكتبة والفريسيين وتلاميذه، ويجيب على تساؤلاتهم الداخلية قبل أن ينطقوا بها.", icon: <Search size={24} className="text-yellow-600" /> },
  { id: "teach-s2-forgiver", title: "غافر الخطايا", desc: "مارس المسيح سلطانه في غفران الخطايا، فغفر للمفلوج وللمرأة الخاطئة وللص اليمين، والمغفرة هي حق أصيل لله وحده.", icon: <ShieldCheck size={24} className="text-yellow-600" /> },
  { id: "teach-s2-judge", title: "الديان", desc: "سيجلس المسيح على كرسي مجده في اليوم الأخير ليدين الأحياء والأموات ويجازي كل واحد بحسب عمله.", icon: <Scale size={24} className="text-yellow-600" /> }
];

// Data for Section 3
export const section3 = [
  { id: "teach-s3-nature", title: "سلطانه على الطبيعة", desc: "كان المسيح يأمر الرياح والبحر فتسكت وتطيعه.", icon: <CloudLightning size={24} /> },
  { id: "teach-s3-physics", title: "سلطانه على القوانين الفيزيائية", desc: "مشى المسيح على الماء وجعل بطرس يمشي معه بقوته الإلهية.", icon: <Zap size={24} /> },
  { id: "teach-s3-angels", title: "سلطانه على الملائكة", desc: "الملائكة كانت تخدم المسيح، وهو الذي يرسلهم في الدينونة لجمع المختارين.", icon: <Star size={24} /> },
  { id: "teach-s3-demons", title: "سلطانه على الشياطين", desc: "كانت الشياطين تصرخ مرعوبة منه، وتخرج من المرضى بمجرد أمره أو انتهاره لها.", icon: <Ghost size={24} /> },
  { id: "teach-s3-law", title: "سلطانه على الشريعة", desc: "تحدث المسيح كصاحب الشريعة قائلاً: \"أما أنا فأقول لكم...\"، وأعلن أنه رب السبت أيضاً.", icon: <ScrollText size={24} /> }
];

// Data for Section 4
export const section4 = [
  { id: "teach-s4-rom9", text: "\"ومنهم المسيح حسب الجسد، الكائن على الكل إلهاً مباركاً إلى الأبد آمين\".", ref: "(رو 9: 5)" },
  { id: "teach-s4-john20", text: "اعتراف توما المباشر للسيد المسيح قائلاً: \"ربي وإلهي\".", ref: "(يو 20: 28)" },
  { id: "teach-s4-john1", text: "\"في البدء كان الكلمة، والكلمة كان عند الله، وكان الكلمة الله\".", ref: "(يو 1: 1)" },
  { id: "teach-s4-1tim3", text: "\"عظيم هو سر التقوى الله ظهر في الجسد\".", ref: "(1 تي 3: 16)" },
  { id: "teach-s4-isa9", text: "\"ويدعى اسمه عجيباً مشيراً إلهاً قديراً أباً أبدياً رئيس السلام\".", ref: "(أش 9: 6)" },
  { id: "teach-s4-col2", text: "\"فإنه فيه يحل كل ملء اللاهوت جسدياً\".", ref: "(كو 2: 8، 9)" }
];

export function TeachingsPage() {
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
          style={{ backgroundImage: "url('/image/ChatGPT Image Sep 11, 2026, 02_29_58 AM.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-red-950/50 via-red-950/30 to-orange-950/65" />
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg">لاهوت المسيح</h1>
            <motion.p
              variants={heroFadeScale}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-4xl text-xl text-yellow-200 sm:text-2xl md:text-3xl drop-shadow-md"
            >
              إيمانٌ راسخ… ومجدٌ إلهي أُعلن في المسيح
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="mx-auto max-w-5xl rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-2xl sm:p-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-red-900 sm:text-3xl">
              <Info size={28} />
              مقدمة عامة
            </h2>
            <div className="text-right text-lg leading-relaxed text-gray-700 sm:text-xl">
              <p className="mb-4">
                يعتبر لاهوت المسيح من أهم الموضوعات الحيوية في العقيدة المسيحية. على مر العصور، قامت هرطقات عديدة ضد هذه العقيدة، وتصدت لها الكنيسة بحزم. من أخطر هذه البدع "البدعة الأريوسية" في القرن الرابع الميلادي، والتي بسببها انعقد مجمع نيقية عام 325م.
              </p>
              <p>
                في العصر الحديث، ظهرت بدعة "شهود يهوه" التي تأسست في بنسلفانيا عام 1872، وأصدرت كتباً تهاجم لاهوت المسيح. هذا المحتوى يقدم إثباتات إيجابية واضحة من نصوص الكتاب المقدس لتأكيد ألوهية السيد المسيح.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" onViewportEnter={() => trackSectionView("مركز المسيح في الثالوث القدوس", "teachings")} viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">القسم الأول: مركز المسيح في الثالوث القدوس</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section1.map((item, index) => (
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
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative group w-full">
                <button type="button" aria-label="تكبير صورة مركز المسيح في الثالوث القدوس" onClick={() => setFullscreenImage({ src: "/image/page1.jpg", alt: "مركز المسيح في الثالوث القدوس" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/page1.jpg" alt="مركز المسيح في الثالوث القدوس" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-red-100" onError={(e) => e.currentTarget.src = "/image/download.jpg"} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" onViewportEnter={() => trackSectionView("الصفات الإلهية للسيد المسيح", "teachings")} viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">القسم الثاني: الصفات الإلهية للسيد المسيح</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">يقدم الكتاب المقدس دلائل قاطعة على أن المسيح يحمل صفات لا تخص سوى الله وحده.</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 gap-6">
                {section2.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className={`bg-white rounded-2xl p-6 shadow-md border-b-4 border-red-700 hover:-translate-y-1 transition-transform ${item.title === "الديان" ? "sm:col-span-2" : ""}`}>
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
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 relative group w-full">
                <button type="button" aria-label="تكبير صورة الصفات الإلهية للسيد المسيح" onClick={() => setFullscreenImage({ src: "/image/page2.jpg", alt: "الصفات الإلهية للسيد المسيح" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/page2.jpg" alt="الصفات الإلهية للسيد المسيح" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-red-100" onError={(e) => e.currentTarget.src = "/image/download (1).jpg"} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" onViewportEnter={() => trackSectionView("السلطان المطلق للسيد المسيح", "teachings")} viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-red-900 mb-4">القسم الثالث: السلطان المطلق للسيد المسيح</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">تمتع السيد المسيح بسلطان مطلق يدل على لاهوته بوضوح تام، ويشمل هذا السلطان مجالات متعددة:</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12 mb-16">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 gap-6">
                {section3.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className={`flex gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors ${item.title === "سلطانه على الشريعة" ? "sm:col-span-2" : ""}`}>
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-200 relative group w-full">
                <button type="button" aria-label="تكبير صورة السلطان المطلق للسيد المسيح" onClick={() => setFullscreenImage({ src: "/image/page3.jpg", alt: "السلطان المطلق للسيد المسيح" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/page3.jpg" alt="السلطان المطلق للسيد المسيح" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-stone-100" onError={(e) => e.currentTarget.src = "/image/download (2).jpg"} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" onViewportEnter={() => trackSectionView("آيات صريحة تؤكد لاهوت المسيح", "teachings")} viewport={viewportConfig} className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">القسم الرابع: آيات صريحة تؤكد لاهوت المسيح</h2>
              <p className="text-xl text-orange-100 mt-4 max-w-3xl mx-auto">يزخر الكتاب المقدس بآيات مباشرة لا تقبل التأويل وتعلن ألوهية المسيح صراحة:</p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-6"></div>
            </motion.div>

            <div className="flex flex-col gap-12">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section4.map((item, index) => (
                  <motion.div variants={staggerItem} key={index} id={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors relative">
                    <Quote className="absolute top-4 left-4 text-white/10" size={48} />
                    <p className="text-lg leading-relaxed mb-4 relative z-10 font-medium">{item.text}</p>
                    <div className="text-yellow-400 font-bold text-left relative z-10" dir="ltr">
                      {item.ref}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-300/30 relative group w-full">
                <button type="button" aria-label="تكبير صورة آيات صريحة تؤكد لاهوت المسيح" onClick={() => setFullscreenImage({ src: "/image/page4.jpg", alt: "آيات صريحة تؤكد لاهوت المسيح" })} className="block w-full cursor-zoom-in text-right">
                  <img src="/image/page4.jpg" alt="آيات صريحة تؤكد لاهوت المسيح" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-red-900" onError={(e) => e.currentTarget.src = "/image/download (3).jpg"} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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
