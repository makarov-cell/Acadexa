import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Building2,
  Calendar,
  Award,
} from 'lucide-react';
import { UserRole } from '../../types.ts';

interface PublicLandingViewProps {
  onEnterPortal: (role: UserRole) => void;
  onOpenPitch: () => void;
  onOpenOnboarding: () => void;
}

export function PublicLandingView({
  onEnterPortal,
  onOpenPitch,
  onOpenOnboarding,
}: PublicLandingViewProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-indigo-600/90 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>⭐ Next-Generation Multi-Tenant School Academic Infrastructure</span>
        <span aria-hidden="true">·</span>
        <button
          onClick={onOpenPitch}
          className="underline font-semibold hover:text-indigo-100 cursor-pointer"
        >
          View Live Commercial Pitch Deck
        </button>
      </div>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-indigo-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>Centralized · Secure · Simple · Multi-School</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Modern Academic Portal for Forward-Thinking Schools
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Say goodbye to fragmented WhatsApp groups and lost homework PDFs. Centralize lecture notes, timed quizzes, past year board exams, and official circulars in one unified, role-based hub.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onEnterPortal('student')}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Student & Faculty Portals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPitch}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Interactive Client Sales Deck</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Persona Entry Points for the Client */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select a Persona to Enter the Live Demo Environment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onEnterPortal('student')}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                Student Experience
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Access chapter notes, submit homework files, take timed MCQ quizzes, and download solved past papers.
              </p>
              <div className="mt-4 text-xs font-semibold text-indigo-400 flex items-center gap-1">
                <span>Enter as Student</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onEnterPortal('teacher')}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-emerald-500 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-3">👨‍🏫</div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Teacher Console
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Author lesson handbooks, configure homework points, design MCQ question banks, and grade student submissions.
              </p>
              <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>Enter as Teacher</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onEnterPortal('admin')}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-amber-500 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-3">🏫</div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                School Principal Desk
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Oversee student roster enrollment, teacher allocations, school notices, master exam calendar, and branding.
              </p>
              <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>Enter as School Admin</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onEnterPortal('superadmin')}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                SaaS Super Admin
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage multiple school tenants, subscription plans, tenant provisioning, and platform security audits.
              </p>
              <div className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1">
                <span>Enter as Super Admin</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid (The 8 Academic Modules) */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">The 8 Integrated Academic Engines</h2>
            <p className="text-xs text-slate-400 mt-1">
              Built precisely as mapped in the institutional architectural blueprint.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: '1. Study Material', desc: 'Chapter-wise PDFs, notes, slides, video streams.' },
              { title: '2. Assignments', desc: 'Deadlines, marks, file uploads & feedback grading.' },
              { title: '3. Timed Quizzes', desc: 'MCQs with auto-timer & immediate score analysis.' },
              { title: '4. PYQ Past Papers', desc: 'Class -> Subject -> Exam -> Year multi-filtering.' },
              { title: '5. School Notices', desc: 'Urgent, important & circular broadcasts with PDF.' },
              { title: '6. Academic Calendar', desc: 'Exams, assignment deadlines & school breaks.' },
              { title: '7. Academic Portals', desc: 'Curated links to PhET labs, Desmos & JSTOR.' },
              { title: '8. Global Discovery', desc: 'Instant permission-checked search across all units.' },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <h4 className="text-xs font-bold text-indigo-400">{f.title}</h4>
                <p className="text-[11px] text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        <p>AcademiaHub Multi-Tenant Academic Operating System · Ready for institutional deployment</p>
      </footer>
    </div>
  );
}
