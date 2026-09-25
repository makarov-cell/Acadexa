import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  History,
  Bell,
  Calendar,
  ExternalLink,
  Bookmark,
  UploadCloud,
  PlusCircle,
  CheckSquare,
  BarChart3,
  Users,
  GraduationCap,
  Layers,
  Settings,
  Shield,
  Building2,
  CreditCard,
  Sliders,
  LifeBuoy,
  X,
} from 'lucide-react';
import { UserRole } from '../../types.ts';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface SidebarProps {
  activeRole: UserRole;
  currentView: string;
  onSelectView: (view: string) => void;
  selectedSubject?: string;
  onSelectSubject?: (subject: string) => void;
  subjectsList?: string[];
  unreadNoticesCount: number;
  pendingAssignmentsCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  activeRole,
  currentView,
  onSelectView,
  selectedSubject,
  onSelectSubject,
  subjectsList = ['All Subjects', 'Physics', 'Mathematics', 'Chemistry', 'Computer Science'],
  unreadNoticesCount,
  pendingAssignmentsCount,
  isOpen,
  onClose,
}: SidebarProps) {
  const studentNav: NavItem[] = [
    { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'study_material', label: 'Study Material', icon: BookOpen },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: FileText,
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount} Pending` : undefined,
    },
    { id: 'quizzes', label: 'Quizzes & MCQs', icon: HelpCircle },
    { id: 'pyqs', label: 'Previous Year Papers', icon: History },
    {
      id: 'notices',
      label: 'School Notices',
      icon: Bell,
      badge: unreadNoticesCount > 0 ? `${unreadNoticesCount} New` : undefined,
    },
    { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
    { id: 'important_links', label: 'Important Links', icon: ExternalLink },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
  ];

  const teacherNav: NavItem[] = [
    { id: 'dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
    { id: 'study_material', label: 'Upload & Manage Material', icon: UploadCloud },
    { id: 'assignments', label: 'Assignments & Rubrics', icon: PlusCircle },
    { id: 'quizzes', label: 'MCQ Quiz Creator', icon: HelpCircle },
    { id: 'pyqs', label: 'Upload Past Papers', icon: History },
    { id: 'notices', label: 'Publish Notices', icon: Bell },
    { id: 'submissions', label: 'Submissions & Grading', icon: CheckSquare },
    { id: 'calendar', label: 'Exam Calendar', icon: Calendar },
    { id: 'analytics', label: 'Student Performance', icon: BarChart3 },
  ];

  const adminNav: NavItem[] = [
    { id: 'dashboard', label: 'School Admin Console', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: GraduationCap },
    { id: 'teachers', label: 'Teacher Management', icon: Users },
    { id: 'classes', label: 'Class & Section Setup', icon: Layers },
    { id: 'subjects', label: 'Subject Management', icon: BookOpen },
    { id: 'content_audit', label: 'Content Moderation', icon: FileText },
    { id: 'notices', label: 'School Bulletins', icon: Bell },
    { id: 'calendar', label: 'Master Academic Calendar', icon: Calendar },
    { id: 'analytics', label: 'School-Wide Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Branding & Term Settings', icon: Settings },
  ];

  const superAdminNav: NavItem[] = [
    { id: 'dashboard', label: 'Global Platform Health', icon: LayoutDashboard },
    { id: 'schools', label: 'Manage School Tenants', icon: Building2 },
    { id: 'subscriptions', label: 'Subscription Tiers & Plans', icon: CreditCard },
    { id: 'platform_analytics', label: 'Multi-Tenant Analytics', icon: BarChart3 },
    { id: 'security_logs', label: 'Security & Audit Logs', icon: Shield },
    { id: 'support', label: 'Institutional Helpdesk', icon: LifeBuoy },
    { id: 'platform_settings', label: 'Platform Settings', icon: Sliders },
  ];

  const currentNav =
    activeRole === 'student'
      ? studentNav
      : activeRole === 'teacher'
      ? teacherNav
      : activeRole === 'admin'
      ? adminNav
      : superAdminNav;

  return (
    <>
      {/* Backdrop — mobile only, shown while drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-16 md:top-auto bottom-0 md:bottom-auto left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 min-h-0 md:min-h-[calc(100vh-4rem)] transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Close button, mobile only */}
        <div className="md:hidden flex justify-end px-3 pt-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Context Bar */}
        <div className="px-5 py-4 border-b border-slate-800">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Current Workspace
          </div>
          <div className="text-sm font-bold text-white capitalize mt-0.5 flex items-center justify-between">
            <span>{activeRole === 'admin' ? 'School Administrator' : activeRole === 'superadmin' ? 'Platform Super Admin' : activeRole}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400">
              {activeRole === 'student' ? 'Grade 10-A' : activeRole === 'teacher' ? 'Faculty' : activeRole === 'admin' ? 'Principal' : 'HQ'}
            </span>
          </div>
        </div>

        {(activeRole === 'student' || activeRole === 'teacher') && onSelectSubject && (
          <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/40">
            <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1.5">
              Academic Subject
            </label>
            <select
              value={selectedSubject || 'All Subjects'}
              onChange={(e) => onSelectSubject(e.target.value)}
              className="w-full text-xs bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-indigo-500 cursor-pointer"
            >
              {subjectsList.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs bg-slate-950/50">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span>Row-Level Security</span>
            <span className="text-emerald-400 font-mono">ENFORCED</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono truncate">
            Tenant: school_apex · 2026-27
          </div>
        </div>
      </aside>
    </>
  );
}
