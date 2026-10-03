import { useState, useEffect } from "react";
import { Plus, RotateCcw, Search, ShieldAlert, ShieldCheck, Library } from "lucide-react";
import { motion } from "motion/react";
import { PageWrapper } from "@/app/components/ui/PageWrapper";
import { Reference, loadReferences, saveReferences, restoreDefaultReferences, getDeletedDefaultIds, saveDeletedDefaultIds } from "@/lib/referencesData";
import { ReferenceCard } from "../references/ReferenceCard";
import { ReferenceModal } from "../references/ReferenceModal";
import { heroFadeScale, viewportConfig, staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

const categories = ["الكل", "تاريخ الكنيسة", "اللاهوت والعقيدة", "الكنيسة القبطية الأرثوذكسية", "دراسات كنسية", "أخرى"];

export function ReferencesPage() {
  const [references, setReferences] = useState<Reference[]>(() => loadReferences());
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRef, setEditingRef] = useState<Reference | undefined>(undefined);

  // We don't strictly need this useEffect since we initialize synchronously now,
  // but keeping it ensures if another tab changes localStorage it could be updated later,
  // though for now synchronous init is the main fix.
  useEffect(() => {
    setReferences(loadReferences());
  }, []);

  const handleAddClick = () => {
    setEditingRef(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (ref: Reference) => {
    setEditingRef(ref);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (ref: Reference) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المرجع؟")) {
      if (ref.isDefault) {
        const deletedIds = getDeletedDefaultIds();
        if (!deletedIds.includes(ref.id)) {
          saveDeletedDefaultIds([...deletedIds, ref.id]);
        }
      }
      
      const newRefs = references.filter(r => r.id !== ref.id);
      setReferences(newRefs);
      saveReferences(newRefs);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("هل تريد استعادة جميع المراجع الافتراضية؟")) {
      const restored = restoreDefaultReferences();
      setReferences(restored);
    }
  };

  const handleSaveReference = (refData: Omit<Reference, "id" | "isDefault"> | Reference) => {
    if ("id" in refData) {
      // Edit mode
      const updatedRefs = references.map(r => r.id === refData.id ? { ...r, ...refData } : r);
      setReferences(updatedRefs);
      saveReferences(updatedRefs);
    } else {
      // Add mode
      const newRef: Reference = {
        ...refData,
        id: `usr-${Date.now()}`,
        isDefault: false
      };
      const newRefs = [...references, newRef];
      setReferences(newRefs);
      saveReferences(newRefs);
    }
    setIsModalOpen(false);
  };

  const filteredReferences = references.filter(ref => {
    const matchesSearch = searchQuery.trim() === "" ||
      (ref.title?.includes(searchQuery) || false) || 
      (ref.author?.includes(searchQuery) || false) || 
      (ref.description?.includes(searchQuery) || false);
    const matchesCategory = selectedCategory === "الكل" || ref.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative isolate flex min-h-[50vh] sm:min-h-[60vh] md:min-h-[72vh] items-center overflow-hidden bg-gradient-to-b from-stone-950 via-orange-950 to-amber-900 py-14 sm:py-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/ChatGPT Image Sep 11, 2026, 03_31_11 AM.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-orange-950/65" />
        <div className="absolute inset-0 z-10 opacity-25 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.18),transparent_50%)]" />
        <div className="container relative z-20 mx-auto px-4">
          <motion.div
            variants={heroFadeScale}
            initial="hidden"
            animate="show"
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-amber-400/15 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-amber-300/40">
              <Library className="text-amber-200 w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              المكتبة والمراجع
            </h1>
            <p className="text-lg md:text-xl text-amber-100/90 leading-relaxed max-w-2xl mx-auto">
              مجموعة منتقاة من الكتب والمراجع لدراسة تاريخ الكنيسة واللاهوت والطقوس.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-stone-100 min-h-screen">
        <div className="container mx-auto px-4">
          
          {/* Admin Toggle & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isAdmin ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {isAdmin ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                <span>إدارة المراجع</span>
              </button>
              
              {/* Note: This is just a UI toggle for demonstration. Real auth should be added with a backend. */}
            </div>

            {isAdmin && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0"
              >
                <button
                  onClick={handleAddClick}
                  className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  <Plus size={18} />
                  <span>إضافة مرجع</span>
                </button>
                <button
                  onClick={handleRestoreDefaults}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 hover:bg-orange-50 text-stone-700 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw size={18} />
                  <span>استعادة المراجع الافتراضية</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن كتاب، مؤلف، أو موضوع..."
                className="w-full pr-12 pl-4 py-4 rounded-2xl border-2 border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-stone-700 text-lg bg-white shadow-sm"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-sm md:text-base font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-red-800 text-white shadow-md shadow-red-800/20"
                      : "bg-white text-stone-600 hover:bg-orange-50 border border-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* References Grid */}
          {filteredReferences.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredReferences.map((ref) => (
                <motion.div key={ref.id} variants={staggerItem} className="h-full">
                  <ReferenceCard
                    reference={ref}
                    isAdmin={isAdmin}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm"
            >
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Library className="text-orange-500 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">لا توجد مراجع</h3>
              <p className="text-stone-500">جرب البحث بكلمات مختلفة أو تغيير التصنيف.</p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Modal */}
      <ReferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReference}
        editingRef={editingRef}
      />

    </PageWrapper>
  );
}
