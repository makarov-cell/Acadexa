import { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  Compass,
  Plus,
  X,
  Search,
} from 'lucide-react';
import { ImportantLink, UserRole } from '../../types.ts';

interface LinksViewProps {
  links: ImportantLink[];
  activeRole: UserRole;
  onAddLink: (link: ImportantLink) => void;
}

export function LinksView({ links, activeRole, onAddLink }: LinksViewProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New link state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('https://');
  const [newCat, setNewCat] = useState<ImportantLink['category']>('Virtual Labs');
  const [newGrade, setNewGrade] = useState('Grades 9–12');
  const [newDesc, setNewDesc] = useState('');

  const categories = ['all', 'Virtual Labs', 'Mathematics', 'Digital Library', 'Research', 'Tools'];

  const filteredLinks = links.filter((lnk) => {
    return selectedCat === 'all' || lnk.category === selectedCat;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const link: ImportantLink = {
      id: `lnk_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      url: newUrl,
      category: newCat,
      targetGrade: newGrade,
      description: newDesc,
    };

    onAddLink(link);
    setIsAddOpen(false);
    setNewTitle('');
    setNewUrl('https://');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Curated Academic & Research Portals
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified external reference libraries, interactive HTML5 simulations, and STEM graphing calculators.
          </p>
        </div>

        {(activeRole === 'admin' || activeRole === 'teacher') && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Academic Portal</span>
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors capitalize cursor-pointer ${
              selectedCat === c
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c === 'all' ? 'All Portals' : c}
          </button>
        ))}
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {link.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{link.targetGrade}</span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {link.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {link.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                {link.url}
              </span>

              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-white hover:bg-slate-900 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Launch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Link Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Register Academic External Resource</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PhET Interactive Physics Simulations"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">External Portal URL</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Virtual Labs">Virtual Labs</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Digital Library">Digital Library</option>
                    <option value="Research">Research</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Cohort</label>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why students should utilize this external resource..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
