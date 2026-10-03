import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reference } from "@/lib/referencesData";

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ref: Omit<Reference, "id" | "isDefault"> | Reference) => void;
  editingRef?: Reference;
}

export function ReferenceModal({ isOpen, onClose, onSave, editingRef }: ReferenceModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("تاريخ الكنيسة");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (editingRef) {
        setTitle(editingRef.title);
        setAuthor(editingRef.author);
        setCategory(editingRef.category);
        setUrl(editingRef.url);
        setDescription(editingRef.description || "");
      } else {
        setTitle("");
        setAuthor("");
        setCategory("تاريخ الكنيسة");
        setUrl("");
        setDescription("");
      }
      setErrors({});
      // Focus first input on open
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [isOpen, editingRef]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "اسم الكتاب مطلوب";
    if (!author.trim()) newErrors.author = "اسم المؤلف مطلوب";
    if (!url.trim()) {
      newErrors.url = "رابط الكتاب مطلوب";
    } else {
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          newErrors.url = "يجب إدخال رابط صحيح يبدأ بـ http:// أو https://";
        }
      } catch (e) {
        newErrors.url = "يجب إدخال رابط صحيح يبدأ بـ http:// أو https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (editingRef) {
        onSave({
          ...editingRef,
          title: title.trim(),
          author: author.trim(),
          category,
          url: url.trim(),
          description: description.trim(),
        });
      } else {
        onSave({
          title: title.trim(),
          author: author.trim(),
          category,
          url: url.trim(),
          description: description.trim(),
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
              dir="rtl"
            >
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-slate-50">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {editingRef ? "تعديل مرجع" : "إضافة مرجع جديد"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 md:p-6 flex-grow">
                <form id="reference-form" onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">اسم الكتاب <span className="text-red-500">*</span></label>
                    <input
                      ref={titleRef}
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-500'}`}
                      placeholder="أدخل اسم الكتاب"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">المؤلف <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.author ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-500'}`}
                      placeholder="أدخل اسم المؤلف"
                    />
                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">التصنيف <span className="text-red-500">*</span></label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-shadow bg-white"
                    >
                      <option value="تاريخ الكنيسة">تاريخ الكنيسة</option>
                      <option value="اللاهوت والعقيدة">اللاهوت والعقيدة</option>
                      <option value="الكنيسة القبطية الأرثوذكسية">الكنيسة القبطية الأرثوذكسية</option>
                      <option value="دراسات كنسية">دراسات كنسية</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">رابط الكتاب <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.url ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-500'}`}
                      placeholder="https://example.com/book"
                      dir="ltr"
                    />
                    {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">وصف مختصر (اختياري)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-shadow resize-none"
                      placeholder="أدخل وصفاً مختصراً للكتاب..."
                    ></textarea>
                  </div>

                </form>
              </div>

              <div className="p-4 md:p-6 border-t border-gray-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  form="reference-form"
                  className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-sm"
                >
                  {editingRef ? "حفظ التعديلات" : "إضافة المرجع"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
