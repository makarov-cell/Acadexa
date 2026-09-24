import { useState } from 'react';
import {
  Bell,
  AlertCircle,
  AlertTriangle,
  Info,
  Calendar,
  FileText,
  Plus,
  X,
  Check,
  Download,
} from 'lucide-react';
import { Notice, UserRole } from '../../types.ts';

interface NoticesViewProps {
  notices: Notice[];
  activeRole: UserRole;
  onAddNotice: (notice: Notice) => void;
}

export function NoticesView({ notices, activeRole, onAddNotice }: NoticesViewProps) {
  const [filterAudience, setFilterAudience] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  // New notice form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState<Notice['priority']>('important');
  const [newAudience, setNewAudience] = useState<Notice['targetAudience']>('All');
  const [newExpiry, setNewExpiry] = useState('2026-10-31');
  const [newAttachment, setNewAttachment] = useState('');

  const filteredNotices = notices.filter((n) => {
    const matchAudience = filterAudience === 'All' || n.targetAudience === 'All' || n.targetAudience === filterAudience;
    const matchPriority = filterPriority === 'all' || n.priority === filterPriority;
    return matchAudience && matchPriority;
  });

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const notice: Notice = {
      id: `not_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      content: newContent,
      priority: newPriority,
      targetAudience: newAudience,
      publishDate: 'Sep 24, 2026',
      expiryDate: newExpiry,
      authorName: activeRole === 'admin' ? 'Principal Office' : 'Dr. Sarah Jenkins',
      authorRole: activeRole === 'admin' ? 'Administration' : 'Faculty',
      attachmentName: newAttachment ? newAttachment : undefined,
    };

    onAddNotice(notice);
    setIsPublishOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const getPriorityBadge = (priority: Notice['priority']) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Urgent</span>
          </span>
        );
      case 'important':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Important</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            <Info className="w-3 h-3 text-slate-500" />
            <span>Normal</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Notices & Bulletins
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official administrative datesheets, academic events, and emergency announcements.
          </p>
        </div>

        {(activeRole === 'admin' || activeRole === 'teacher') && (
          <button
            onClick={() => setIsPublishOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {['All', 'Students', 'Teachers', 'Grade 10'].map((aud) => (
            <button
              key={aud}
              onClick={() => setFilterAudience(aud)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterAudience === aud
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Audience: {aud}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {[
            { id: 'all', label: 'All Priority' },
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'normal', label: 'Normal' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setFilterPriority(p.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg cursor-pointer ${
                filterPriority === p.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getPriorityBadge(notice.priority)}
                <span className="text-xs text-slate-500">
                  Target: <strong>{notice.targetAudience}</strong>
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-xs text-slate-500">
                  Published by {notice.authorName} ({notice.authorRole})
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                {notice.publishDate}
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{notice.title}</h3>

            <p className="text-xs text-slate-700 leading-relaxed max-w-4xl">
              {notice.content}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-mono">Valid until: {notice.expiryDate}</span>
              </div>

              {notice.attachmentName && (
                <button
                  onClick={() => alert(`Downloading notice circular: ${notice.attachmentName}`)}
                  className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Attachment ({notice.attachmentName})</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Publish Notice Modal */}
      {isPublishOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Publish Official Bulletin</h3>
              <button
                onClick={() => setIsPublishOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Annual Science Symposium"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="All">All School (Staff & Students)</option>
                    <option value="Students">Students Only</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Grade 10">Grade 10 Cohort</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide complete details, venue, time, and instructions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Circular_Schedule_2026.pdf"
                  value={newAttachment}
                  onChange={(e) => setNewAttachment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPublishOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Broadcast Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
