import {
  BookOpen,
  FileText,
  HelpCircle,
  Bell,
  Clock,
  ChevronRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Download,
} from 'lucide-react';
import {
  UserProfile,
  StudyResource,
  Assignment,
  Quiz,
  Notice,
  CalendarEvent,
} from '../../types.ts';

interface StudentDashboardProps {
  user: UserProfile;
  resources: StudyResource[];
  assignments: Assignment[];
  quizzes: Quiz[];
  notices: Notice[];
  events: CalendarEvent[];
  onNavigate: (view: string, itemId?: string) => void;
  onSelectSubject: (sub: string) => void;
}

export function StudentDashboard({
  user,
  resources,
  assignments,
  quizzes,
  notices,
  events,
  onNavigate,
  onSelectSubject,
}: StudentDashboardProps) {
  const pendingAssignments = assignments.filter((a) => a.studentStatus === 'pending');
  const activeQuizzes = quizzes.filter((q) => q.status === 'active' && q.studentScore === undefined);
  const recentResources = resources.slice(0, 4);
  const recentNotices = notices.slice(0, 3);

  const subjects = user.subjects || ['Physics', 'Mathematics', 'Chemistry', 'Computer Science'];

  return (
    <div className="space-y-6">
      {/* Welcome & Student Hero Bar */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>{user.grade} · {user.section}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Roll: {user.rollNumber}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            You have <strong className="text-amber-400">{pendingAssignments.length} pending assignments</strong> and <strong className="text-indigo-400">{activeQuizzes.length} upcoming quiz</strong> due this week.
          </p>
        </div>

        {/* Quick academic stats with tabular numbers */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</span>
            <div className="text-lg font-bold font-mono text-emerald-400">98.4%</div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">GPA Term II</span>
            <div className="text-lg font-bold font-mono text-white">3.92</div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Submissions</span>
            <div className="text-lg font-bold font-mono text-indigo-400">94%</div>
          </div>
        </div>
      </div>

      {/* Subject Quick Selector */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Enrolled Subjects & Quick Modules
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                onSelectSubject(sub);
                onNavigate('study_material');
              }}
              className="p-3 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                  {sub}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                View Notes & Tests
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* The 4 Core Widgets from the diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget 1: Upcoming Assignments */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Upcoming Assignments</span>
            </h3>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingAssignments.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                <span>All assignments turned in! Great job.</span>
              </div>
            ) : (
              pendingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => onNavigate('assignments', asg.id)}
                  className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="truncate mr-3">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{asg.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{asg.maxMarks} Marks</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {asg.title}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{asg.dueDate}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Widget 2: Upcoming Quizzes */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Upcoming Quizzes & MCQs</span>
            </h3>
            <button
              onClick={() => onNavigate('quizzes')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => onNavigate('quizzes', quiz.id)}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="truncate mr-3">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">{quiz.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{quiz.questions.length} MCQs</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                    {quiz.title}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {quiz.studentScore !== undefined ? (
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Score: {quiz.studentScore}/{quiz.totalMarks}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {quiz.timeLimitMinutes} Mins
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Recent Study Material */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Recent Study Material</span>
            </h3>
            <button
              onClick={() => onNavigate('study_material')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              Browse Library
            </button>
          </div>

          <div className="space-y-2.5">
            {recentResources.map((res) => (
              <div
                key={res.id}
                onClick={() => onNavigate('study_material')}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="truncate mr-3">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">{res.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase font-mono">{res.resourceType}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                    {res.title}
                  </div>
                </div>
                <div className="text-right shrink-0 text-[11px] font-mono text-slate-400">
                  {res.fileSize}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 4: Latest Notices */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-600" />
              <span>Latest Notices & Circulars</span>
            </h3>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              All Notices
            </button>
          </div>

          <div className="space-y-2.5">
            {recentNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => onNavigate('notices')}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold uppercase tracking-wider ${
                      notice.priority === 'urgent'
                        ? 'text-rose-700'
                        : notice.priority === 'important'
                        ? 'text-amber-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-slate-400 font-mono">{notice.publishDate}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {notice.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
