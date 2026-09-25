import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  HelpCircle,
  History,
  Bell,
  X,
  ArrowRight,
} from 'lucide-react';
import {
  StudyResource,
  Assignment,
  Quiz,
  PreviousYearQuestion,
  Notice,
} from '../../types.ts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: StudyResource[];
  assignments: Assignment[];
  quizzes: Quiz[];
  pyqs: PreviousYearQuestion[];
  notices: Notice[];
  onNavigateToItem: (view: string, itemId?: string) => void;
}

export function GlobalSearchModal({
  isOpen,
  onClose,
  resources,
  assignments,
  quizzes,
  pyqs,
  notices,
  onNavigateToItem,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');

  // Handle Cmd+K / Esc keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matches: Array<{
      id: string;
      title: string;
      category: string;
      type: 'resource' | 'assignment' | 'quiz' | 'pyq' | 'notice';
      subtext: string;
      targetView: string;
    }> = [];

    // Study resources
    resources.forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.chapter.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      ) {
        matches.push({
          id: r.id,
          title: r.title,
          category: `${r.subject} · ${r.chapter}`,
          type: 'resource',
          subtext: `${r.resourceType.toUpperCase()} · ${r.fileSize}`,
          targetView: 'study_material',
        });
      }
    });

    // Assignments
    assignments.forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.subject.toLowerCase().includes(q) ||
        a.instructions.toLowerCase().includes(q)
      ) {
        matches.push({
          id: a.id,
          title: a.title,
          category: `Assignment · ${a.subject}`,
          type: 'assignment',
          subtext: `Due: ${a.dueDate} · ${a.maxMarks} Marks`,
          targetView: 'assignments',
        });
      }
    });

    // Quizzes
    quizzes.forEach((qz) => {
      if (
        qz.title.toLowerCase().includes(q) ||
        qz.subject.toLowerCase().includes(q)
      ) {
        matches.push({
          id: qz.id,
          title: qz.title,
          category: `Quiz · ${qz.subject}`,
          type: 'quiz',
          subtext: `${qz.questions.length} MCQs · ${qz.timeLimitMinutes} Mins`,
          targetView: 'quizzes',
        });
      }
    });

    // PYQs
    pyqs.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.examType.toLowerCase().includes(q) ||
        p.year.toString().includes(q)
      ) {
        matches.push({
          id: p.id,
          title: p.title,
          category: `Past Paper · ${p.subject}`,
          type: 'pyq',
          subtext: `${p.examType} ${p.year} · ${p.fileSize}`,
          targetView: 'pyqs',
        });
      }
    });

    // Notices
    notices.forEach((n) => {
      if (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      ) {
        matches.push({
          id: n.id,
          title: n.title,
          category: `Notice · Priority: ${n.priority.toUpperCase()}`,
          type: 'notice',
          subtext: `Target: ${n.targetAudience} · Published ${n.publishDate}`,
          targetView: 'notices',
        });
      }
    });

    return matches.slice(0, 10);
  }, [query, resources, assignments, quizzes, pyqs, notices]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, assignments, quizzes, past papers, notices..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline font-mono text-[10px] px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 ml-2">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-10 text-center text-slate-400 text-xs">
              <Search className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <span>Type to search across all 8 academic modules in your school portal...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching resources found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item) => {
                const Icon =
                  item.type === 'resource'
                    ? BookOpen
                    : item.type === 'assignment'
                    ? FileText
                    : item.type === 'quiz'
                    ? HelpCircle
                    : item.type === 'pyq'
                    ? History
                    : Bell;
                return (
                  <button
                    key={`${item.type}_${item.id}`}
                    onClick={() => {
                      onNavigateToItem(item.targetView, item.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-start gap-3 truncate">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{item.subtext}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
