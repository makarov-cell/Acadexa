import { useState } from 'react';
import {
  UploadCloud,
  FilePlus,
  HelpCircle,
  History,
  Bell,
  CheckSquare,
  BarChart3,
  Users,
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { UserProfile, StudyResource, Assignment, Quiz } from '../../types.ts';

interface TeacherDashboardProps {
  user: UserProfile;
  resources: StudyResource[];
  assignments: Assignment[];
  quizzes: Quiz[];
  onNavigate: (view: string) => void;
  selectedSubject: string;
  onSelectSubject: (sub: string) => void;
}

export function TeacherDashboard({
  user,
  resources,
  assignments,
  quizzes,
  onNavigate,
  selectedSubject,
  onSelectSubject,
}: TeacherDashboardProps) {
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Section A');

  const classes = ['Grade 10 - Section A', 'Grade 10 - Section B', 'Grade 12 - Section A'];
  const subjects = ['Physics', 'Advanced Optics', 'Science Laboratory'];

  const pendingSubmissionsCount = assignments.reduce(
    (acc, a) => acc + (a.totalSubmissions || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Teacher Header Bar */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-400 mb-1">
            {user.department}
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Faculty Command Center · {user.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Author and publish curriculum resources, evaluate student assignments, and monitor class mastery.
          </p>
        </div>

        {/* Selected Context */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6">
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Active Cohort
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-indigo-500 cursor-pointer"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Teaching Subject
            </label>
            <select
              value={selectedSubject === 'All Subjects' ? 'Physics' : selectedSubject}
              onChange={(e) => onSelectSubject(e.target.value)}
              className="text-xs bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-indigo-500 cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons (From Diagram: Choose Action) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Faculty Publishing Studio (Choose Action)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate('study_material')}
            className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="p-2 w-fit rounded-lg bg-indigo-50 text-indigo-600 mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
              Upload Material
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Notes, PDFs, Slides</div>
          </button>

          <button
            onClick={() => onNavigate('assignments')}
            className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 mb-2">
              <FilePlus className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
              Create Assignment
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Tasks & Deadlines</div>
          </button>

          <button
            onClick={() => onNavigate('quizzes')}
            className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="p-2 w-fit rounded-lg bg-amber-50 text-amber-600 mb-2">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
              Create Quiz
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Timed MCQs</div>
          </button>

          <button
            onClick={() => onNavigate('pyqs')}
            className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="p-2 w-fit rounded-lg bg-purple-50 text-purple-600 mb-2">
              <History className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
              Upload PYQs
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Past Exam Papers</div>
          </button>

          <button
            onClick={() => onNavigate('notices')}
            className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="p-2 w-fit rounded-lg bg-rose-50 text-rose-600 mb-2">
              <Bell className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
              Publish Notices
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Class Bulletins</div>
          </button>
        </div>
      </div>

      {/* Manage & Track Section (From Diagram: Manage & Track Submissions / Results / Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions in Queue */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Assignment Submissions Requiring Evaluation</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              {pendingSubmissionsCount} submissions logged
            </span>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-300 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                    <span className="text-slate-800 font-semibold">{asg.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>Due: {asg.dueDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{asg.maxMarks} pts</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">{asg.title}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="font-mono font-bold text-indigo-700">
                      {asg.totalSubmissions}
                    </span>
                    <span className="text-slate-400 font-mono"> / {asg.totalStudents}</span>
                    <div className="text-[10px] text-slate-400">Turned in</div>
                  </div>
                  <button
                    onClick={() => onNavigate('assignments')}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Analytics Snapshot */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Class Performance & Health</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="text-[11px] text-slate-500">Average Quiz Accuracy</div>
              <div className="text-xl font-bold font-mono text-slate-900">84.6%</div>
              <p className="text-[11px] text-emerald-600 font-medium">+6.2% over Term I</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="text-[11px] text-slate-500">Content Resource Downloads</div>
              <div className="text-xl font-bold font-mono text-slate-900">1,480</div>
              <p className="text-[11px] text-slate-500">Highest for Chapter 04 Dynamics</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="text-[11px] text-slate-500">Students at Risk (&lt;70%)</div>
              <div className="text-xl font-bold font-mono text-amber-700">2 Students</div>
              <p className="text-[11px] text-slate-500">Targeted review worksheet sent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
