import { useState } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Building2,
  Palette,
  Layers,
  BookOpen,
  Users,
  GraduationCap,
  UploadCloud,
  Award,
  Rocket,
  Headphones,
  X,
  Plus,
} from 'lucide-react';
import { SchoolTenant } from '../../types.ts';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchoolCreated: (newSchool: SchoolTenant) => void;
}

export function OnboardingWizardModal({
  isOpen,
  onClose,
  onSchoolCreated,
}: OnboardingWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolData, setSchoolData] = useState({
    name: 'Cambridge Heights Academy',
    code: 'CHA-2026',
    tagline: 'Inspiring Excellence, Cultivating Leaders',
    accentColor: '#4f46e5',
    plan: 'Standard' as const,
    grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    sections: ['Section A', 'Section B'],
    subjects: ['Physics', 'Mathematics', 'Chemistry', 'English Literature', 'Computer Science'],
    adminEmail: 'principal@cambridgeheights.edu',
    initialTeacherCount: 42,
    initialStudentCount: 680,
  });

  if (!isOpen) return null;

  const STEPS = [
    { number: 1, title: 'Create School Account', icon: Building2 },
    { number: 2, title: 'Configure Branding', icon: Palette },
    { number: 3, title: 'Classes & Sections', icon: Layers },
    { number: 4, title: 'Add Subjects', icon: BookOpen },
    { number: 5, title: 'Import Teachers', icon: Users },
    { number: 6, title: 'Import Students', icon: GraduationCap },
    { number: 7, title: 'Upload Initial Content', icon: UploadCloud },
    { number: 8, title: 'Teacher Training', icon: Award },
    { number: 9, title: 'Student Launch', icon: Rocket },
    { number: 10, title: 'Ongoing Support', icon: Headphones },
  ];

  const handleFinish = () => {
    const newSchool: SchoolTenant = {
      id: `school_${Date.now()}`,
      name: schoolData.name,
      code: schoolData.code,
      logo: '🎓',
      tagline: schoolData.tagline,
      accentColor: schoolData.accentColor,
      plan: schoolData.plan,
      status: 'active',
      studentCount: schoolData.initialStudentCount,
      teacherCount: schoolData.initialTeacherCount,
      storageUsedGb: 12.5,
      storageLimitGb: 250,
      academicYear: '2026 – 2027',
      classesCount: schoolData.grades.length * schoolData.sections.length,
      joinedDate: 'Just Now',
    };
    onSchoolCreated(newSchool);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Institutional Onboarding Engine (Step {currentStep} of 10)
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
              10-Step School Setup & Tenant Provisioning
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Step Tracker */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {STEPS.map((s) => {
              const isDone = s.number < currentStep;
              const isCurrent = s.number === currentStep;
              return (
                <button
                  key={s.number}
                  onClick={() => setCurrentStep(s.number)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-mono font-bold bg-black/10">
                    {isDone ? '✓' : s.number}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800">
          {currentStep === 1 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 1: Create School Account</h3>
              <p className="text-xs text-slate-500">
                Register your institution's profile and generate the root administrative access token.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official School Name</label>
                <input
                  type="text"
                  value={schoolData.name}
                  onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Code</label>
                  <input
                    type="text"
                    value={schoolData.code}
                    onChange={(e) => setSchoolData({ ...schoolData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-indigo-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Root Admin Email</label>
                  <input
                    type="email"
                    value={schoolData.adminEmail}
                    onChange={(e) => setSchoolData({ ...schoolData, adminEmail: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 2: Configure Branding</h3>
              <p className="text-xs text-slate-500">
                Personalize your school's portal appearance with crest logo and institutional palette.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">School Motto / Tagline</label>
                <input
                  type="text"
                  value={schoolData.tagline}
                  onChange={(e) => setSchoolData({ ...schoolData, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Brand Accent</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={schoolData.accentColor}
                    onChange={(e) => setSchoolData({ ...schoolData, accentColor: e.target.value })}
                    className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-600">{schoolData.accentColor}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 3: Define Classes & Sections</h3>
              <p className="text-xs text-slate-500">
                Setup your grade tiers and section streams for cohort isolation.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Active Grades</label>
                <div className="flex flex-wrap gap-2">
                  {schoolData.grades.map((grade) => (
                    <span key={grade} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200">
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sections per Grade</label>
                <div className="flex flex-wrap gap-2">
                  {schoolData.sections.map((section) => (
                    <span key={section} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 4: Academic Subjects</h3>
              <p className="text-xs text-slate-500">
                Curriculum subjects where teachers will upload notes, create assignments, and host quizzes.
              </p>
              <div className="flex flex-wrap gap-2">
                {schoolData.subjects.map((sub) => (
                  <span key={sub} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 5: Import Teachers & Faculty</h3>
              <p className="text-xs text-slate-500">
                Seamless CSV or Google Classroom roster synchronization for faculty credentials.
              </p>
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
                <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Drag and drop faculty CSV here</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Template includes: Name, Email, Department, Allocated Subjects</p>
                <span className="inline-block mt-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700">
                  {schoolData.initialTeacherCount} Teachers Pre-loaded
                </span>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 6: Import Students</h3>
              <p className="text-xs text-slate-500">
                Assign student accounts to corresponding grades, sections, and roll numbers.
              </p>
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Bulk Student Roster Ready</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Unique passwords auto-generated with parent notification alerts.</p>
                <span className="inline-block mt-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700">
                  {schoolData.initialStudentCount} Students Enrolled
                </span>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 7: Upload Initial Content</h3>
              <p className="text-xs text-slate-500">
                Seed the portal with the academic calendar, first term syllabus handbooks, and past year question papers.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Academic Term Datesheet (2026-2027) Synced</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Past 5 Years Board Question Papers Seeded</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Standard STEM Formula Reference Sheets Attached</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 8: Teacher Training & Enablement</h3>
              <p className="text-xs text-slate-500">
                Deliver interactive 30-minute walkthroughs on digital assignment grading and instant quiz creation.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Faculty QuickStart Guide</span>
                  <span className="text-emerald-600 font-semibold">Ready to Send</span>
                </div>
                <p className="text-xs text-slate-600">
                  Pre-configured video tutorials and cheat sheets for Dr. Sarah Jenkins and 41 other faculty staff.
                </p>
              </div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Step 9: Student Launch</h3>
              <p className="text-xs text-slate-500">
                Activate single sign-on or credential SMS/email broadcast to students and parents.
              </p>
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2 text-xs">
                <p className="font-semibold text-indigo-900">Portal Address Ready:</p>
                <p className="font-mono text-indigo-700 bg-white p-2 rounded border border-indigo-200">
                  https://cambridgeheights.academiahub.cloud
                </p>
              </div>
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-4 max-w-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900">Step 10: Launch Complete & Dedicated Support</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your tenant environment has been isolated and provisioned. Click below to enter the live school portal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStep === 1
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 10 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(10, prev + 1))}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Provision & Open School Tenant</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
