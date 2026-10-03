import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Crown, Heart, Star, Play } from "lucide-react";
import { useState } from "react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { motion } from "motion/react";
import { heroFadeScale, fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { trackAudioPlay, trackSectionView } from "@/lib/analytics";

export const saintsData = [
  {
    id: "saint-mark",
    name: "القديس مرقس الرسول",
    title: "مؤسس الكنيسة القبطية",
    period: "استشهد عام 68 م",
    description: "كاتب الإنجيل الثاني، أحد السبعين رسولاً، أول بطريرك لكرسي الإسكندرية. وصل إلى مصر حوالي عام 42 م وأسس الكنيسة القبطية. استشهد في الإسكندرية عام 68 م.",
    contributions: [
      "تأسيس كنيسة الإسكندرية",
      "كتابة الإنجيل الثاني",
      "إنشاء مدرسة الإسكندرية",
      "رسامة أول أسقف قبطي (أنيانوس)"
    ],
    imageSrc: "/image/download.jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/church_video3_ckpyqw.mp4",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "saint-antony",
    name: "القديس أنطونيوس الكبير",
    title: "أب الرهبان",
    period: "251 - 356 م",
    description: "مؤسس الرهبنة المسيحية في العالم. ترك العالم في سن العشرين وعاش في الصحراء 105 سنوات. تبعه آلاف الرهبان وانتشرت الرهبنة من مصر إلى العالم.",
    contributions: [
      "تأسيس الرهبنة الفردية (الوحدة)",
      "حياة نسكية مثالية",
      "محاربة الشياطين والتجارب",
      "إرشاد آلاف الرهبان"
    ],
    imageSrc: "/image/download (1).jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/v1783029666/church_video6_rydgce.mp4",
    color: "from-orange-500 to-orange-700"
  },
  {
    id: "saint-athanasius",
    name: "القديس أثناسيوس الرسولي",
    title: "حامي الايمان ",
    period: "296 - 373 م",
    description: "البطريرك العشرون لكرسي الإسكندرية. دافع عن الإيمان الأرثوذكسي ضد الأريوسية. نُفي خمس مرات بسبب إيمانه. كتب عدة كتب لاهوتية عظيمة.",
    contributions: [
      "الدفاع عن ألوهية المسيح",
      "مقاومة بدعة أريوس",
      "كتابة حياة القديس أنطونيوس",
      "حضور مجمع نيقية"
    ],
    imageSrc: "/image/download (2).jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/v1783027646/%D8%A7%D9%84%D8%A8%D8%A7%D8%A8%D8%A7_%D8%A7%D8%AB%D9%86%D8%A7%D8%B3%D9%8A%D9%88%D8%B3_lsrn1n.mp4",
    color: "from-red-500 to-red-700"
  },

  {
    id: "saint-cyril",
    name: "القديس كيرلس الكبير",
    title: "عمود الدين وكاتب الإيمان",
    period: "378 - 444 م",
    description: "البطريرك الرابع والعشرون، لقب بـ'ختم الآباء'. دافع عن عقيدة الطبيعة الواحدة للمسيح. رئس مجمع أفسس المسكوني الثالث عام 431 م.",
    contributions: [
      "رئاسة مجمع أفسس",
      "الدفاع عن لقب 'والدة الإله' للعذراء",
      "مقاومة بدعة نسطور",
      "كتابة تفاسير كتابية عميقة"
    ],
    imageSrc: "/image/download (3).jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/v1783029098/chuch_video5_nzrucr.mp4",
    color: "from-purple-500 to-purple-700"
  },
  {
    id: "saint-pachomius",
    name: "القديس باخوميوس",
    title: "أب الشركة",
    period: "292 - 348 م",
    description: "مؤسس الرهبنة الجماعية (الشركة). وضع أول قانون رهباني في المسيحية. أنشأ تسعة أديرة وديرين للراهبات، ضمت آلاف الرهبان.",
    contributions: [
      "تأسيس الرهبنة الجماعية",
      "وضع أول قانون رهباني",
      "إنشاء 11 ديراً",
      "تنظيم الحياة الرهبانية"
    ],
    imageSrc: "/image/download (4).jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/v1783031204/church_video7_a7aa5e.mp4",
    color: "from-green-500 to-green-700"

  },
  {
    id: "saint-john-chrysostom",
    name: "القديس يوحنا الذهبي الفم",
    title: "فم الذهب ومعلم الكنيسة",
    period: "292 - 348 م",
    description: "أحد أعظم آباء الكنيسة في القرن الرابع الميلادي، اشتهر ببلاغته الفريدة وعظاته المؤثرة حتى لُقِّب بذهبي الفم. دافع عن الحق بشجاعة، وخدم الفقراء والمحتاجين، وترك تراثًا روحيًا ولاهوتيًا ما زال يؤثر في الكنيسة حتى اليوم",
    contributions: [
      " أعظم واعظ في تاريخ الكنيسة ",
      " تفسير الكتاب المقدس وتعليم الشعب ",
      "الدفاع عن العدالة ومساندة الفقراء ",
      " وضع القداس الإلهي المعروف باسمه"
    ],
    imageSrc: "/image/john_chrysostom.jpg",
    videoSrc: "https://res.cloudinary.com/dqz8n4hbj/video/upload/church_video2_tmk9cd.mp4",
    color: "from-green-500 to-green-700"

  },


];

export const martyrsData = [
  {
    id: "martyr-demiana",
    name: "الشهيدة دميانة والأربعون عذراء",
    story: "رفضن التخلي عن إيمانهن وتزويجهن قسراً، فاستشهدن جميعاً في عهد دقلديانوس",
    date: "13 طوبة"
  },
  {
    id: "martyr-george",
    name: "الشهيد مار جرجس الروماني",
    story: "ضابط روماني رفيع، اعترف بإيمانه أمام الإمبراطور دقلديانوس، فعُذب وقُتل",
    date: "23 برمودة"
  },
  {
    id: "martyr-mercurius",
    name: "الشهيد أبو سيفين (مرقوريوس)",
    story: "جندي روماني شجاع، استشهد بسبب إيمانه بالمسيح، اشتهر بمعجزاته",
    date: "25 هاتور"
  },
  {
    id: "martyr-rebecca",
    name: "الشهيدة رفقة وأولادها الخمسة",
    story: "أم قديسة شجعت أبناءها على الاستشهاد من أجل المسيح، ثم استشهدت هي أيضاً",
    date: "3 برمودة"
  }
];

export function SaintsPage() {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  return (
    <PageWrapper className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[55vh] sm:min-h-[70vh] md:min-h-[78vh] items-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-orange-900 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="/image/ChatGPT Image Sep 11, 2026, 01_57_19 AM.png"
            alt="مشهد القديسين والكنيسة القبطية"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-red-900/25 to-orange-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-red-950/70 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <motion.div
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            className="inline-block p-6 bg-yellow-500/20 rounded-full backdrop-blur-sm border-2 border-yellow-400 mb-8"
          >
            <Crown size={64} className="text-yellow-400" />
          </motion.div>
          <motion.h1
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 font-bold"
          >القديسون والشهداء</motion.h1>
          <motion.p
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-yellow-200 max-w-4xl mx-auto"
          >
            أعمدة الإيمان ونجوم السماء
          </motion.p>
        </div>

      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-red-900 font-bold text-center">سحابة من الشهود</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                الكنيسة القبطية غنية بقديسيها وشهدائها الذين سطروا تاريخاً مجيداً من الإيمان والتضحية.
                من الرسل والآباء الأوائل إلى الشهداء الذين رووا الأرض بدمائهم، كل واحد منهم نموذج للحياة المسيحية الحقيقية.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                نحتفل بذكراهم، نطلب شفاعتهم، ونقتدي بسيرتهم العطرة في رحلتنا نحو السماء.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Major Saints */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="text-5xl mb-16 text-red-900 text-center font-bold">قديسون عظماء</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} className="space-y-12">
            {saintsData.map((saint, index) => (
              <motion.div variants={staggerItem} key={index} className="w-full" id={saint.id}>
                {fullscreenIndex === index ? (
                  // 🎬 فيديو ملء الشاشة - يأخذ مكان البطاقة كلها
                  <div className="max-w-6xl mx-auto h-140 relative bg-black rounded-3xl overflow-hidden shadow-2xl">
                    <video
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    >
                      <source src={saint.videoSrc} type="video/mp4" />
                    </video>
                    <button
                      onClick={() => setFullscreenIndex(null)}
                      className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black"
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <div className={`max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex`}>
                    <div className={`w-full lg:w-1/3 flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br ${saint.color}`}>
                      <div className="text-center text-white w-full">
                        {saint.imageSrc && (
                          <ImageWithFallback
                            src={saint.imageSrc}
                            alt={saint.name}
                            className="w-full max-w-[200px] sm:max-w-xs h-auto aspect-[3/4] mx-auto mb-4 md:mb-6 object-cover rounded-lg"
                          />
                        )}
                        <div className="text-2xl sm:text-3xl font-bold">{saint.period}</div>
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3 p-6 sm:p-10">
                      <h3 className="text-3xl sm:text-4xl mb-2 sm:mb-3 text-gray-800 font-bold">{saint.name}</h3>
                      <p className={`text-xl sm:text-2xl mb-4 sm:mb-6 bg-gradient-to-r ${saint.color} bg-clip-text text-transparent font-bold`}>{saint.title}</p>
                      <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">{saint.description}</p>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                        <h4 className="text-2xl mb-4 text-red-800 font-bold flex items-center gap-2">
                          <Star size={24} />
                          إسهاماته:
                        </h4>
                        <ul className="space-y-2">
                          {saint.contributions.map((contribution, idx) => (
                            <li key={idx} className="text-lg text-gray-700 flex items-center gap-3">
                              <span className="text-red-700 text-2xl">✦</span>
                              {contribution}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* 🔘 زرار ملء الشاشة تحت الكلام */}
                      {saint.videoSrc && (
                        <button
                          onClick={() => {
                            setFullscreenIndex(index);
                            trackAudioPlay(saint.name, 'saints');
                            trackSectionView(saint.name, 'saints');
                          }}
                          className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-white transition-colors hover:bg-orange-700"
                        >
                          <Play size={20} />
                          عرض الفيديو
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Martyrs */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="text-3xl sm:text-4xl md:text-5xl mb-10 md:mb-16 text-center font-bold">شهداء عظماء</motion.h2>
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border-2 border-white/20 mb-8 md:mb-12">
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 leading-relaxed">
                "عصر الشهداء" هو أظلم فترة في تاريخ الكنيسة القبطية. استشهد مئات الآلاف من الأقباط، خاصة في عهد الإمبراطور دقلديانوس (284-305 م).
              </p>
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                يبدأ التقويم القبطي من عام 284 م (عام الشهداء) تخليداً لذكرى هؤلاء الأبطال الذين فضّلوا الموت على إنكار إيمانهم.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} className="grid md:grid-cols-2 gap-8">
              {martyrsData.map((martyr, index) => (
                <motion.div variants={staggerItem} key={index} id={martyr.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">👑</div>
                    <div className="flex-1">
                      <h3 className="text-2xl mb-2 text-yellow-300 font-bold">{martyr.name}</h3>
                      <p className="text-sm text-yellow-200 mb-3">{martyr.date}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">{martyr.story}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Desert Fathers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="text-5xl mb-16 text-red-900 text-center font-bold">آباء البرية</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { name: "أنبا أنطونيوس", title: "أب الرهبان", quote: "رأيت فخاخ إبليس منصوبة على الأرض كلها", icon: "⛰️" },
              { name: "أنبا بولا", title: "أول السواح", quote: "عاش 90 سنة في البرية", icon: "🦁" },
              { name: "أنبا مقاريوس", title: "أب البرية", quote: "إن لم تقل في قلبك أنا وحدي والله في الأرض، لن تستريح", icon: "🏜️" },
              { name: "أنبا بيشوي", title: "الكامل المحبة", quote: "اشتاق لغسل أقدام المسيح", icon: "❤️" },
              { name: "أنبا شنودة", title: "رئيس المتوحدين", quote: "دافع عن الإيمان الأرثوذكسي", icon: "📜" },
              { name: "أنبا موسى", title: "الأسود القوي", quote: "تاب من حياة اللصوصية", icon: "⚡" }
            ].map((father, index) => (
              <motion.div variants={staggerItem} key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <div className="text-6xl mb-4 text-center">{father.icon}</div>
                <h3 className="text-2xl mb-2 text-red-900 font-bold text-center">{father.name}</h3>
                <p className="text-lg text-red-700 mb-4 text-center font-semibold">{father.title}</p>
                <p className="text-base text-gray-600 italic text-center">"{father.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Saints */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="text-3xl sm:text-4xl md:text-5xl mb-10 md:mb-16 text-red-900 text-center font-bold">قديسون معاصرون</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-5xl mb-4"><ImageWithFallback src="/image/download (5).jpg" alt="البابا كيرلس السادس" className="w-full h-auto aspect-[3/4] max-w-[250px] mx-auto mb-4 md:mb-6 object-cover rounded-lg" /></div>
              <h3 className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-red-800 font-bold">البابا كيرلس السادس</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">1902 - 1971 م</p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                البطريرك الـ116، عُرف بحياته النسكية وصلواته القوية. شهد عصره ظهورات العذراء في الزيتون.
                قام بإحياء روحي كبير في الكنيسة.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-5xl mb-4"><ImageWithFallback src="/image/download (6).jpg" alt="البابا شنودة الثالث" className="w-full h-auto aspect-[3/4] max-w-[250px] mx-auto mb-4 md:mb-6 object-cover rounded-lg" /></div>
              <h3 className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-red-800 font-bold">البابا شنودة الثالث</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">1923 - 2012 م</p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                البطريرك الـ117، معلم الأجيال. خدم لمدة 40 عاماً، نشر التعليم والكرازة في العالم كله.
                كاتب وشاعر ومعلم عظيم.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intercession */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-4xl mx-auto text-center">
            <Heart size={64} className="mx-auto mb-8 text-yellow-400" />
            <h2 className="text-5xl mb-8 font-bold">شفاعة القديسين</h2>
            <p className="text-2xl mb-8 leading-relaxed">
              نؤمن بشفاعة القديسين، فهم أحياء عند الله وقادرون على الصلاة من أجلنا.
              نطلب صلواتهم كما نطلب صلوات إخوتنا على الأرض.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <p className="text-xl italic">
                "إذاً إذ لنا سحابة من الشهود مقدار هذه محيطة بنا، لنطرح كل ثقل، والخطية المحيطة بنا بسهولة، ولنحاضر بالصبر في الجهاد الموضوع أمامنا"
              </p>
              <p className="text-lg mt-4 text-yellow-300">- عبرانيين 12: 1</p>
            </div>
          </motion.div>
        </div>

      </section>
    </PageWrapper>
  );
}
