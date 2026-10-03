import type { ReactNode } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Calendar, Crown, BookOpen, Sword, Heart, Star, Users, Zap, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { heroFadeScale, viewportConfig, staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { trackTimelineOpen, trackTimelineEraSelected, trackSectionView } from "@/lib/analytics";

import apostlesImg from "../../../image/history-apostolic.jpeg";
import martyrdomImg from "../../../image/history-martyrdom.jpeg";
import monasticismImg from "../../../image/history-monasticism.jpeg";
import councilsImg from "../../../image/history-councils.jpeg";
import goldenImg from "../../../image/history-golden.jpeg";
import islamicEntryImg from "../../../image/history-islamic-entry.jpeg";
import islamicCrusadesImg from "../../../image/history-islamic-crusades.jpeg";
import modernImg from "../../../image/history-modern.jpeg";



export type Era = {
  id: string;
  title: string;
  dates: string;
  intro: string;
  overview: string;
  events: { year: string; text: string }[];
  challenges: string;
  figures: { name: string; desc: string }[];
  impact: string;
  highlights: string[];
  quote: string;
  image?: string;
  color: string;
  glowColor: string;
  accent: string;
  icon: ReactNode;
};

export const eras: Era[] = [
  {
    id: "apostolic", title: "نشأة الكنيسة وتاريخ الآباء الرسل: العصر الرسولي", dates: "34 - 100 م",
    intro: "يُعد العصر الرسولي حجر الأساس الذي بُنيت عليه الكنيسة المسيحية في العالم، حيث انطلقت شرارة الإيمان الأولى من أورشليم لتضيء أرجاء المسكونة. إنه عصر التأسيس، والروحانية الصافية، وتدوين الكتاب المقدس، والذي بفضله امتدت الكرازة رغم كل الصعوبات.",
    overview: "يبدأ هذا العصر منذ تأسيس الكنيسة يوم العنصرة (عام 34 م) بحلول الروح القدس على التلاميذ في عُليّة صهيون (بيت مريم والدة مارمرقس). في ذلك اليوم، آمن نحو ثلاثة آلاف نفس، وولدت الكنيسة ككيان محدد المعالم. وينتهي هذا العصر بنياحة القديس يوحنا الحبيب، آخر من عاش من الآباء الرسل، عام 100 م.",
    events: [
      { year: "34 م", text: "صعود الرب يسوع، وحلول الروح القدس، وتأسيس الكنيسة الأولى." },
      { year: "37 م", text: "استشهاد القديس إسطفانوس، أول الشمامسة وأول الشهداء." },
      { year: "50 م", text: "انعقاد مجمع أورشليم، وهو أول مجمع كنسي لحل مشكلة التهود." },
      { year: "60 م", text: "قدوم القديس مارمرقس إلى مصر وتأسيس كنيسة الإسكندرية." },
      { year: "67 م", text: "استشهاد القديس بطرس والقديس بولس في روما." },
      { year: "68 م", text: "استشهاد القديس مارمرقس الرسول في الإسكندرية." },
      { year: "70 م", text: "خراب مدينة أورشليم ونهاية مُلك اليهود وتشتتهم." },
      { year: "100 م", text: "نياحة القديس يوحنا الحبيب وتدوين إنجيله، وبذلك نصل لنهاية العصر الرسولي." },
    ],
    challenges: "واجهت الكنيسة في هذا العصر سلسلة طويلة ومريرة من المؤامرات والاضطهادات. شملت هذه التحديات مقاومة اليهود، والتي أسفرت عن رجم القديس إسطفانوس وسجن الرسل. كما واجهت الكنيسة تحديات فكرية عرفت بـ «مشكلة التهود»، حيث نادى فريق بضرورة التزام المسيحيين من الأمم بناموس موسى والختان، مما استدعى عقد مجمع أورشليم لحسم النزاع وإقرار ضوابط محددة.",
    figures: [
      { name: "القديس بطرس والقديس بولس", desc: "أسسا معاً كنيسة أنطاكية الأممية الأولى، وكانا نقطة انطلاق لرحلات تبشيرية واسعة، واستشهدا معاً على يد نيرون." },
      { name: "القديس مارمرقس", desc: "مؤسس الكنيسة القبطية بالإسكندرية، وكاتب أول إنجيل، وواضع القداس الإلهي." },
      { name: "إنيانوس", desc: "إسكافي مصري كان أول من قَبِل الإيمان في مصر بعد معجزة شفاء يده، ورُسم أسقفاً ليخلف مارمرقس في رعاية الكنيسة." },
      { name: "القديس إسطفانوس", desc: "أول الشهداء، كان رجلاً مملوءاً إيماناً وقوة ويصنع العجائب، ورُجم لدفاعه بشجاعة عن شخص المسيح." },
    ],
    impact: "شهد هذا العصر انطلاق المسيحية بشكل جهاري وسريع من أورشليم لتنتشر شرقاً إلى الفرس والعراق، وشمالاً إلى آسيا الصغرى وأوروبا، وغرباً إلى روما، وجنوباً إلى مصر وليبيا. كما تميز بتدوين أسفار الكتاب المقدس بأكمله، وتأسيس الكنائس الكبرى (أورشليم، أنطاكية، الإسكندرية، وروما) لتكون مراكز إشعاع روحي للعالم أجمع.",
    highlights: ["تأسيس الكنيسة الأولى بحلول الروح القدس في يوم الخمسين.", "امتداد الكرازة المسيحية إلى جميع أنحاء العالم المعروف آنذاك.", "تدوين أسفار الكتاب المقدس بالكامل.", "انعقاد أول مجمع كنسي في أورشليم لحل الخلافات العقائدية بنجاح.", "صمود الكنيسة أمام اضطهادات اليهود والوثنيين الأولى."],
    quote: "ولدت الكنيسة ككيان محدد المعالم منذ يوم الخمسين.. وعايشوا أحداث صلبه وقيامته وصعوده.",
    image: apostlesImg,
    color: "from-blue-500 to-blue-700",
    glowColor: "rgba(59,130,246,0.35)",
    accent: "blue", icon: <Star size={22} />,
  },
  {
    id: "martyrdom", title: "عصر الاستشهاد في تاريخ الكنيسة: بطولات وتحديات", dates: "64 - 313 م",
    intro: "يُمثل عصر الاستشهاد أزهى فترات البطولة في تاريخ الكنيسة، حيث سطّر المؤمنون إيمانهم بدمائهم الطاهرة. في هذا العصر, قاومت الكنيسة أعتى الإمبراطوريات الرومانية ليس بالسلاح، بل بالصمود والمحبة، لتثبت أن الإيمان المسيحي ينمو ويزدهر تحت نيران الاضطهاد.",
    overview: "يبدأ هذا العصر من بداية حكم الإمبراطور نيرون (عام 64 م)، ويستمر حتى صدور «مرسوم ميلاو» للتسامح الديني عام 313 م، والذي أقر المسيحية ديانة مُعترف بها. تميز هذا العصر بعشر حلقات متتابعة من الاضطهاد العنيف الذي شنته الدولة الرومانية الوثنية.",
    events: [
      { year: "64 م", text: "بدء الاضطهاد الأول تحت حكم الإمبراطور نيرون بتهمة تحريض المسيحيين على حرق روما." },
      { year: "250 م", text: "الاضطهاد السابع في عهد ديسيوس، وفيه استشهد القديس فيلوباتير مرقوريوس." },
      { year: "284 م", text: "الاضطهاد العاشر والأقسى في عهد دقلديانوس، والذي سُمي بـ «عصر الشهداء»، وبدأ معه التقويم القبطي." },
      { year: "313 م", text: "إصدار الإمبراطور قسطنطين «مرسوم ميلاو» الذي أعطى الحرية الدينية وأنهى عصور الاضطهاد." },
    ],
    challenges: "تعرضت الكنيسة لاضطهاد مزدوج وقاسٍ: اضطهاد دموي من القياصرة الرومان شمل القتل، السحل، والتعذيب، واضطهاد فكري من الفلاسفة الوثنيين واليهود الذين وجهوا اتهامات للمسيحيين بالخيانة، والفساد الأخلاقي، والكفر بآلهة روما. واجهت الكنيسة ذلك بالدفاع الفكري، فظهر «الآباء المدافعون» للرد على هذه الافتراءات بالأدلة والبراهين.",
    figures: [
      { name: "ترتليانوس (ترتليان)", desc: "محامٍ بارع اعتنق المسيحية بعد أن أبهره صبر الشهداء العجيب على التعذيب، فأصبح من كبار المدافعين عن الإيمان." },
      { name: "أثيناغوراس المدافع", desc: "فيلسوف وثني قاده بحثه العميق لاعتناق المسيحية، وصار من أكبر المدافعين عنها، وتولى مهمة التعليم في مدرسة الإسكندرية اللاهوتية." },
      { name: "دقلديانوس", desc: "إمبراطور روماني قاد أعنف موجات الاضطهاد وأقساها، ولشدة قسوته وكثرة الشهداء في عهده، نُسب إلى عصره بدء «التقويم القبطي»." },
      { name: "قسطنطين", desc: "الإمبراطور الذي أصدر مرسوم ميلاو، وأنهى عصور الاضطهاد، ومنح الكنيسة امتيازات وحقوقاً كثيرة، وسمح بإعادة بناء الكنائس." },
    ],
    impact: "رغم شدة العذاب وقسوة الأباطرة، كان صبر الشهداء سبباً رئيسياً في جذب الكثيرين من الوثنيين لاعتناق المسيحية. أدى هذا العصر إلى تنقية الكنيسة وتثبيت الإيمان، وظهرت الدفاعات اللاهوتية القوية التي أثرت الفكر المسيحي، كما تم تأسيس التقويم القبطي (تقويم الشهداء) تخليداً لبطولاتهم.",
    highlights: ["استمر العصر من حكم نيرون (64 م) حتى مرسوم ميلاو (313 م).", "واجهت الكنيسة 10 حلقات قاسية من الاضطهاد الروماني.", "ظهور «الآباء المدافعون» للرد على الهجمات الفكرية والفلسفية الوثنية.", "تأسيس التقويم القبطي (تقويم الشهداء) بداية من حكم دقلديانوس (284 م).", "انتهاء الاضطهاد باعتراف الإمبراطور قسطنطين بالمسيحية كديانة معترف بها."],
    quote: "ويضطر كل مَن يشاهد صبر هؤلاء العجيب أن يبدأ بالشك، فيرغب في معرفة حقيقة أمرهم، وفور اكتشافه هذه الحقيقة يعتنقها.",
    image: martyrdomImg,
    color: "from-red-500 to-red-700",
    glowColor: "rgba(220,38,38,0.4)",
    accent: "red", icon: <Sword size={22} />,
  },
  {
    id: "monasticism", title: "عصر الرهبنة في مصر: نشأتها، تاريخها، وأهم الآباء المؤسسين", dates: "القرن الرابع الميلادي",
    intro: "يُعد عصر الرهبنة بمثابة ثورة روحية هادئة انطلقت من قلب صحاري مصر لتضيء العالم كله. فبعد أن توقفت دماء الشهداء، تحول المؤمنون إلى نوع جديد من الاستشهاد غير المنظور، تاركين أمجاد العالم ومباهجه ليعيشوا حياة مكرسة بالكامل للحب الإلهي.",
    overview: "بدأت فكرة التنسك والتعبد في ضواحي الإسكندرية منذ عهد القديس مارمرقس، حيث عاش المؤمنون حياة العفة والطهارة. ورغم وجود محاولات مبكرة للرهبنة، مثل محاولة «فرونتينوس» عام 151 م الذي جمع 70 شخصاً في وادي النطرون، إلا أن الرهبنة لم تُعرف بشكلها الواضح والمنظم إلا مع ظهور القديسين العظام أمثال الأنبا بولا والأنبا أنطونيوس. وقد تطورت الرهبنة من العزلة الفردية إلى نظام «الشركة» (الحياة الجماعية).",
    events: [
      { year: "151 م", text: "تأسيس أول محاولة لدير مسيحي على يد «فرونتينوس» في وادي النطرون." },
      { year: "بدايات القرن الرابع", text: "تخلي الأنبا أنطونيوس عن ثروته (300 فدان) وتوجهه إلى البرية ليتعبد في مغارة، ليصبح مؤسس الرهبنة في العالم." },
      { year: "تأسيس نظام الشركة", text: "قام الأنبا باخوميوس بتأسيس نظام «الشركة الرهبانية»، حيث بنى ديراً يضم جماعة من الرهبان يعيشون ويشتركون معاً في الصلاة والعمل." },
      { year: "برية شيهيت", text: "هروب الأنبا مقاريوس إلى وادي النطرون وتأسيسه للرهبنة هناك." },
    ],
    challenges: "لم تكن الرهبنة هروباً سلبياً من العالم، بل كانت مواجهة روحية شرسة. واجه الرهبان تحدياً مزدوجاً: التخلي الكامل عن مباهج العالم وأمواله، والجهاد الروحي القاسي ضد أهواء النفس والشياطين في البراري الموحشة. وقد اعتبر هذا الجهاد النُسكي بديلاً عن الاستشهاد الدموي.",
    figures: [
      { name: "الأنبا أنطونيوس", desc: "«أبو الرهبان»، باع ماله وانعزل في البرية، وتتلمذ على يديه الكثيرون، وكان سنداً للبابا أثناسيوس." },
      { name: "الأنبا بولا", desc: "أول السواح، قدم مثالاً عظيماً لرهبنة التوحد والانفراد المطلق." },
      { name: "الأنبا باخوميوس", desc: "أب ونظام «الشركة الرهبانية»، وهو أول من شيّد ديراً بأسوار يجمع الرهبان في حياة مشتركة." },
      { name: "الأنبا مقاريوس الكبير", desc: "مؤسس الرهبنة في برية الإسقيط (وادي النطرون)، وتتلمذ على يديه قديسون عظماء مثل مكسيموس ودوماديوس." },
      { name: "الأنبا شنودة رئيس المتوحدين", desc: "تلميذ خاله الأنبا بيجول، وكان من أبرز قادة الرهبنة في مصر." },
    ],
    impact: "أحدث عصر الرهبنة تأثيراً عميقاً في تاريخ الكنيسة؛ فقد تحولت القفار القاحلة إلى رياض روحية تُنبت النفوس وتُثمر الكمال. وأصبحت الأديرة مراكز إشعاع روحي، وتخرج منها أعظم البطاركة والعلماء الذين دافعوا عن الإيمان المستقيم.",
    highlights: ["مصر هي مهد الرهبنة المسيحية في العالم.", "تطورت الرهبنة من العزلة الفردية (التوحد) إلى حياة الشركة الجماعية.", "تخلى الرهبان عن أموالهم وعاشوا حياة الفقر الاختياري والطاعة والعفة.", "أصبح الجهاد الروحي في الصحراء بديلاً عن الاستشهاد الدموي بعد انتهاء عصور الاضطهاد."],
    quote: "فتجولت القفار القاحلة إلى رياض يانعة تنبت النفوس وتثمر الكمال.",
    image: monasticismImg,
    color: "from-yellow-500 to-yellow-700",
    glowColor: "rgba(217,119,6,0.35)",
    accent: "amber", icon: <Heart size={22} />,
  },
  {
    id: "councils", title: "عصر المجامع الكنسية: تاريخ نيقية، القسطنطينية، وأفسس", dates: "325 - 451 م",
    intro: "عندما توقفت حروب الاضطهاد الدموي، واجهت الكنيسة حرباً من نوع آخر؛ حرباً فكرية وعقائدية هددت أساسات الإيمان. في هذا العصر، وقفت الكنيسة كحارس أمين، تعقد المجامع المسكونية لتشرح العقيدة، وتدحض الهرطقات، وتحفظ الإيمان نقياً كما تسلمته من الآباء الرسل.",
    overview: "بدأ هذا العصر بشكل بارز في القرن الرابع الميلادي، كنتيجة لظهور تفسيرات خاطئة لآيات الكتاب المقدس بسبب الكبرياء الفكري لبعض الأشخاص. والمجامع الكنسية لم تكن لتُنشئ عقيدة جديدة، بل كانت تجتمع لتشرح وتفسر وتوثق الإيمان المستقيم. وانقسمت المجامع إلى نوعين: مجامع مكانية (محلية) تجمع أساقفة إقليم معين، ومجامع مسكونية تشمل ممثلي كل الكنائس في العالم.",
    events: [
      { year: "325 م", text: "انعقاد المجمع المسكوني الأول في نيقية لمحاكمة آريوس، ووضع الجزء الأول من «قانون الإيمان»." },
      { year: "381 م", text: "انعقاد مجمع القسطنطينية لمحاكمة مكدونيوس، وإضافة الجزء الأخير من «قانون الإيمان» الخاص بالروح القدس." },
      { year: "431 م", text: "انعقاد مجمع أفسس برئاسة البابا كيرلس الكبير لمحاكمة نسطور، ووضع مقدمة قانون الإيمان." },
      { year: "451 م", text: "مجمع خلكيدونية، وهو المجمع الذي رفضته الكنيسة القبطية، وتسبب في أول انشقاق كبير في الكنيسة المسيحية." },
    ],
    challenges: "كان التحدي الأكبر هو ظهور «الهرطقات» والبدع التي مست صميم الإيمان المسيحي. فمن إنكار لاهوت المسيح (آريوس)، إلى إنكار ألوهية الروح القدس (مكدونيوس)، إلى فصل طبيعة المسيح وإنكار لقب «والدة الإله» للعذراء مريم (نسطور). كما واجهت الكنيسة المصرية اضطهاداً شديداً من القياصرة الرومان (الملكيين) بعد رفضها لمجمع خلكيدونية.",
    figures: [
      { name: "البابا أثناسيوس الرسولي", desc: "سطع نجمه في مجمع نيقية حين كان شماساً، ودافع بقوة عن لاهوت المسيح ضد آريوس، وصيغ بفضله قانون الإيمان." },
      { name: "البابا كيرلس الكبير", desc: "ترأس مجمع أفسس الأول، وتصدى لهرطقة نسطور، وأقر عقيدة «طبيعة واحدة للإله الكلمة المتجسد»." },
      { name: "البابا ديسقورس", desc: "دافع باستماتة عن الإيمان الأرثوذكسي في مجمع خلكيدونية، وتعرض للعزل والنفي بسبب تمسكه بعقيدته." },
    ],
    impact: "أثمر هذا العصر عن صياغة «قانون الإيمان» الذي تردده الكنائس حتى اليوم، وتم تثبيت العقيدة المسيحية بوضوح. ورغم أن هذا العصر حفظ الإيمان، إلا أن نهاياته شهدت انشقاقاً حزيناً قسم الكنيسة المسيحية إلى شطرين (خلكيدونيين وغير خلكيدونيين)، مما أدى لتعرض الكنيسة القبطية لاضطهادات سياسية ودينية.",
    highlights: ["المجامع لا تبتدع عقيدة بل تشرح وتوثق الإيمان المسلم من الرسل.", "مجمع نيقية (325 م) دحض بدعة آريوس وصاغ أساس قانون الإيمان.", "مجمع القسطنطينية (381 م) أكد ألوهية الروح القدس ضد مكدونيوس.", "مجمع أفسس (431 م) أكد لقب العذراء «والدة الإله» ضد نسطور.", "مجمع خلكيدونية (451 م) تسبب في الانشقاق الكنسي الأول."],
    quote: "المجامع لا تنشئ عقيدة بل تشرح وتفسر وتوثق.",
    image: councilsImg,
    color: "from-purple-500 to-purple-700",
    glowColor: "rgba(139,92,246,0.35)",
    accent: "purple", icon: <BookOpen size={22} />,
  },
  {
    id: "golden", title: "العصر الذهبي للكنيسة: الإمبراطور قسطنطين ونهاية الاضطهاد", dates: "313 - القرن السادس م",
    intro: "بعد قرون من الدماء والاضطهاد في الساحات الرومانية, أشرقت شمس الحرية على الكنيسة لتبدأ «العصر الذهبي». في القرنين الرابع والخامس، تحولت المسيحية من ديانة مضطهدة إلى ديانة معترف بها عالمياً، لتتفرغ الكنيسة لنهضتها الروحية، وبناء كنائسها، وتثبيت دعائم إيمانها.",
    overview: "يغطي هذا العصر بشكل رئيسي الفترة من القرن الرابع وحتى السادس الميلادي. بدأ هذا العصر المجيد بانتهاء عصور الاستشهاد الدموية، وتحديداً مع وصول الإمبراطور قسطنطين الكبير إلى الحكم، والذي أنهى نضالاً مريراً ضد الوثنية. بإصدار «مرسوم ميلاو» سنة 313 م، خرجت الكنيسة من المخابئ إلى النور، وأصبحت المسيحية ديانة معترفاً بها.",
    events: [
      { year: "313 م", text: "إصدار الإمبراطور قسطنطين «مرسوم ميلاو» الذي أعطى الحرية الدينية وأقر المسيحية ديانة معترفاً بها." },
      { year: "اكتشاف الصليب", text: "إرسال الإمبراطور قسطنطين لوالدته الملكة هيلانة إلى أورشليم (بيت المقدس) حيث اكتشفت الصليب المقدس." },
      { year: "إعادة بناء الكنائس", text: "البدء في إعمار وبناء الكنائس التي هُدمت خلال عصور الاضطهاد السابقة، وإعطاء امتيازات واسعة لرجال الدين." },
      { year: "380 م", text: "أصدر الإمبراطور ثيؤدوسيوس مرسوماً إمبراطورياً يعلن فيه أن المسيحية هي الديانة الرسمية للإمبراطورية الرومانية." },
    ],
    challenges: "رغم الحرية الظاهرية، واجه العصر الذهبي تحديات خطيرة. أبرزها محاولة الإمبراطور «يوليانوس الجاحد» (361 - 363 م) إرجاع الوثنية وإسقاط المسيحية، لكنه قُتل وانتهت محاولته. كما عانت الكنيسة من «الاضطهاد الآريوسي»، حيث تبنى بعض الأباطرة، مثل «فالنس»، بدعة آريوس واضطهدوا المسيحيين الأرثوذكس المتمسكين بإيمان مجمع نيقية.",
    figures: [
      { name: "الإمبراطور قسطنطين الكبير", desc: "بطل هذا العصر سياسياً؛ وضع حداً للاضطهاد، وأصدر مرسوم التسامح الديني، ودعا لانعقاد المجمع المسكوني الأول بنيقية." },
      { name: "الملكة هيلانة", desc: "والدة الإمبراطور قسطنطين، وصاحبة الفضل في اكتشاف الصليب المقدس في أورشليم." },
      { name: "الآباء الكبادوك", desc: "القديس باسيليوس الكبير، القديس غريغوريوس أسقف نيصص، والقديس غريغوريوس النزينزي؛ كوّنوا مدرسة لاهوتية عظيمة، وثبّتوا عقيدة نيقية، وحاربوا الهرطقة الآريوسية بقوة." },
      { name: "الإمبراطور ثيؤدوسيوس", desc: "جعل المسيحية الديانة الرسمية والوحيدة للإمبراطورية الرومانية." },
    ],
    impact: "يُعد هذا العصر بمثابة «مرحلة التمكين»؛ ففيه نال إيمان نيقية نصراً ساحقاً، وازدهرت الحياة الكنسية علناً. أُعطيت للكنائس حقوق كثيرة، وجُعل يوم الأحد إجازة رسمية، وبدأ الأساقفة ينتقلون في عربات الحكام. كما شجع هذا العصر على ظهور المدارس اللاهوتية القوية وتأسيس حركة الرهبنة التي أضاءت العالم.",
    highlights: ["صدور «مرسوم ميلاو» عام 313 م واعتراف الإمبراطورية بالمسيحية.", "اكتشاف الصليب المقدس على يد الملكة هيلانة.", "تحول المسيحية لاحقاً لتصبح الديانة الرسمية للدولة الرومانية.", "انتصار الإيمان الأرثوذكسي وسقوط الهرطقة الآريوسية بفضل جهود الآباء الكبادوك.", "انتقال الكنيسة من عصر الاستشهاد الدموي إلى عصر البناء والنهضة اللاهوتية."],
    quote: "ونال إيمان نيقية نصراً ساحقاً وسقطت الآريوسية.",
    image: goldenImg,
    color: "from-yellow-500 to-yellow-700",
    glowColor: "rgba(234,179,8,0.35)",
    accent: "yellow", icon: <Crown size={22} />,
  },
  {
    id: "schism", title: "عصر الانقسام الكنسي ودخول الإسلام مصر: تاريخ وأحداث", dates: "451 - 641 م",
    intro: "يُمثل هذا العصر نقطة تحول قاسية في تاريخ المسيحية، حيث انشق جسد الكنيسة الواحد لأول مرة. عانت الكنيسة القبطية في هذه الحقبة من اضطهاد مرير ليس من الوثنيين، بل من إخوة الإيمان، مما مهد الطريق لتغيير جذري في تاريخ مصر بدخول العرب وبداية حقبة جديدة كلياً.",
    overview: "يبدأ هذا العصر في عام 451 م عقب انعقاد «مجمع خلكيدونية»، وهو المجمع الذي رفضته الكنيسة القبطية، مما أدى إلى انشقاق الكنيسة المسيحية إلى شطرين: خلكيدونيين (كاثوليك/روم) وغير خلكيدونيين (أرثوذكس). وينتهي هذا العصر بدخول العرب المسلمين إلى مصر عام 641 م.",
    events: [
      { year: "451 م", text: "مجمع خلكيدونية وحدوث الانشقاق الكنسي الأول." },
      { year: "482 م", text: "إصدار الإمبراطور زينون «مرسوم الاتحاد» في محاولة للتقريب بين الكنائس." },
      { year: "630 م", text: "استرداد الإمبراطور هرقل لخشبة الصليب المقدس من الفرس." },
      { year: "640-641 م", text: "دخول العرب إلى مصر بقيادة عمرو بن العاص وسقوط الحكم الروماني." },
    ],
    challenges: "واجهت الكنيسة القبطية اضطهاداً عنيفاً من قياصرة القسطنطينية (الروم) الذين حاولوا إجبار الأقباط على قبول قرارات مجمع خلكيدونية بشتى الطرق. وصل الأمر إلى تعيين بطاركة من قِبل الملك عُرفوا بـ «الملكيين»، مما جعل في مصر بطريركين؛ أحدهما أرثوذكسي قبطي يختفي في الأديرة، والآخر ملكاني تدعمه قوة عسكرية.",
    figures: [
      { name: "البابا ديسقورس", desc: "بطل الأرثوذكسية الذي دافع عن الإيمان في مجمع خلكيدونية، وتحمل النفي والعزل رافضاً التفريط في عقيدته." },
      { name: "الإمبراطور هرقل", desc: "الإمبراطور الروماني الذي استرد الصليب من الفرس، وحاول دمج الطوائف، لكنه رفض التصالح مع العرب واستمر في محاربتهم حتى وفاته." },
      { name: "المقوقس", desc: "حاكم مصر الروماني الذي رأى قوة العرب، وفضّل دفع الجزية لهم معتبراً إياهم «قوم الموت» الذين أرسلهم الله." },
      { name: "عمرو بن العاص", desc: "القائد العربي الذي دخل مصر، وأعطى الأقباط أماناً على أنفسهم وأموالهم وكنائسهم مقابل دفع الجزية." },
    ],
    impact: "تسبب الانشقاق الخلكيدوني في إضعاف الكنيسة عالمياً. ومع دخول العرب، تخلص الأقباط أخيراً من سلطة الرومان وبطاركتهم (الملكيين). كما شهد هذا العصر بداية تراجع اللغة اليونانية وازدهار اللغة القبطية لفترة، قبل أن تبدأ حركة «تعريب الدواوين» التي أدت لاحقاً إلى ضعف اللغة القبطية.",
    highlights: ["حدوث أول انشقاق في الكنيسة المسيحية بسبب مجمع خلكيدونية عام 451 م.", "تعرض الأقباط لاضطهاد عنيف من الروم (الخلكيدونيين) لفرض عقيدتهم.", "وجود بطريركين في مصر في نفس الوقت (قبطي أرثوذكسي ورومي ملكاني).", "دخول العرب مصر عام 641 م وإنهاء الحكم الروماني."],
    quote: "وتخلص الأقباط من سلطة الرومان وبطاركة الروم (الملكيين).",
    image: islamicEntryImg,
    color: "from-green-500 to-green-700",
    glowColor: "rgba(20,184,166,0.35)",
    accent: "teal", icon: <Zap size={22} />,
  },
  {
    id: "islamic-crusades", title: "تاريخ الكنيسة القبطية في العصور الإسلامية والحروب الصليبية", dates: "641 - 1805 م",
    intro: "يمتد هذا العصر لقرون طويلة تعاقبت فيها الدول والخلافات الإسلامية على حكم مصر. لقد كانت فترة اختبار حقيقي لصمود الكنيسة القبطية؛ فبين فترات من التسامح والمشاركة في بناء الدولة، وفترات من الاضطهاد ودفع الضرائب الباهظة، أثبتت الكنيسة قدرتها العجيبة على البقاء وحفظ الإيمان.",
    overview: "تبدأ هذه الحقبة الزمنية الطويلة منذ دخول الإسلام مصر (عام 641 م)، وتشمل تاريخ الدول المتعاقبة: الأموية، العباسية، الفاطمية، الأيوبية، المماليك، والعثمانية، وصولاً إلى بداية حكم محمد علي باشا عام 1805 م.",
    events: [
      { year: "أواخر القرن الثامن", text: "بدء تعريب الدواوين في مصر في العهد الأموي، مما أدى إلى تراجع وضعف اللغة القبطية تدريجياً." },
      { year: "1095 - 1291 م", text: "الحروب الصليبية التي شنها الفرنجة على الشرق، والتي أثرت سلباً على مسيحيي الشرق." },
      { year: "1492 م", text: "استرداد إسبانيا للأندلس وسقوط مملكة غرناطة، آخر معاقل المسلمين هناك." },
      { year: "1517 م", text: "دخول السلطان سليم الأول مصر وبداية الاحتلال العثماني." },
    ],
    challenges: "تأرجحت حالة الأقباط بشدة في هذا العصر؛ ففي أوقات كثيرة واجهوا ضرائب باهظة (الجزية)، وهدم للكنائس، وإجباراً على ارتداء أزياء معينة مثل العمائم الزرقاء. كما كان للحروب الصليبية أثر سيء جداً، حيث اضطهد المسلمون مسيحيي الشرق ظناً منهم أنهم يؤيدون الصليبيين، بينما كان الصليبيون يضطهدون الأقباط لاختلافهم العقائدي.",
    figures: [
      { name: "أولاد العسال", desc: "عائلة قبطية برزت في العصر الأيوبي، نبغوا في اللغة العربية وحفظوا التراث القبطي بتأليف وتصحيح الكثير من الكتب اللاهوتية واللغوية." },
      { name: "صلاح الدين الأيوبي", desc: "مؤسس الدولة الأيوبية، والذي خاض حروباً طاحنة ضد الحملات الصليبية." },
      { name: "الحاكم بأمر الله", desc: "خليفة فاطمي شهد عصره أوامر قاسية ضد النصارى، رغم وجود روايات تشير إلى سماحه لاحقاً ببناء بعض الأديرة." },
    ],
    impact: "اضطرت الكنيسة للتأقلم مع واقع جديد. تلاشت اللغة القبطية كلغة تخاطب يومية وحلت محلها اللغة العربية، فانبرى علماء الأقباط لتأليف الكتب بالعربية لشرح الإيمان. ورغم الصعوبات, اعتمدت الحكومات الإسلامية المتعاقبة على الأقباط في إدارة الدواوين والحسابات لمهارتهم الفائقة وأمانتهم.",
    highlights: ["امتدت العصور الإسلامية من 641 م حتى 1805 م.", "تراجع اللغة القبطية أمام اللغة العربية بسبب تعريب الدواوين.", "وقوع مسيحيي الشرق بين فكي الكماشة إبان الحروب الصليبية (اضطهاد من المسلمين ومن الفرنجة).", "اعتماد الحكام على الأقباط في إدارة الشئون المالية للدولة لمهارتهم."],
    quote: "مرحلة الحروب الصليبية بالنسبة لمسيحيي الشرق كانت سيئة جداً لأن الاضطهاد كان مشتركاً.",
    image: islamicCrusadesImg,
    color: "from-orange-500 to-orange-700",
    glowColor: "rgba(168,162,158,0.25)",
    accent: "stone", icon: <Calendar size={22} />,
  },
  {
    id: "modern", title: "الكنيسة القبطية في العصر الحديث: عصر النهضة والإصلاح", dates: "1805 م - حتى اليوم",
    image: modernImg,
    intro: "تنفس الأقباط الصعداء مع بزوغ فجر «العصر الحديث»، حيث انقشعت غيوم التمييز والضرائب القديمة لتبدأ الكنيسة نهضة روحية وعلمية شاملة. إنه عصر الاستنارة، وتأسيس المدارس، والمشاركة الوطنية الفعالة، والذي أعاد للكنيسة القبطية مجدها ورونقها في قلب المجتمع المصري.",
    overview: "يبدأ العصر الحديث بتولي محمد علي باشا حكم مصر عام 1805 م، ويمتد إلى أيامنا المعاصرة. تميز هذا العصر بإلغاء التمييز بين الأقباط والمسلمين، ونشوء دولة مصرية مستقلة، مما أتاح للكنيسة فرصة التطور وبناء مؤسسات تعليمية وروحية قوية.",
    events: [
      { year: "1805 م", text: "تولي محمد علي باشا حكم مصر، وبدء رفع القوانين الجائرة عن الأقباط." },
      { year: "1855 م", text: "في عهد سعيد باشا, تم إلغاء «الجزية» نهائياً، وسُمح للأقباط بالدخول في الخدمة العسكرية." },
      { year: "نهضة البابا كيرلس الرابع", text: "إدخال أول مطبعة للكنيسة، وتأسيس مدارس للبنين والبنات." },
      { year: "1919 م", text: "قيام الحركة الوطنية والمطالبة باستقلال البلاد، حيث تلاحم الأقباط والمسلمون معاً." },
    ],
    challenges: "كان التحدي الأكبر في هذا العصر هو مواجهة «الإرساليات الأجنبية» (الكاثوليكية والبروتستانتية) التي دخلت مصر وحاولت جذب الأقباط إلى مذاهبها. واجهت الكنيسة هذا التحدي بالوعظ، وإصدار المنشورات، وإنشاء المدارس لتعليم وتثبيت أبناء الكنيسة في إيمانهم الأرثوذكسي.",
    figures: [
      { name: "محمد علي باشا", desc: "حاكم مصر الذي أسس الدولة الحديثة، وألغى القوانين الاستثنائية ضد الأقباط ورقّاهم في الوظائف." },
      { name: "البابا كيرلس الرابع (أبو الإصلاح)", desc: "رائد النهضة الحديثة، اهتم بالتعليم، واشترى مطبعة، وفتح مدارس، واهتم بالألحان الكنسية." },
      { name: "الأرشيدياكون حبيب جرجس", desc: "مؤسس «مدارس الأحد»، ورئيس الكلية الإكليريكية، والذي كان له فضل عظيم في نشر التعليم الديني." },
      { name: "المعلم غالي", desc: "رجل قبطي ذو كفاءة عالية، تقلّد أرفع المناصب المالية في عهد محمد علي باشا." },
    ],
    impact: "عاشت الكنيسة نهضة غير مسبوقة؛ فانتشرت «مدارس الأحد» لتعليم الأطفال، وأُسست «الكلية الإكليريكية» لتخريج الكهنة والوعاظ. اندمج الأقباط تماماً في نسيج الوطن سياسياً واجتماعياً وعسكرياً، وعاشوا في رغد وحرية لم يسبق لها مثيل في العصور السابقة.",
    highlights: ["إلغاء الجزية والسماح للأقباط بالخدمة في الجيش المصري.", "بدء النهضة التعليمية الكبرى على يد البابا كيرلس الرابع «أبو الإصلاح».", "تأسيس الكلية الإكليريكية ومدارس الأحد لتثبيت الإيمان.", "تلاحم المسلمين والأقباط في ثورة 1919 الوطنية.", "تصدي الكنيسة لحملات الإرساليات البروتستانتية والكاثوليكية."],
    quote: "وأصبح الأقباط الآن في رغد ونعيم وهم في راحة لم يفوزوا بمثلها في عصر من العصور.",
    color: "from-green-500 to-green-700",
    glowColor: "rgba(16,185,129,0.35)",
    accent: "emerald", icon: <Star size={22} />,
  },
];

export const globalTimeline = [
  { id: "hist-tl-34", year: "34 م", event: "تأسيس الكنيسة يوم العنصرة", color: "#3b82f6" },
  { id: "hist-tl-60", year: "60 م", event: "القديس مارمرقس يؤسس كنيسة الإسكندرية", color: "#10b981" },
  { id: "hist-tl-67", year: "67 م", event: "استشهاد القديس بطرس والقديس بولس في روما", color: "#ef4444" },
  { id: "hist-tl-284", year: "284 م", event: "اضطهاد دقلديانوس وبداية التقويم القبطي", color: "#dc2626" },
  { id: "hist-tl-313", year: "313 م", event: "مرسوم ميلاو ونهاية عصور الاضطهاد", color: "#eab308" },
  { id: "hist-tl-325", year: "325 م", event: "المجمع المسكوني الأول في نيقية", color: "#8b5cf6" },
  { id: "hist-tl-381", year: "381 م", event: "مجمع القسطنطينية يكمل قانون الإيمان", color: "#7c3aed" },
  { id: "hist-tl-431", year: "431 م", event: "مجمع أفسس برئاسة البابا كيرلس الكبير", color: "#6d28d9" },
  { id: "hist-tl-451", year: "451 م", event: "مجمع خلكيدونية والانشقاق الكنسي الأول", color: "#f97316" },
  { id: "hist-tl-641", year: "641 م", event: "دخول العرب مصر وبداية الحقبة الإسلامية", color: "#14b8a6" },
  { id: "hist-tl-1095", year: "1095 م", event: "بداية الحروب الصليبية وأثرها على مسيحيي الشرق", color: "#a8a29e" },
  { id: "hist-tl-1805", year: "1805 م", event: "محمد علي باشا وبداية العصر الحديث للأقباط", color: "#10b981" },
];

const facts = [
  { icon: <Sword size={48} />, stat: "10 موجات", description: "من الاضطهاد الروماني واجهتها الكنيسة بصبر الشهداء" },
  { icon: <BookOpen size={48} />, stat: "4 مجامع", description: "مسكونية صاغت قانون الإيمان: نيقية والقسطنطينية وأفسس وخلكيدونية" },
  { icon: <Heart size={48} />, stat: "مهد الرهبنة", description: "مصر هي مهد الرهبنة المسيحية في العالم" },
];

export function HistoryPage() {

  return (
    <PageWrapper className="min-h-screen bg-white overflow-hidden" dir="rtl">
      <section className="hp-hero relative min-h-[55vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[92vh] py-16 sm:py-24 flex items-center overflow-hidden bg-gradient-to-br from-stone-950 via-orange-950 to-amber-900">
        <div className="hp-hero-bg absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src="/image/ChatGPT Image Sep 11, 2026, 02_51_56 AM.png"
              alt="Hero"
              className="w-full h-full object-cover object-center opacity-80"
            />
          </motion.div>
          <div className="hp-depth-soft absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="hp-depth-strong absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-200/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950/65 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            className="hp-hero-kicker inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 mb-8 text-sm sm:text-base text-yellow-200 backdrop-blur-sm"
          >
            <Star size={18} />
            رحلة الإيمان عبر التاريخ
          </motion.div>
          <motion.h1
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="hp-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-bold leading-tight drop-shadow-2xl"
          >
            تاريخ الكنيسة القبطية
          </motion.h1>
          <motion.p
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="hp-hero-copy text-lg sm:text-xl md:text-2xl text-yellow-200 max-w-4xl mx-auto leading-relaxed"
          >
            ألفا عام من الإيمان والشهادة والصمود
          </motion.p>
        </div>
      </section>

      <section className="hp-era-overview-section py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-section-head text-center mb-14"
          >
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 text-red-900 font-bold">العصور التاريخية</h2>
            <p className="hp-section-copy text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              ثمانية عصور تروي ملحمة إيمان لا تنتهي.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-era-overview-track grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {eras.map((era) => (
              <motion.a
                key={era.id}
                href={`#${era.id}`}
                onClick={() => trackTimelineEraSelected(era.title, 'history')}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="hp-era-card group rounded-2xl p-5 sm:p-6 bg-white border border-gray-100 shadow-md transition-all block"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${era.color} mb-4 transition-transform`}>
                  {era.icon}
                </div>
                <div className="font-bold text-base sm:text-lg text-gray-800 leading-snug">{era.title}</div>
                <div className="text-xs sm:text-sm text-red-700 mt-2">{era.dates}</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            onViewportEnter={() => trackTimelineOpen('history')}
            viewport={viewportConfig}
            className="hp-section-head text-center mb-16"
          >
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 text-red-900 font-bold">الخط الزمني</h2>
            <p className="hp-section-copy text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">أبرز المحطات عبر التاريخ.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-global-timeline max-w-4xl mx-auto relative"
          >
            <div className="hidden sm:block absolute right-28 top-0 bottom-0 w-px bg-gradient-to-b from-red-900/0 via-red-800/30 to-orange-900/0" />
            {globalTimeline.map((item) => (
              <motion.div
                id={item.id}
                key={`${item.year}-${item.event}`}
                variants={staggerItem}
                className="hp-tl-item flex items-start gap-3 sm:gap-4 mb-6 transition-all"
              >
                <div className="flex-shrink-0 w-16 sm:w-24 text-left text-xs sm:text-base font-bold text-red-700">{item.year}</div>
                <div className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 mt-1 sm:mt-1.5 rounded-full ring-4 ring-white shadow-lg" style={{ backgroundColor: item.color }} />
                <div className="flex-1 rounded-2xl bg-white p-3 sm:p-5 shadow-lg text-sm sm:text-base text-gray-700 leading-relaxed">{item.event}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {eras.map((era, eraIndex) => (
        <section
          key={era.id}
          id={era.id}
          data-era-id={era.id}
          className={`hp-era-section relative overflow-hidden ${eraIndex % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-slate-50 to-stone-100"}`}
        >
          <div className="pointer-events-none absolute left-4 top-6 text-7xl sm:text-8xl lg:text-9xl font-bold leading-none text-red-900/5">
            {eraIndex + 1 < 10 ? `0${eraIndex + 1}` : eraIndex + 1}
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            onViewportEnter={() => trackSectionView(era.title, 'history')}
            viewport={viewportConfig}
            className="container mx-auto px-4 py-16 sm:py-24 relative z-10"
          >
            <motion.article
              variants={staggerItem}
              className={`hp-era-intro-card hp-era-card flex flex-col ${eraIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden transition-all`}
            >
              {era.image && (
                <div className="hp-image-wrap relative w-full lg:w-4/12 overflow-hidden bg-gray-100 aspect-video lg:aspect-auto lg:min-h-[34rem]">
                  <ImageWithFallback
                    src={era.image}
                    alt={era.title}
                    className="hp-era-image absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="w-full lg:w-8/12 p-5 sm:p-10 lg:p-12">
                <div className={`hp-era-intro-motion inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-5 text-white bg-gradient-to-br ${era.color}`}>
                  {era.icon}
                  <span className="text-sm font-bold">{era.dates}</span>
                </div>
                <h2 className="hp-era-intro-motion text-3xl sm:text-4xl md:text-5xl mb-5 text-red-900 font-bold leading-tight">{era.title}</h2>
                <p className="hp-era-intro-motion text-base sm:text-lg text-gray-700 leading-relaxed mb-4">{era.intro}</p>
                <p className="hp-era-intro-motion text-sm sm:text-base text-gray-600 leading-relaxed">{era.overview}</p>
              </div>
            </motion.article>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportConfig}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"
            >
              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="hp-body-block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl mb-5 text-red-800 font-bold">أهم الأحداث</h3>
                <div className="space-y-4">
                  {era.events.map((event) => (
                    <div key={`${era.id}-${event.year}-${event.text}`} className="hp-event-row flex gap-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <span className="flex-shrink-0 text-sm font-bold text-red-700">{event.year}</span>
                      <p className="text-gray-700 leading-relaxed">{event.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="hp-body-block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl mb-5 text-red-800 font-bold">الشخصيات المؤثرة</h3>
                <div className="space-y-4">
                  {era.figures.map((figure) => (
                    <div key={`${era.id}-${figure.name}`} className="hp-figure-row flex gap-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${era.color}`}>
                        <Users size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 mb-1">{figure.name}</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{figure.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="hp-body-block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl mb-4 text-red-800 font-bold">التحديات والصراعات</h3>
                <p className="text-gray-700 leading-relaxed">{era.challenges}</p>
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="hp-body-block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl mb-4 text-red-800 font-bold">تأثير العصر على الكنيسة</h3>
                <p className="text-gray-700 leading-relaxed">{era.impact}</p>
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="hp-body-block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-xl sm:text-2xl mb-5 text-red-800 font-bold">أبرز النقاط</h3>
                <ul className="space-y-3">
                  {era.highlights.map((point) => (
                    <li key={`${era.id}-${point}`} className="hp-highlight-row flex items-start gap-3 text-gray-700 leading-relaxed">
                      <ChevronLeft size={18} className="mt-1 flex-shrink-0 text-red-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-red-900 to-red-700 rounded-3xl shadow-xl p-8 sm:p-10 text-white"
              >
                <div className="text-5xl leading-none mb-4 text-yellow-200">"</div>
                <p className="text-lg sm:text-xl leading-relaxed text-yellow-100">{era.quote}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      ))}

      <section className="py-16 sm:py-24 bg-gradient-to-r from-red-800 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="hp-section-head text-center mb-12"
          >
            <h2 className="hp-section-title text-3xl sm:text-4xl md:text-5xl mb-4 font-bold">حقائق تاريخية مهمة</h2>
            <p className="hp-section-copy text-base sm:text-lg text-yellow-100 max-w-2xl mx-auto">
              أرقام ومعان تلخص بعض ملامح الحضور القبطي في التاريخ.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {facts.map((fact) => (
              <motion.div
                key={fact.stat}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="hp-fact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 group"
              >
                <div className="mb-4 text-yellow-400 transform group-hover:scale-110 transition-transform">{fact.icon}</div>
                <h3 className="text-2xl sm:text-3xl mb-3 font-bold">{fact.stat}</h3>
                <p className="text-lg text-yellow-100 leading-relaxed">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
