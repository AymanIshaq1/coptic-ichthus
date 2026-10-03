import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ichthysLogo from "@/image/ichthys-svgrepo-com.svg";
import { heroFadeScale, viewportConfig, hoverButton } from "@/lib/animations";
import { useSearchContext } from "@/lib/search/SearchContext";



interface HeaderProps {
  currentPage: string;
}

export function Header({ currentPage }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSearch } = useSearchContext();

  const navItems = [
    { id: "home", label: "الرئيسية" },
    { id: "history", label: "التاريخ" },
    { id: "teachings", label: "اللاهوت" },
    { id: "liturgy", label: "الطقس الكنسي" },
    { id: "art", label: "الهوية القبطية" },
    { id: "saints", label: "القديسون" },
    { id: "bible", label: "الكتاب المقدس" },
    { id: "references", label: "المراجع" }
  ];

  const handleClick = (page: string) => {
    navigate(`/${page === "home" ? "" : page}`);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={heroFadeScale}
      initial="hidden"
      animate="show"
      viewport={viewportConfig}
      className="bg-gradient-to-r from-red-900 via-red-800 to-orange-900 shadow-2xl sticky top-0 z-50 border-b-4 border-yellow-600"
    >
      <div className="container mx-auto px-4 py-3 md:py-5">
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 md:gap-4 cursor-pointer" 
            onClick={() => handleClick("home")}
          >
            <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0">
              <img
                src={ichthysLogo}
                alt="شعار السمكة المسيحية"
                className="h-full w-full object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl text-amber-400 font-serif font-semibold tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
  ΙΧΘΥΣ
</h1>
              <p className="text-yellow-200 text-xs sm:text-sm">يسوع المسيح ابن الله المخلص</p>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1 xl:gap-2 flex-wrap justify-end">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={heroFadeScale}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.05 }}
                className="inline-block"
              >
                <motion.button
                  onClick={() => handleClick(item.id)}
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverButton}
                  className={`relative px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base overflow-hidden group ${
                    currentPage === item.id
                      ? "bg-yellow-500 text-red-900 font-bold shadow-lg"
                      : "text-white hover:bg-red-700 hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {currentPage !== item.id && (
                    <motion.div 
                      variants={{
                        hover: { scaleX: 1, opacity: 1 }
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-1 left-2 right-2 h-0.5 bg-yellow-400 origin-center rounded-full"
                    />
                  )}
                </motion.button>
              </motion.div>
            ))}
            
            {/* Search Button (Desktop) */}
            <motion.button
              onClick={openSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 flex items-center justify-center p-2 rounded-lg bg-red-800 text-yellow-300 hover:bg-red-700 hover:text-white transition-colors"
              title="بحث (Ctrl+K)"
            >
              <Search size={20} />
            </motion.button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Search Button (Mobile) */}
            <motion.button
              onClick={openSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-yellow-300 bg-red-800 hover:bg-red-700 hover:text-white p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white bg-red-700 p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden flex flex-col gap-2 overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={heroFadeScale}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="inline-block"
                  >
                    <motion.button
                      onClick={() => handleClick(item.id)}
                      whileHover="hover"
                      whileTap="tap"
                      variants={hoverButton}
                      className={`px-4 py-3 rounded-lg text-right min-h-[44px] ${
                        currentPage === item.id
                          ? "bg-yellow-500 text-red-900 font-bold"
                          : "text-white bg-red-700 hover:bg-red-600"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
