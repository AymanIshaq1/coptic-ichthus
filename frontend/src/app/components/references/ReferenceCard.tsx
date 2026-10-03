import { BookOpen, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Reference } from "@/lib/referencesData";

interface ReferenceCardProps {
  reference: Reference;
  isAdmin: boolean;
  onEdit: (ref: Reference) => void;
  onDelete: (ref: Reference) => void;
}

export function ReferenceCard({ reference, isAdmin, onEdit, onDelete }: ReferenceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(reference)}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="تعديل"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(reference)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="حذف"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-2">
            {reference.category}
          </span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{reference.title}</h3>
          <p className="text-sm text-slate-500">{reference.author}</p>
        </div>

        {reference.description && (
          <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed flex-grow">
            {reference.description}
          </p>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl font-medium transition-all group/btn"
        >
          <span>قراءة الكتاب</span>
          <ExternalLink size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
        </a>
      </div>
    </div>
  );
}
