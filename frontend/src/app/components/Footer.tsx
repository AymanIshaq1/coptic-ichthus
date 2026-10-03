import { Cross, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUp, viewportConfig, hoverButton } from "@/lib/animations";

export function Footer() {
  const navigate = useNavigate();
  const quickLinks = [
    { id: "home", label: "الرئيسية" },
    { id: "history", label: "التاريخ" },
    { id: "teachings", label: "التعاليم" },
    { id: "liturgy", label: "الطقوس" },
    { id: "art", label: "الفن القبطي" },
    { id: "saints", label: "القديسون" },
    { id: "bible", label: "الكتاب المقدس" }
  ];

  const handleNavigation = (page: string) => {
    navigate(`/${page === "home" ? "" : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-red-950 via-red-900 to-orange-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12"
        >
          {/* About Section */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Cross className="text-red-900" size={24} strokeWidth={3} />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold">الكنيسة القبطية</h3>
            </div>
            <p className="text-yellow-100 leading-relaxed text-base sm:text-lg">
              كنيسة مصر الرسولية، تأسست على يد القديس مرقس الرسول في القرن الأول الميلادي. 
              كنيسة الشهداء والقديسين، منارة الإيمان الأرثوذكسي.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-bold text-yellow-400">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="text-yellow-100 hover:text-yellow-300 transition-all text-base sm:text-lg hover:mr-2"
                  >
                    ← {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div variants={staggerItem}>
            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-bold text-yellow-400">المزيد</h3>
            <ul className="space-y-3">
              {quickLinks.slice(5).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="text-yellow-100 hover:text-yellow-300 transition-all text-base sm:text-lg hover:mr-2"
                  >
                    ← {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Information */}
          <motion.div variants={staggerItem}>
            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-bold text-yellow-400">معلومات مهمة</h3>
            <div className="space-y-4 text-yellow-100 text-base sm:text-lg">
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <MapPin size={24} className="flex-shrink-0 mt-1 text-yellow-400" />
                <p>مصر - مهد المسيحية والرهبنة</p>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <Cross size={24} className="flex-shrink-0 mt-1 text-yellow-400" />
                <p>التقويم القبطي: يبدأ من عام 284 م (عام الشهداء)</p>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <Mail size={24} className="flex-shrink-0 mt-1 text-yellow-400" />
                <p>اللغة القبطية: آخر مراحل اللغة المصرية القديمة</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <div className="border-t border-yellow-600/30 pt-8 md:pt-12 mb-8 md:mb-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
          >
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">2000+</div>
              <div className="text-yellow-100 text-sm sm:text-base md:text-lg">سنة من التاريخ</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">118</div>
              <div className="text-yellow-100 text-sm sm:text-base md:text-lg">بطريرك</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-yellow-100 text-sm sm:text-base md:text-lg">دير قبطي</div>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">20M+</div>
              <div className="text-yellow-100 text-sm sm:text-base md:text-lg">قبطي حول العالم</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="border-t border-yellow-600/30 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-yellow-100 text-base sm:text-lg text-center md:text-right">
  © 2026  تحت إشراف إعداد خدام بكنيسة الشهيد مار جرجس والبابا ديسقورس بالخصوص
</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={hoverButton}
                onClick={() => handleNavigation("home")}
                className="px-6 py-2 bg-yellow-500 text-red-900 rounded-lg font-bold"
              >
                العودة للرئيسية
              </motion.button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-yellow-200 text-lg sm:text-xl italic">
              "وأما أنتم فجنس مختار، وكهنوت ملوكي، أمة مقدسة، شعب اقتناء"
            </p>
            <p className="text-yellow-300 mt-2 font-semibold">- 1 بطرس 2:9</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
