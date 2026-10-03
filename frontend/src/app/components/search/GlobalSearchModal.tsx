import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Clock, Flame, Book, Users, Star, Paintbrush, Church, FileText, Cross } from "lucide-react";
import { useSearchContext } from "@/lib/search/SearchContext";
import { useSearch } from "@/lib/search/useSearch";
import { SearchResultType, SearchItem } from "@/lib/search/SearchIndex";
import { useNavigate } from "react-router-dom";
import { trackSearch } from "@/lib/analytics";

const TypeIcon = ({ type }: { type: SearchResultType }) => {
  const iconProps = { size: 16, className: "text-indigo-500" };
  switch (type) {
    case "era": return <Clock {...iconProps} />;
    case "figure": return <Users {...iconProps} />;
    case "event": return <Flame {...iconProps} />;
    case "article": return <FileText {...iconProps} />;
    case "art": return <Paintbrush {...iconProps} />;
    case "liturgy": return <Church {...iconProps} />;
    case "bible": return <Book {...iconProps} />;
    case "teaching": return <Star {...iconProps} />;
    case "saint": return <CrownIcon {...iconProps} />; // custom below
    case "martyr": return <Flame {...iconProps} className="text-red-500" />;
    case "symbol": return <Paintbrush {...iconProps} />;
    default: return <FileText {...iconProps} />;
  }
};

const CrownIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.956-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
    <path d="M5 21h14"/>
  </svg>
);

const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  
  const tokens = highlight.toLowerCase().split(/\s+/).filter(t => t.length > 0);
  const regex = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        tokens.some(t => part.toLowerCase() === t) ? 
          <mark key={i} className="bg-yellow-200 text-yellow-900 rounded-sm px-1 font-medium">{part}</mark> : 
          <span key={i}>{part}</span>
      )}
    </>
  );
};

export function GlobalSearchModal() {
  const { isOpen, closeSearch } = useSearchContext();
  const { query, setQuery, results, recentSearches, addRecentSearch, clearRecentSearches } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Debounced search query tracking
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    const timer = setTimeout(() => {
      trackSearch(trimmed, results.length);
    }, 800);
    return () => clearTimeout(timer);
  }, [query, results.length]);

  const handleSelect = (item: SearchItem) => {
    trackSearch(query || item.title, results.length);
    addRecentSearch(item.title);
    closeSearch();
    // Navigate with state to guarantee location.key/state change even if clicking the same path
    navigate(item.path, { state: { scrollTrigger: Date.now() } });
  };

  if (!isOpen) return null;

  const popularSearches = ["القديس أنطونيوس", "مار مرقس", "مجمع نيقية", "عصر الرهبنة", "لاهوت المسيح"];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6 bg-slate-900/60 backdrop-blur-md"
        onClick={closeSearch}
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-4 border-b border-gray-100 bg-white/50">
            <Search className="text-indigo-500 ml-3 shrink-0" size={24} />
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent text-xl text-gray-800 placeholder-gray-400 outline-none w-full"
              placeholder="ابحث عن العصور، القديسين، الأحداث، العقيدة..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 mr-4 border-r border-gray-200 pr-4">
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500 font-mono">ESC</kbd>
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {query.trim() === "" ? (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                        <Clock size={16} /> عمليات البحث الأخيرة
                      </h3>
                      <button onClick={clearRecentSearches} className="text-xs text-indigo-500 hover:text-indigo-700">
                        مسح السجل
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button key={i} onClick={() => setQuery(term)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <Flame size={16} className="text-orange-500" /> بحوث شائعة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, i) => (
                      <button key={i} onClick={() => setQuery(term)} className="px-3 py-1.5 border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-800 rounded-lg text-sm transition-colors">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                      selectedIndex === index ? "bg-indigo-50 border border-indigo-100 shadow-sm" : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedIndex === index ? "bg-white shadow-sm" : "bg-gray-100"}`}>
                      <TypeIcon type={item.type} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-base font-bold text-gray-900 mb-1">
                        <HighlightText text={item.title} highlight={query} />
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        <HighlightText text={item.description} highlight={query} />
                      </p>
                      <div className="mt-2 text-xs font-semibold text-indigo-600 bg-indigo-100/50 inline-block px-2 py-1 rounded-md">
                        {item.path.split("#")[0].replace("/", "") || "الرئيسية"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  عذراً، لم نتمكن من إيجاد ما تبحث عنه. حاول استخدام كلمات مفتاحية مختلفة.
                </p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4 hidden sm:flex">
              <span className="flex items-center gap-1"><kbd className="bg-white border px-1.5 py-0.5 rounded shadow-sm">↑</kbd><kbd className="bg-white border px-1.5 py-0.5 rounded shadow-sm">↓</kbd> للتنقل</span>
              <span className="flex items-center gap-1"><kbd className="bg-white border px-1.5 py-0.5 rounded shadow-sm">↵</kbd> للاختيار</span>
            </div>
            <div className="flex items-center gap-1 font-semibold">
              <span>Church History Search</span>
              <span className="text-indigo-500">✦</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
