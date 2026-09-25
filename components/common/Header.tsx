import {
  Search,
  Sparkles,
  Building,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { SchoolTenant, UserProfile, UserRole } from '../../types.ts';

interface HeaderProps {
  currentSchool: SchoolTenant;
  schools: SchoolTenant[];
  currentUser: UserProfile;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onSelectSchool: (school: SchoolTenant) => void;
  onOpenSearch: () => void;
  onOpenPitch: () => void;
  onOpenOnboarding: () => void;
  onTogglePublicWebsite: () => void;
  isPublicMode: boolean;
  onOpenMenu: () => void;
}

export function Header({
  currentSchool,
  schools,
  currentUser,
  activeRole,
  onSelectRole,
  onSelectSchool,
  onOpenSearch,
  onOpenPitch,
  onOpenOnboarding,
  onTogglePublicWebsite,
  isPublicMode,
  onOpenMenu,
}: HeaderProps) {
  const roleLabels: Record<UserRole, { label: string; icon: string; badge: string }> = {
    student: { label: 'Student', icon: '🎓', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    teacher: { label: 'Teacher', icon: '👨‍🏫', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    admin: { label: 'School Admin', icon: '🏫', badge: 'bg-amber-50 text-amber-800 border-amber-200' },
    superadmin: { label: 'Super Admin', icon: '🌐', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-3 md:px-6 gap-2">
        {/* Zone 1: Menu toggle (mobile) + Brand */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {!isPublicMode && (
            <button
              onClick={onOpenMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 shrink-0 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (isPublicMode) onTogglePublicWebsite();
            }}
            className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2 whitespace-nowrap min-w-0 cursor-pointer"
          >
            <span className="w-8 h-8 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              AH
            </span>
            <span className="hidden xs:inline truncate">AcademiaHub</span>
          </button>

          {/* School Tenant Switcher (Multi-Tenant demonstration) */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="text-lg">{currentSchool.logo}</span>
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer">
                <span className="truncate max-w-[200px]">{currentSchool.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 hidden group-hover:block z-50">
                <div className="px-2 py-1 text-[10px] uppercase font-semibold text-slate-400">
                  Switch School Tenant
                </div>
                {schools.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => onSelectSchool(school)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                      school.id === currentSchool.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{school.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{school.plan}</span>
                  </button>
                ))}
                <div className="mt-1 pt-1 border-t border-slate-100">
                  <button
                    onClick={onOpenOnboarding}
                    className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>+ Provision New School</span>
                  </button>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400">· {currentSchool.code}</span>
          </div>
        </div>

        {/* Zone 2: Role Simulator (desktop only) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
            Switch Role:
          </span>
          {(['student', 'teacher', 'admin', 'superadmin'] as UserRole[]).map((role) => {
            const info = roleLabels[role];
            const isActive = activeRole === role && !isPublicMode;
            return (
              <button
                key={role}
                onClick={() => {
                  if (isPublicMode) onTogglePublicWebsite();
                  onSelectRole(role);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>{info.icon}</span>
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>

        {/* Zone 3: Primary Actions — icons only below sm, labels return at sm+ */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onTogglePublicWebsite}
            className={`flex items-center justify-center sm:justify-start w-9 h-9 sm:w-auto sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border cursor-pointer ${
              isPublicMode
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            aria-label="Toggle public web view"
          >
            <Building className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">{isPublicMode ? 'Exit Public View' : 'Public Web View'}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center sm:justify-start gap-2 w-9 h-9 sm:w-auto sm:px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Search portal"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search portal...</span>
            <kbd className="hidden sm:inline font-mono text-[10px] px-1 py-0.5 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenPitch}
            className="flex items-center justify-center sm:justify-start gap-1.5 w-9 h-9 sm:w-auto sm:px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            aria-label="Client pitch mode"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Client Pitch Mode</span>
          </button>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-500 capitalize">
                {activeRole}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
