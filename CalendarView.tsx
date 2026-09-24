import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Flag,
  Award,
  Sparkles,
  X,
} from 'lucide-react';
import { CalendarEvent, UserRole } from '../../types.ts';

interface CalendarViewProps {
  events: CalendarEvent[];
  activeRole: UserRole;
  onAddEvent: (event: CalendarEvent) => void;
}

export function CalendarView({ events, activeRole, onAddEvent }: CalendarViewProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New event form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-10-15');
  const [newTime, setNewTime] = useState('10:00');
  const [newCategory, setNewCategory] = useState<CalendarEvent['category']>('exam');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    { id: 'all', label: 'All Activities', color: 'bg-slate-800' },
    { id: 'exam', label: 'Examinations', color: 'bg-rose-500' },
    { id: 'assignment', label: 'Assignment Deadlines', color: 'bg-indigo-500' },
    { id: 'quiz', label: 'Online Quizzes', color: 'bg-amber-500' },
    { id: 'holiday', label: 'Holidays & Recess', color: 'bg-emerald-500' },
    { id: 'event', label: 'School Events', color: 'bg-purple-500' },
  ];

  const filteredEvents = events.filter((e) => {
    return filterCategory === 'all' || e.category === filterCategory;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const event: CalendarEvent = {
      id: `evt_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      date: newDate,
      time: newTime,
      category: newCategory,
      description: newDesc,
      targetGrade: 'All Grades',
    };

    onAddEvent(event);
    setIsAddOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getCategoryTag = (cat: CalendarEvent['category']) => {
    switch (cat) {
      case 'exam':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Exam</span>;
      case 'assignment':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">Assignment</span>;
      case 'quiz':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Quiz</span>;
      case 'holiday':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Holiday</span>;
      case 'event':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Event</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Master Academic Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized schedule for term examinations, assignment due dates, quiz cutoffs, and campus holidays.
          </p>
        </div>

        {(activeRole === 'admin' || activeRole === 'teacher') && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Calendar Event</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              filterCategory === c.id
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Agenda & Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Mini Month Visualizer */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">September – October 2026</h3>
            <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Term II
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <span key={idx} className="text-[11px] font-bold text-slate-400 py-1">
                {day}
              </span>
            ))}
            {/* Days placeholder representation */}
            {Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === 24;
              const hasEvent = [18, 20, 24, 26, 28, 30].includes(dayNum);

              return (
                <div
                  key={dayNum}
                  className={`p-2 rounded-lg text-xs font-mono transition-colors ${
                    isToday
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : hasEvent
                      ? 'bg-slate-100 text-slate-900 font-semibold border border-indigo-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span>Today: September 24, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-200"></span>
              <span>Highlighted dates contain scheduled assessments</span>
            </div>
          </div>
        </div>

        {/* Right: Chronological Timeline List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Upcoming Academic Timeline</span>
            <span className="text-xs text-slate-400 font-mono font-normal">
              {filteredEvents.length} events logged
            </span>
          </h3>

          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {getCategoryTag(evt.category)}
                    {evt.time && (
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{evt.time}</span>
                      </span>
                    )}
                    {evt.targetGrade && (
                      <>
                        <span className="text-slate-300" aria-hidden="true">·</span>
                        <span className="text-xs text-slate-500">{evt.targetGrade}</span>
                      </>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{evt.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                    {evt.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Schedule Calendar Entry</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Fair Presentation Judging"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="exam">Examination</option>
                    <option value="assignment">Assignment Deadline</option>
                    <option value="quiz">Online Quiz</option>
                    <option value="holiday">Holiday / Campus Recess</option>
                    <option value="event">School Activity / Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Time (Optional)</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Additional details regarding venues, instructions, or materials needed..."
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
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
