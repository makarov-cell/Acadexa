import { useState } from 'react';
import {
  GraduationCap,
  Users,
  Layers,
  BookOpen,
  FileText,
  Bell,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Shield,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { SchoolTenant, UserProfile } from '../../types.ts';
import { MOCK_STUDENT_ROSTER, MOCK_TEACHER_ROSTER } from '../../data/mockData.ts';

interface AdminDashboardProps {
  school: SchoolTenant;
  user: UserProfile;
  onNavigate: (view: string) => void;
  onUpdateSchoolSettings: (updated: Partial<SchoolTenant>) => void;
}

export function AdminDashboard({
  school,
  user,
  onNavigate,
  onUpdateSchoolSettings,
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'students' | 'teachers' | 'settings'>('overview');
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');

  // Settings form state
  const [schoolName, setSchoolName] = useState(school.name);
  const [tagline, setTagline] = useState(school.tagline);
  const [academicYear, setAcademicYear] = useState(school.academicYear);
  const [accentColor, setAccentColor] = useState(school.accentColor);
  const [isSaved, setIsSaved] = useState(false);

  const filteredStudents = MOCK_STUDENT_ROSTER.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredTeachers = MOCK_TEACHER_ROSTER.filter(
    (t) =>
      t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      t.department.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSchoolSettings({
      name: schoolName,
      tagline,
      academicYear,
      accentColor,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Principal & Admin Header */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <span>{school.name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{school.academicYear}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Principal Administration Console
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Complete institutional governance over student enrollment, faculty allocations, curriculum content, and school analytics.
          </p>
        </div>

        <div className="flex items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6 text-right">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Enrollment</div>
            <div className="text-lg font-bold font-mono text-white">{school.studentCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Faculty Staff</div>
            <div className="text-lg font-bold font-mono text-indigo-400">{school.teacherCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Cloud Storage</div>
            <div className="text-lg font-bold font-mono text-emerald-400">
              {school.storageUsedGb} GB
            </div>
          </div>
        </div>
      </div>

      {/* Admin Module Tabs (from Diagram: Student, Teacher, Class, Subject, Content, Notices, Analytics, Settings) */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        {[
          { id: 'overview', label: '1. Executive Overview' },
          { id: 'students', label: `2. Student Management (${school.studentCount})` },
          { id: 'teachers', label: `3. Teacher Management (${school.teacherCount})` },
          { id: 'settings', label: '4. School Settings & Branding' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Admin Modules Grid from Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'students', label: 'Student Management', icon: GraduationCap, desc: 'Roster, enroll, credentials', count: '1,240' },
              { id: 'teachers', label: 'Teacher Management', icon: Users, desc: 'Staff profiles & allocations', count: '78' },
              { id: 'classes', label: 'Class & Section Setup', icon: Layers, desc: 'Grade cohorts & streams', count: '24 Classes' },
              { id: 'content_audit', label: 'Content Moderation', icon: FileText, desc: 'Audit & syllabus compliance', count: '412 Files' },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    if (mod.id === 'students' || mod.id === 'teachers') {
                      setActiveSubTab(mod.id as any);
                    } else {
                      onNavigate(mod.id);
                    }
                  }}
                  className="p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-indigo-600" />
                    <span className="font-mono text-xs font-bold text-slate-700">{mod.count}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    {mod.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{mod.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Analytics Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Turn-In Rate Across School
              </span>
              <div className="text-3xl font-bold font-mono text-emerald-700">93.8%</div>
              <p className="text-xs text-slate-600">
                1,162 out of 1,240 students have zero overdue homework.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Storage Quota Utilization
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900">
                {school.storageUsedGb} <span className="text-base text-slate-400">/ {school.storageLimitGb} GB</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(school.storageUsedGb / school.storageLimitGb) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Security & Row Isolation
              </span>
              <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200 w-fit flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Zero Cross-Tenant Leakage</span>
              </div>
              <p className="text-xs text-slate-600">
                Cryptographic partition active on tenant <code>{school.id}</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Students */}
      {activeSubTab === 'students' && (
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Enrollment Roster</h3>
              <p className="text-xs text-slate-500">View and manage student access credentials and status.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600"
                />
              </div>
              <button
                onClick={() => alert('Opening Student Batch Import CSV dialogue...')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                + Add / Import Students
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Roll No</th>
                  <th className="py-2.5 px-3">Grade & Section</th>
                  <th className="py-2.5 px-3">Attendance</th>
                  <th className="py-2.5 px-3">Current GPA</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{s.rollNo}</td>
                    <td className="py-2.5 px-3">{s.grade} - {s.section}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{s.attendance}</td>
                    <td className="py-2.5 px-3 font-mono">{s.gpa}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Reset password sent to ${s.email}`)}
                        className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
                      >
                        Reset Credentials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Teachers */}
      {activeSubTab === 'teachers' && (
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Faculty Staff & Subject Allocations</h3>
              <p className="text-xs text-slate-500">Manage teaching staff roles, departments, and uploaded resources.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600"
                />
              </div>
              <button
                onClick={() => alert('Opening Teacher invitation modal...')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                + Invite Faculty Member
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold">
                  <th className="py-2.5 px-3">Faculty Member</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Allocated Subjects</th>
                  <th className="py-2.5 px-3">Cohorts</th>
                  <th className="py-2.5 px-3">Resources Authored</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-slate-400">{t.email}</div>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">{t.department}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {t.subjects.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{t.classes.join(', ')}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">{t.resourcesCount} files</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeSubTab === 'settings' && (
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs max-w-2xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">School Identity & Branding Configuration</h3>
            <p className="text-xs text-slate-500">Configure public credentials, crest symbols, and academic terms.</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Institution Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Motto / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Theme Accent</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <span className="font-mono text-slate-600">{accentColor}</span>
                </div>
              </div>
            </div>

            {isSaved && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Institutional settings updated successfully!</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
