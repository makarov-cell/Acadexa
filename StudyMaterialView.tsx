import { useState } from 'react';
import {
  BookOpen,
  FileText,
  Presentation,
  Video,
  FileSpreadsheet,
  Download,
  Bookmark,
  Share2,
  Plus,
  Search,
  Filter,
  Eye,
  X,
  Check,
} from 'lucide-react';
import { StudyResource, UserRole } from '../../types.ts';

interface StudyMaterialViewProps {
  resources: StudyResource[];
  activeRole: UserRole;
  selectedSubject: string;
  onSelectSubject: (sub: string) => void;
  onAddResource: (resource: StudyResource) => void;
  onToggleBookmark: (id: string) => void;
}

export function StudyMaterialView({
  resources,
  activeRole,
  selectedSubject,
  onSelectSubject,
  onAddResource,
  onToggleBookmark,
}: StudyMaterialViewProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewResource, setPreviewResource] = useState<StudyResource | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New resource upload state
  const [newTitle, setNewTitle] = useState('');
  const [newChapter, setNewChapter] = useState('');
  const [newSubject, setNewSubject] = useState(selectedSubject === 'All Subjects' ? 'Physics' : selectedSubject);
  const [newType, setNewType] = useState<StudyResource['resourceType']>('pdf');
  const [newDesc, setNewDesc] = useState('');

  const subjects = ['All Subjects', 'Physics', 'Mathematics', 'Chemistry', 'Computer Science'];
  const types = [
    { id: 'all', label: 'All Formats' },
    { id: 'pdf', label: 'PDF Handbooks' },
    { id: 'notes', label: 'Lecture Notes' },
    { id: 'presentation', label: 'Slide Decks' },
    { id: 'video', label: 'Video Lectures' },
    { id: 'worksheet', label: 'Worksheets' },
  ];

  const filteredResources = resources.filter((res) => {
    const matchSubject = selectedSubject === 'All Subjects' || res.subject === selectedSubject;
    const matchType = selectedType === 'all' || res.resourceType === selectedType;
    const matchQuery =
      searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchType && matchQuery;
  });

  const getFormatIcon = (type: StudyResource['resourceType']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-600" />;
      case 'presentation':
        return <Presentation className="w-4 h-4 text-amber-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-indigo-600" />;
      case 'worksheet':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const resource: StudyResource = {
      id: `res_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      description: newDesc || 'Standard departmental course material and problem solving guide.',
      subject: newSubject,
      grade: 'Grade 10',
      chapter: newChapter || 'General Unit',
      resourceType: newType,
      fileSize: '3.8 MB',
      authorName: activeRole === 'teacher' ? 'Dr. Sarah Jenkins' : 'Faculty Office',
      authorRole: 'Head of Department',
      uploadDate: 'Just Now',
      downloadCount: 0,
      tags: [newSubject, '2026-Curriculum'],
      bookmarked: false,
    };

    onAddResource(resource);
    setIsUploadOpen(false);
    setNewTitle('');
    setNewChapter('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Study Material Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Chapter-wise lecture notes, slide presentations, video lectures, and official reference e-books.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'admin') && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Material</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        {/* Subject Segmented Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectSubject(sub)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Secondary Filter: Search & Format */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by chapter, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <h3 className="text-sm font-semibold text-slate-700">No resources found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all group"
            >
              <div>
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-slate-700">{res.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{res.chapter}</span>
                  </div>
                  <button
                    onClick={() => onToggleBookmark(res.id)}
                    className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                    aria-label="Bookmark resource"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        res.bookmarked ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start gap-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0 mt-0.5">
                    {getFormatIcon(res.resourceType)}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {res.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {res.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600">{res.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{res.downloadCount} dl</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => {
                      alert(`Downloading "${res.title}" (${res.fileSize}) from secure institutional CDN.`);
                    }}
                    className="p-1.5 text-slate-600 hover:text-white hover:bg-indigo-600 rounded transition-colors cursor-pointer"
                    aria-label="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                {getFormatIcon(previewResource.resourceType)}
                <h3 className="text-sm font-bold truncate">{previewResource.title}</h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span>{previewResource.subject}</span>
                <span aria-hidden="true">·</span>
                <span>{previewResource.chapter}</span>
                <span aria-hidden="true">·</span>
                <span>Author: {previewResource.authorName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{previewResource.fileSize}</span>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
                <FileText className="w-12 h-12 text-indigo-600 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Verified Institutional Academic Document</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    {previewResource.description}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      alert(`Initiating verified download for ${previewResource.title}`);
                      setPreviewResource(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Material ({previewResource.fileSize})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal (Teacher / Admin) */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Upload Academic Resource</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 05: Optics & Wave Motion Handbook"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Format Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="pdf">PDF Handbook</option>
                    <option value="notes">Lecture Notes</option>
                    <option value="presentation">Slide Deck</option>
                    <option value="video">Video Lecture</option>
                    <option value="worksheet">Worksheet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chapter / Unit</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 04: Dynamics"
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  placeholder="Summary of formulas, laboratory derivations, and problems covered..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
