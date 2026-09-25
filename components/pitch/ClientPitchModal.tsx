import { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Users,
  Layers,
  ArrowRight,
  Download,
  Lock,
  Zap,
  Globe,
  DollarSign,
  X,
  FileCheck,
  Check,
} from 'lucide-react';
import { UserRole } from '../../types.ts';

interface ClientPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
  onOpenOnboarding: () => void;
}

export function ClientPitchModal({
  isOpen,
  onClose,
  onSelectRole,
  onOpenOnboarding,
}: ClientPitchModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'roles' | 'security' | 'pricing' | 'steps'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="relative px-8 py-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Commercial Proposition & Platform Architecture
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Ready to Deploy
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Why Schools Choose AcademiaHub
            </h2>
            <p className="text-sm text-slate-300 mt-0.5">
              The unified multi-tenant academic resource operating system for modern K-12 and collegiate institutions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenOnboarding();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch 10-Step Onboarding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close presentation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-8 pt-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'overview', label: '1. Executive Summary & Value' },
            { id: 'roles', label: '2. The 4 Role Workflows' },
            { id: 'security', label: '3. Architecture & Security' },
            { id: 'steps', label: '4. 10-Step Onboarding' },
            { id: 'pricing', label: '5. Subscription Models' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-white shadow-xs rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 text-slate-800">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    The Problem: Chaos & File Loss
                  </h3>
                  <ul className="space-y-2.5 text-xs text-rose-950">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Fragmented WhatsApp Groups:</strong> Vital PDFs, homework, and exam timetables get lost in endless chat streams.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Disjointed Student Portals:</strong> Quizzes on Google Forms, notes on Drive links, notices via email create high drop-off.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Zero Teacher Visibility:</strong> No central audit trail on whether students actually downloaded resources or submitted assignments on time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>School Privacy Vulnerabilities:</strong> Sharing student work on unencrypted personal mobile apps risks regulatory fines.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    The Solution: AcademiaHub
                  </h3>
                  <ul className="space-y-2.5 text-xs text-emerald-950">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>100% Centralized Repository:</strong> Chapter-wise notes, past papers, homework, and quizzes in one unified school hub.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Isolated Multi-Tenant Security:</strong> Every school operates in complete cryptographic data isolation with custom branding.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Immediate Student Engagement:</strong> Interactive timed MCQ tests, immediate grade feedback, and countdown deadlines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Effortless 10-Step Launch:</strong> Seamlessly onboarding existing school classes, teachers, and student rosters within 48 hours.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* High-Level Impact Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Reduced Inquiries</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono mt-1">−78%</div>
                  <p className="text-xs text-slate-600 mt-1">Fewer "Where is the homework?" inquiries from parents.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Assignment Turn-in</span>
                  <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">94.2%</div>
                  <p className="text-xs text-slate-600 mt-1">On-time student assignment submissions across classes.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Teacher Prep Time</span>
                  <div className="text-2xl font-bold text-indigo-700 font-mono mt-1">4.5 hrs</div>
                  <p className="text-xs text-slate-600 mt-1">Average administrative time saved per faculty member weekly.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Deployment Time</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono mt-1">&lt; 48 hrs</div>
                  <p className="text-xs text-slate-600 mt-1">From initial account setup to active classroom launch.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Role-Based Workflows (Click any role to test live in the app!)
                </h3>
                <span className="text-xs text-slate-500">
                  Select a persona below to experience their dedicated portal:
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student */}
                <div className="p-5 border border-slate-200 rounded-xl hover:border-indigo-400 transition-all bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">1. Student Persona</h4>
                        <span className="text-xs text-slate-500">Access · Learn · Grow</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectRole('student');
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      Test as Student
                    </button>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li>• Personal dashboard with upcoming assignments & quizzes</li>
                    <li>• Chapter-wise study materials & video lectures</li>
                    <li>• Direct digital assignment submissions (PDF/DOC)</li>
                    <li>• Timed MCQ quiz test taker with instant score feedback</li>
                    <li>• Filterable Previous Year Questions (PYQs) & solutions</li>
                  </ul>
                </div>

                {/* Teacher */}
                <div className="p-5 border border-slate-200 rounded-xl hover:border-emerald-400 transition-all bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👨‍🏫</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">2. Teacher Persona</h4>
                        <span className="text-xs text-slate-500">Create · Manage · Support</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectRole('teacher');
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Test as Teacher
                    </button>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li>• Select Class & Subject to upload notes, PDFs, and slide decks</li>
                    <li>• Create homework assignments with due dates and rubrics</li>
                    <li>• Author timed MCQ quizzes with custom explanations</li>
                    <li>• Grade submissions and provide feedback to students</li>
                    <li>• Broadcast notices flagged by priority (Urgent/Important)</li>
                  </ul>
                </div>

                {/* School Admin */}
                <div className="p-5 border border-slate-200 rounded-xl hover:border-amber-400 transition-all bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏫</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">3. School Admin Persona</h4>
                        <span className="text-xs text-slate-500">Manage · Organize · Control</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectRole('admin');
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      Test as School Admin
                    </button>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li>• Student & Teacher roster management with CSV batch import</li>
                    <li>• Class, Section, and Subject curriculum allocations</li>
                    <li>• School-wide notice broadcaster and exam calendar manager</li>
                    <li>• Academic analytics on homework turn-in and student attendance</li>
                    <li>• School identity & branding configuration (crest, colors)</li>
                  </ul>
                </div>

                {/* Super Admin */}
                <div className="p-5 border border-slate-200 rounded-xl hover:border-purple-400 transition-all bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">4. Super Admin (Platform Owner)</h4>
                        <span className="text-xs text-slate-500">Platform · Schools · Subscriptions</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectRole('superadmin');
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      Test as Super Admin
                    </button>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li>• Multi-tenant school directory: manage all partner institutions</li>
                    <li>• Subscription tier configuration, storage limits, and licensing</li>
                    <li>• 10-step tenant provisioning pipeline with one-click setup</li>
                    <li>• Platform-wide health analytics and audit logging</li>
                    <li>• Strict student privacy barrier (no unauthorized record access)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-5 bg-slate-900 text-white rounded-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Enterprise Security & Compliance Guarantee
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  AcademiaHub is architected with modern privacy-first standards. Each school's database partition is strictly isolated via Row-Level Security (RLS). Teachers and students never see data outside their assigned school tenant.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Row Level Security (RLS)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Every database record includes a cryptographically verified <code>school_id</code>. Cross-tenant leakage is impossible at the query level.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Private Storage & CDN</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Student assignments and exam questions are stored in private encrypted object storage buckets with time-limited pre-signed URLs.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>Comprehensive Audit Trails</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    All grade changes, content publications, and account modifications are logged with timestamps and author IDs for administrative compliance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">The 10-Step School Onboarding Lifecycle</h3>
                  <p className="text-xs text-slate-500">Standardized, predictable onboarding guaranteeing quick time-to-value for any school.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenOnboarding();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Interactive Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { step: 1, title: 'Create School Account', desc: 'Register domain, define tenant ID, assign root school admin credentials.' },
                  { step: 2, title: 'Configure Branding', desc: 'Upload school crest logo, configure brand colors and official academic motto.' },
                  { step: 3, title: 'Create Classes & Sections', desc: 'Structure Grades (e.g. Grade 9–12) with corresponding sections (A, B, C).' },
                  { step: 4, title: 'Add Subjects', desc: 'Define departmental curriculum (Physics, Math, Chemistry, Computer Science).' },
                  { step: 5, title: 'Import Teachers', desc: 'Batch invite faculty via CSV or email, assigning subjects and grades.' },
                  { step: 6, title: 'Import Students', desc: 'Securely import student rosters with roll numbers and class assignments.' },
                  { step: 7, title: 'Upload Initial Content', desc: 'Pre-populate curriculum syllabus, core chapter handbooks, and term notices.' },
                  { step: 8, title: 'Teacher Training', desc: 'Deliver 30-minute faculty workshop on assignment grading and quiz creation.' },
                  { step: 9, title: 'Student Launch', desc: 'Distribute one-click student login credentials and mobile-ready portal links.' },
                  { step: 10, title: 'Ongoing Support', desc: 'Dedicated institutional account manager, SLA guarantees, and quarterly reviews.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs shrink-0 font-mono">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-slate-900">Institutional Subscription Tiers</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Transparent, predictable annual pricing designed to fit both individual independent academies and large multi-campus school districts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Starter */}
                <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Starter Academy</h4>
                    <span className="text-xs text-slate-500">For boutique schools & prep colleges</span>
                    <div className="mt-3">
                      <span className="text-3xl font-bold font-mono text-slate-900">$490</span>
                      <span className="text-xs text-slate-500 font-normal"> / month</span>
                    </div>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-600 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-2">✓ Up to 500 Students</li>
                    <li className="flex items-center gap-2">✓ 8 Core Academic Modules</li>
                    <li className="flex items-center gap-2">✓ 100 GB Cloud File Storage</li>
                    <li className="flex items-center gap-2">✓ Standard Email Support</li>
                    <li className="flex items-center gap-2 text-slate-400">✕ Custom Domain Branding</li>
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOnboarding();
                    }}
                    className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Select Starter
                  </button>
                </div>

                {/* Standard Pro */}
                <div className="p-6 rounded-xl border-2 border-indigo-600 bg-indigo-50/20 relative space-y-4 shadow-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Most Popular for Schools
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Standard School</h4>
                    <span className="text-xs text-slate-500">For mid-size K-12 institutions</span>
                    <div className="mt-3">
                      <span className="text-3xl font-bold font-mono text-indigo-700">$990</span>
                      <span className="text-xs text-slate-500 font-normal"> / month</span>
                    </div>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-600 border-t border-indigo-100 pt-3">
                    <li className="flex items-center gap-2">✓ Up to 1,500 Students</li>
                    <li className="flex items-center gap-2">✓ All 8 Modules + Timed Quizzes</li>
                    <li className="flex items-center gap-2">✓ 500 GB Encrypted Storage</li>
                    <li className="flex items-center gap-2">✓ School Crest & Custom Colors</li>
                    <li className="flex items-center gap-2">✓ Priority 24-hr Support SLA</li>
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOnboarding();
                    }}
                    className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    Select Standard
                  </button>
                </div>

                {/* Enterprise */}
                <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Enterprise District</h4>
                    <span className="text-xs text-slate-500">For multi-campus school chains</span>
                    <div className="mt-3">
                      <span className="text-3xl font-bold font-mono text-slate-900">$2,400</span>
                      <span className="text-xs text-slate-500 font-normal"> / month</span>
                    </div>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-600 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-2">✓ Unlimited Students & Campuses</li>
                    <li className="flex items-center gap-2">✓ Custom Domain (portal.yourschool.edu)</li>
                    <li className="flex items-center gap-2">✓ 2 TB Storage + Auto-Backups</li>
                    <li className="flex items-center gap-2">✓ Dedicated Success Manager</li>
                    <li className="flex items-center gap-2">✓ Custom SIS / API Integration</li>
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOnboarding();
                    }}
                    className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Contact Enterprise Sales
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span>Client Demonstration Module · All data strictly sandboxed and safe for executive preview</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close & Return to Live Portal
          </button>
        </div>
      </div>
    </div>
  );
}
