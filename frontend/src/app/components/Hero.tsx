import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Book, Church, Users, Scroll, Sparkles, Award, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { staggerContainer, staggerItem, fadeUp, hoverButton, viewportConfig } from "@/lib/animations";

export function Hero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax effect

  const features = [
    {
      icon: <Book size={40} />,
      title: "التاريخ",
      description: "ألفي عام من الإيمان والتراث",
      page: "history",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Church size={40} />,
      title: " الطقس الكنسي",
      description: "احتفالات وصلوات قديمة",
      page: "liturgy",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Users size={40} />,
      title: "القديسون",
      description: "أعمدة الإيمان والشهادة",
      page: "saints",
      color: "from-green-500 to-green-700"
    },
    {
      icon: <Scroll size={40} />,
      title: "اللاهوت",
      description: "عقيدة راسخة ومتوارثة",
      page: "teachings",
      color: "from-red-500 to-red-700"
    },
    {
      icon: <Sparkles size={40} />,
      title: "الفن القبطي",
      description: "إبداع روحاني فريد",
      page: "art",
      color: "from-pink-500 to-pink-700"
    },
    {
      icon: <Heart size={40} />,
      title: "الكتاب المقدس",
      description: "كلمة الله الحية",
      page: "bible",
      color: "from-rose-500 to-rose-700"
    }
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
        <motion.div style={{ y }} className="absolute inset-0">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="w-full h-full bg-slate-950"
          >
          <ImageWithFallback
  src="https://images.unsplash.com/photo-1597212560167-6cf12ea77252?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1920"
  alt="الكنيسة القبطية"
  className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
/>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-orange-900/30"></div>
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-10">
          <div className="mb-4 md:mb-8">
            <motion.div 
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block p-3 md:p-4 bg-yellow-500/20 rounded-full backdrop-blur-sm border-2 border-yellow-400 mb-4 md:mb-6"
            >
              <Church className="text-yellow-400 w-10 h-10 md:w-16 md:h-16" />
            </motion.div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 font-bold leading-tight"
          >
            الكنيسة القبطية الأرثوذكسية
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 text-yellow-200"
          >
            كنيسة مصر الرسولية
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            رحلة عبر ألفي عام من الإيمان والشهادة والتراث المسيحي العريق
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center"
          >
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={hoverButton}
              onClick={() => navigate("/history")}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-bold shadow-2xl transition-colors min-h-[44px]"
            >
              اكتشف التاريخ
            </motion.button>
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={hoverButton}
              onClick={() => navigate("/saints")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-bold shadow-2xl transition-colors min-h-[44px]"
            >
              القديسون
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-900 to-orange-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
          >
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="p-4 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">2000+</div>
              <div className="text-sm sm:text-base md:text-xl">سنة من التاريخ</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="p-4 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">1000+</div>
              <div className="text-sm sm:text-base md:text-xl">قديس وشهيد</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="p-4 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">20+</div>
              <div className="text-sm sm:text-base md:text-xl">مليون قبطي</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="p-4 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">100+</div>
              <div className="text-sm sm:text-base md:text-xl">دير قبطي</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 text-red-900 font-bold">استكشف الكنيسة القبطية</h2>
            <p className="text-lg md:text-2xl text-gray-600">تعرف على تاريخنا وتراثنا الروحي الغني</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.button
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                onClick={() => navigate(`/${feature.page}`)}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-xl transition-colors overflow-hidden w-full text-right"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="text-white scale-75 md:scale-100">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl mb-2 md:mb-3 text-gray-800 font-bold">{feature.title}</h3>
                <p className="text-gray-600 text-base md:text-lg">{feature.description}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-800 to-orange-800 text-white">
        <motion.div 
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl md:text-8xl text-yellow-400 mb-2 md:mb-6 leading-none">"</div>
            <p className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 leading-relaxed font-semibold">
              كنيسة الشهداء التي روت بدمائها أرض مصر، وأنارت بإيمانها العالم أجمع
            </p>
            <div className="w-16 md:w-24 h-1 bg-yellow-400 mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-xl text-yellow-200">الكنيسة القبطية الأرثوذكسية</p>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
