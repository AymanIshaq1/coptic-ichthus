import { Flame } from "lucide-react";
import sectionOneImage from "../../../image/section 1.jpeg";
import sectionTwoImage from "../../../image/section2.jpeg";
import sectionThreeImage from "../../../image/section3.jpeg";
import sectionFourImage from "../../../image/section4.jpeg";
import sectionFiveImage from "../../../image/section5.jpeg";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { motion } from "motion/react";
import { heroFadeScale, fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";


type ContentCard = {
  title?: string;
  items: string[];
};

type ChapterImageProps = {
  src: string;
  alt: string;
};

function ChapterImage({ src, alt }: ChapterImageProps) {
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="bg-white rounded-2xl p-4 shadow-2xl border-2 border-red-100">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
}

function BulletList({ items, className = "text-gray-700" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 text-base sm:text-lg md:text-xl leading-relaxed ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="text-red-700">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export const chapterOne = [
  { id: "lit-c1-1", text: "معنى الكنيسة: كلمة عبرية ويونانية تعني محفلًا أو جماعة، وتُطلق على المبنى، وعلى الإكليروس، وعلى جماعة المؤمنين." },
  { id: "lit-c1-2", text: "ألقاب الكنيسة: عروس المسيح، جسد المسيح، رعية الله، كنيسة الله، بيت الله، بناء الله، بيت الصلاة، هيكل الله، البيعة، حظيرة الخراف، حقل الله، وبيت الملائكة." },
  { id: "lit-c1-3", text: "رموز الكنيسة: حواء، فلك نوح، مدن الملجأ، الحمامة الوحيدة، الجنة المغلقة، الكرمة، الشبكة الجامعة، أورشليم، والسماء المنيرة." },
  { id: "lit-c1-4", text: "نشأة كنيسة العهد الجديد: تأسست يوم الخمسين بحلول الروح القدس على التلاميذ." },
  { id: "lit-c1-5", text: "الأساس الإيماني: الإيمان بألوهية السيد المسيح." },
  { id: "lit-c1-6", text: "القصد الإلهي من الكنيسة: توحيد البشرية في المسيح، وعيش ملكوت الله على الأرض، ونافذة على الأبدية، وموضع سكنى الله، والاتحاد بالمسيح في الإفخارستيا، وعمل الروح القدس، وإنارة العالم." },
  { id: "lit-c1-7", text: "علامات الكنيسة: الواحدة، الوحيدة، المقدسة، الجامعة، الرسولية، الأرثوذكسية (مستقيمة التمجيد)." }
];
export const chapterTwo = [
  { id: "lit-c2-1", text: "معنى الطقس: كلمة يونانية تعني النظام والترتيب الكنسي في العبادات والمباني." },
  { id: "lit-c2-2", text: "المفاهيم العميقة للطقوس: ممارسات خارجية تعبر عن عقائد إيمانية وانفعالات نفسية، وتنقل الأثر الروحي للنفس عبر الحواس الخمس، وتُحيي المناسبات القديمة." },
  { id: "lit-c2-3", text: "مصادر الطقوس: الكتاب المقدس، والتقليد المقدس (الرسولي والكنسي)، والقوانين الكنسية (قوانين الرسل، والمجامع المسكونية والمكانية، وقوانين الآباء، والدسقولية)، وأقوال الآباء." },
  { id: "lit-c2-4", text: "فوائد الطقوس: تؤكد نظام الله، وتوحد الشعب المسيحي، وتقربنا إلى الكنيسة الأولى، وتحفظ العقائد من التحريف، وتُشرك الجسد والروح والحواس في العبادة، وتُعد وسيلةً للتعليم، وتعطي ثباتًا للعبادة." }
];

export const buildingSections: (ContentCard & { id: string })[] = [
  {
    id: "lit-b-1",
    title: "أشكال المبنى الكنسي والسقف والمنارة",
    items: [
      "أشكال المبنى الكنسي: شكل الصليب، وشكل الدائرة، وشكل السفينة (المستطيل)، وهو الأكثر شيوعًا في مصر كرمز لفلك نوح.",
      "السقف والمنارة: يكون السقف جمالونًا، أو قبابًا، أو قبوات، وتعمل المنارة كبرج مراقبة، وبها الجرس للتنبيه للعبادة."
    ]
  },
  {
    id: "lit-b-2",
    title: "الهيكل ومحتوياته",
    items: [
      "الهيكل (قدس الأقداس): يقع في الشرق ويمثل السماء.",
      "المذبح: يأخذ شكل المكعب ليمثل قبر المسيح، ويُقام غير ملاصق للحائط ليُدار حوله.",
      "أغطية المذبح: ثلاثة أغطية، والثالث يسمى \"الإبروسفارين\" ويمثل الحجر على باب القبر.",
      "اللوح المقدس: قطعة خشبية مستطيلة مدشنة توضع على المذبح.",
      "الكرسي (التابوت): صندوق خشبي لحفظ الكأس أثناء القداس.",
      "الشرقية (حضن الآب): تجويف نصف دائري أمام المذبح تُرسم فيه أيقونة ضابط الكل (البانتوكراتور).",
      "أدوات الخدمة: الكأس، الصينية، القبة (النجم)، الملعقة (الماستير)، إناء الذخيرة، المجمرة (الشورية)، البشارة، صليب اليد، وقارورتا الخمر والماء."
    ]
  },
  {
    id: "lit-b-3",
    title: "حامل الأيقونات",
    items: [
      "حامل الأيقونات (الأيقونستاسز): حاجز خشبي أو رخامي يفصل الهيكل عن صحن الكنيسة. يحتوي على 3 أبواب (الأوسط هو الملوكي)، وأيقونات مرتبة طقسيًا (يسار الداخل: العذراء، البشارة، ميخائيل، مرقس. يمين الداخل: المسيح، يوحنا المعمدان، قديس الكنيسة). وتتدلى بيض النعام أمامه كرمز للقيامة."
    ]
  },
  {
    id: "lit-b-4",
    title: "صحن الكنيسة",
    items: [
      "صحن الكنيسة:",
      "خورس الشمامسة: يضم المنجليتين (للقراءة)، والشمعدانين، وكرسي الأسقف.",
      "مكان الشعب: يضم الأعمدة (12 عمودًا)، والإمبل (المنبر)، واللقان (لغسل الأرجل)، والمغطس (قديمًا لعيد الغطاس).",
      "حجرة المعمودية: تقع في الجانب الغربي الشمالي لمدخل الكنيسة، وتأخذ أشكالًا (رباعي، سداسي، ثماني، دائري، صليب) تعبر عن الموت والقيامة والأبدية."
    ]
  }
];

export const chapterFour = [
  { id: "lit-c4-1", text: "الاتجاه للشرق: انتظارًا لشمس البر، وتذكارًا للفردوس المفقود، وترقبًا للمجيء الثاني، وتطلعًا إلى المصلوب." },
  { id: "lit-c4-2", text: "تسمية الكنائس بأسماء القديسين: لتكريمهم وتذكر جهادهم، ولها أصول كتابية في العهدين القديم والجديد." },
  { id: "lit-c4-3", text: "الصليب: يوضع فوق المذبح، وحامل الأيقونات، والمنارة؛ لإعلان خضوع الكنيسة للمسيح المصلوب، وهو علامة المجيء الثاني." },
  { id: "lit-c4-4", text: "الصور والأيقونات: مسموح بها كعظات مرسومة بسبب \"التجسد الإلهي\" الذي أعلن صورة الله المنظورة، وتُرسم للسمائيين بهالة نور (هالة المسيح بداخلها صليب)." },
  { id: "lit-c4-5", text: "البخور: يشير إلى حضرة الله، وتطهير الشعب، ورائحة ذبيحة المسيح، وصلوات القديسين المتصاعدة." },
  { id: "lit-c4-6", text: "الأنوار والشموع: تُضاء لتشير إلى حضرة الله، ونور الإنجيل، والملائكة والقديسين ككواكب مضيئة." },
  { id: "lit-c4-7", text: "الرموز الكنسية: السمكة (ترمز للمسيح \"إخسيس\" وللمؤمنين)، والنسر (المسيح الغالب)، والحمل، وسنابل القمح، وعنقود العنب." }
];
export const sacraments: (ContentCard & { id: string })[] = [
  {
    id: "lit-s-1",
    title: "1. سر المعمودية",
    items: [
      "هو باب الأسرار، يمنح الخلاص، والولادة الثانية، وغفران الخطايا، ووسمًا لا يُمحى.",
      "يجب أن يكون بالتغطيس الكامل ثلاث مرات.",
      "طقوسه: تحليل المرأة (بعد 40 يومًا للذكر و80 يومًا للأنثى)، وجحد الشيطان (جهة الغرب)، وإعلان الإيمان (جهة الشرق)، والدهن بالزيوت (أبوغالمسيس والغاليلاون)، وتقديس الماء، والتغطيس."
    ]
  },
  {
    id: "lit-s-2",
    title: "2. سر الميرون",
    items: [
      "يُمنح لنوال ختم موهبة الروح القدس، والتثبيت في الحياة المسيحية.",
      "يُمنح فورًا بعد المعمودية بالدهن بزيت الميرون، وذلك بـ 36 رشمة على الرأس، والحواس، والمفاصل."
    ]
  },
  {
    id: "lit-s-3",
    title: "3. سر التوبة والاعتراف",
    items: [
      "رجوع الخاطئ باعترافه للكاهن لنوال المغفرة.",
      "شروطه: الندم المنسحق، والعزم على الإصلاح، والإيمان بدم المسيح، والاعتراف أمام الكاهن."
    ]
  },
  {
    id: "lit-s-4",
    title: "4. سر التناول",
    items: [
      "سر الشكر والمائدة المقدسة، حيث يتحول الخبز والخمر إلى جسد ودم المسيح.",
      "القربانة (الخبز): تُصنع من دقيق القمح النقي، بدون ملح، مختمرة (بخميرة تموت بالنار كرمز للخطية التي ماتت في جسد المسيح)، وتُختم بختم (قدوس الله)، وتُثقب بخمسة ثقوب كرمز لجراحات المسيح.",
      "الخمر: عصير كرمة نقي يُشترط ألا يكون مُسكرًا (مطبوخًا بالنار)، ويُمزج بالماء.",
      "شروط التناول: الإيمان الأرثوذكسي، والتوبة والاعتراف، والصلح مع الآخرين، والاستعداد الجسدي (الصوم 9 ساعات للكبار، ونظافة الجسد)."
    ]
  },
  {
    id: "lit-s-5",
    title: "5. سر مسحة المرضى",
    items: [
      "لمنح الشفاء الجسدي والروحي للمؤمن المريض، ومغفرة الخطايا.",
      "يُصلى سبع صلوات على زيت به سبع فتائل مضاءة."
    ]
  },
  {
    id: "lit-s-6",
    title: "6. سر الزيجة المقدسة",
    items: [
      "اتحاد الزوجين برباط مقدس بفعل الروح القدس.",
      "سماته: الوحدانية، والشراكة الحقيقية، والاستمرارية (لا طلاق إلا لعلة الزنا).",
      "يسبقه \"الخطبة\" (وعد بالزواج)، وطقس \"عربون الزواج\"، ثم \"صلاة الإكليل\"، ووضع الأكاليل كعلامة للنصر والعفة."
    ]
  },
  {
    id: "lit-s-7",
    title: "7. سر الكهنوت",
    items: [
      "يمنح السلطان لمباشرة الخدمات والأسرار.",
      "درجة الشماسية (الدياكونية): رتب للمساعدة (الإبصالتس/المرتل، الأغنسطس/القارئ، الإيبي دياكون/مساعد الشماس، الدياكون/الشماس الكامل، والأرشيدياكون/رئيس الشمامسة).",
      "درجة القسيسية: (القس والقمص) للرعاية وإتمام الأسرار.",
      "درجة الأسقفية: (الأسقف، والمطران، والبطريرك/البابا) كمال الكهنوت، ولهم حق السيامة ووضع اليد.",
      "الملابس الكهنوتية: التونية (الرداء الأبيض كرمز للملائكة والنقاء)، والبطرشيل (حزام يُلبس بطرق مختلفة حسب الرتبة كرمز لنير المسيح)، والصدرة، والطيلسانة، والبرنس."
    ]
  }
];

export function LiturgyPage() {
  return (
    <PageWrapper className="min-h-screen" dir="rtl">
      <section className="relative isolate flex min-h-[55vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[88vh] items-center justify-center overflow-hidden py-16 sm:py-24 md:py-32 bg-gradient-to-br from-red-900 via-red-800 to-orange-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/ChatGPT Image Sep 11, 2026, 01_16_32 AM.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-red-950/55 via-red-950/35 to-orange-950/70" />
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.div
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            className="inline-block p-6 bg-yellow-500/20 rounded-full backdrop-blur-sm border-2 border-yellow-400 mb-8"
          >
            <Flame size={64} className="text-yellow-400" />
          </motion.div>
          <motion.h1
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 font-bold drop-shadow-lg"
          >
            الطقس الكنسي
          </motion.h1>
          <motion.p
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-yellow-200 max-w-4xl mx-auto drop-shadow-md"
          >
             إيمانٌ نعيشه… وصلواتٌ تحفظ هويتنا    
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="max-w-5xl mx-auto mb-10 md:mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-red-900 font-bold">الفصل الاول: مقدمة عن الكنيسة</h2>
            <div className="h-4 bg-gradient-to-r from-red-700 to-orange-600 rounded-2xl shadow-md"></div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10"
          >
            {chapterOne.slice(0, 3).map((item, index) => (
              <motion.div key={index} id={item.id} variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
                <div className={`h-4 bg-gradient-to-r ${index === 0 ? "from-red-700 to-red-900" : index === 1 ? "from-orange-500 to-orange-700" : "from-green-500 to-green-700"}`}></div>
                <div className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="max-w-5xl mx-auto bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {chapterOne.slice(3).map((item, index) => (
                <motion.div key={index} id={item.id} variants={staggerItem} className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-red-100">
                  <BulletList items={[item.text]} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig}>
            <ChapterImage src={sectionOneImage} alt="الفصل الأول: مقدمة عن الكنيسة" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto mb-10 md:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-red-900 font-bold">الفصل الثاني: مقدمة عن طقوس الكنيسة</h2>
            <div className="h-4 bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl shadow-md"></div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-6">
            {chapterTwo.map((item, index) => (
              <motion.div variants={staggerItem} key={index} id={item.id} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-red-100">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl text-red-700">{index + 1}</div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig}>
            <ChapterImage src={sectionTwoImage} alt="الفصل الثاني: مقدمة عن طقوس الكنيسة" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto mb-10 md:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-red-900 font-bold">الفصل الثالث: المبنى الكنسي ومحتوياته</h2>
            <div className="h-4 bg-gradient-to-r from-red-700 to-orange-600 rounded-2xl shadow-md"></div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {buildingSections.map((section, index) => (
              <motion.div variants={staggerItem} key={index} id={section.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border-r-4 border-red-700">
                <h3 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-red-800 font-bold">{section.title}</h3>
                <BulletList items={section.items} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig}>
            <ChapterImage src={sectionThreeImage} alt="الفصل الثالث: المبنى الكنسي ومحتوياته" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-800 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto mb-10 md:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 font-bold">الفصل الرابع : عقائد وطقوس تتعلق بالمبنى</h2>
            <div className="h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-md"></div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 sm:gap-8">
            {chapterFour.map((item, index) => (
              <motion.div variants={staggerItem} key={index} id={item.id} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-white/20 shadow-lg ${index === chapterFour.length - 1 ? "md:col-span-3" : ""}`}>
                <BulletList items={[item.text]} className="text-white" />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-6xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-white/20">
              <img
                src={sectionFourImage}
                alt="الفصل الرابع : عقائد وطقوس تتعلق بالمبنى"
                className="w-full h-auto object-contain rounded-xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-5xl mx-auto mb-10 md:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-red-900 font-bold">الفصل الخامس: أسرار الكنيسة السبعة</h2>
            <div className="h-4 bg-gradient-to-r from-red-700 to-orange-600 rounded-2xl shadow-md"></div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportConfig} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
            {sacraments.map((sacrament, index) => (
              <motion.div variants={staggerItem} key={index} id={sacrament.id} className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-red-100 ${index === sacraments.length - 1 ? "md:col-span-2" : ""}`}>
                <h3 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-red-800 font-bold">{sacrament.title}</h3>
                <BulletList items={sacrament.items} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportConfig}>
            <ChapterImage src={sectionFiveImage} alt="الفصل الخامس: أسرار الكنيسة السبعة" />
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
