import { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileCheck,
  Plus,
  Eye,
  Check,
  X,
  Calendar,
  Award,
} from 'lucide-react';
import { Assignment, UserRole } from '../../types.ts';

interface AssignmentsViewProps {
  assignments: Assignment[];
  activeRole: UserRole;
  selectedSubject: string;
  onSubmitAssignment: (assignmentId: string, fileName: string) => void;
  onGradeAssignment: (assignmentId: string, marks: number, feedback: string) => void;
  onCreateAssignment: (assignment: Assignment) => void;
}

export function AssignmentsView({
  assignments,
  activeRole,
  selectedSubject,
  onSubmitAssignment,
  onGradeAssignment,
  onCreateAssignment,
}: AssignmentsViewProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [activeSubmissionModal, setActiveSubmissionModal] = useState<Assignment | null>(null);
  const [activeGradingModal, setActiveGradingModal] = useState<Assignment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Student submission form state
  const [selectedFileName, setSelectedFileName] = useState('Physics_Lab_Report_AaravPatel.pdf');
  const [studentComments, setStudentComments] = useState('');

  // Teacher grading form state
  const [gradeMarks, setGradeMarks] = useState<number>(28);
  const [gradeFeedback, setGradeFeedback] = useState('Excellent attention to error margins and thorough free-body diagram labeling.');

  // Teacher create assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(selectedSubject === 'All Subjects' ? 'Physics' : selectedSubject);
  const [newDueDate, setNewDueDate] = useState('2026-10-04');
  const [newMaxMarks, setNewMaxMarks] = useState(30);
  const [newInstructions, setNewInstructions] = useState('');

  const filteredAssignments = assignments.filter((asg) => {
    const matchSubject = selectedSubject === 'All Subjects' || asg.subject === selectedSubject;
    if (!matchSubject) return false;

    if (activeRole === 'student') {
      if (filterTab === 'all') return true;
      return asg.studentStatus === filterTab;
    }
    return true;
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmissionModal) return;
    onSubmitAssignment(activeSubmissionModal.id, selectedFileName);
    setActiveSubmissionModal(null);
  };

  const handleTeacherGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGradingModal) return;
    onGradeAssignment(activeGradingModal.id, gradeMarks, gradeFeedback);
    setActiveGradingModal(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAsg: Assignment = {
      id: `asg_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      subject: newSubject,
      grade: 'Grade 10',
      chapter: 'Unit Assessment',
      assignedBy: 'Dr. Sarah Jenkins',
      dueDate: newDueDate,
      maxMarks: newMaxMarks,
      instructions: newInstructions,
      totalSubmissions: 0,
      totalStudents: 42,
      studentStatus: 'pending',
    };

    onCreateAssignment(newAsg);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewInstructions('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Academic Assignments & Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Turn-in digital lab reports, problem sets, and view official teacher evaluations with rubrics.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'admin') && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>

      {/* Filter Tabs for Students */}
      {activeRole === 'student' && (
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'pending', label: 'To Do (Pending)' },
            { id: 'submitted', label: 'Turned In' },
            { id: 'graded', label: 'Graded & Evaluated' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as typeof filterTab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => {
          const isPending = asg.studentStatus === 'pending';
          const isSubmitted = asg.studentStatus === 'submitted';
          const isGraded = asg.studentStatus === 'graded';

          return (
            <div
              key={asg.id}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                {/* Unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{asg.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{asg.chapter}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{asg.maxMarks} Max Marks</span>
                  <span aria-hidden="true">·</span>
                  <span>Assigned by {asg.assignedBy}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{asg.title}</h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {asg.instructions}
                </p>

                {asg.attachmentName && (
                  <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Reference Manual: {asg.attachmentName}</span>
                  </div>
                )}

                {/* Graded Feedback banner if graded */}
                {isGraded && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-emerald-900">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Teacher Evaluation Recorded</span>
                      </span>
                      <span className="font-mono text-emerald-800">
                        Score: {asg.obtainedMarks} / {asg.maxMarks} (
                        {Math.round(((asg.obtainedMarks || 0) / asg.maxMarks) * 100)}%)
                      </span>
                    </div>
                    {asg.teacherFeedback && (
                      <p className="text-emerald-800 text-[11px] italic">
                        "{asg.teacherFeedback}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action column */}
              <div className="flex md:flex-col items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right text-xs">
                  <div className="text-slate-400 font-medium">Submission Deadline</div>
                  <div className="font-mono font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{asg.dueDate}</span>
                  </div>
                </div>

                {activeRole === 'student' && (
                  <div>
                    {isPending && (
                      <button
                        onClick={() => setActiveSubmissionModal(asg)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>
                    )}

                    {isSubmitted && (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {asg.submittedAt}
                        </div>
                      </div>
                    )}

                    {isGraded && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Grading Complete</span>
                      </span>
                    )}
                  </div>
                )}

                {(activeRole === 'teacher' || activeRole === 'admin') && (
                  <div className="space-y-1.5 text-right">
                    <div className="text-[11px] text-slate-500 font-mono">
                      Submissions: {asg.totalSubmissions} / {asg.totalStudents}
                    </div>
                    <button
                      onClick={() => {
                        setActiveGradingModal(asg);
                        setGradeMarks(asg.obtainedMarks || 28);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Review Submissions
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Submit Modal */}
      {activeSubmissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-indigo-400">
                  Student Assignment Submission
                </span>
                <h3 className="text-sm font-bold">{activeSubmissionModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveSubmissionModal(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="text-slate-500 font-medium">Assignment Instructions:</div>
                <p className="text-slate-700">{activeSubmissionModal.instructions}</p>
                <div className="text-slate-400 font-mono text-[11px] pt-1">
                  Due by: {activeSubmissionModal.dueDate} · Total Marks: {activeSubmissionModal.maxMarks}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Upload Assignment File (PDF, DOCX, PNG)
                </label>
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50/50">
                  <UploadCloud className="w-7 h-7 text-indigo-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800">{selectedFileName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">2.4 MB · Ready for submission</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFileName('Projectile_Physics_Calculations_Final.pdf');
                    }}
                    className="mt-2 text-[11px] text-indigo-600 font-semibold hover:underline cursor-pointer"
                  >
                    Simulate choose another file
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Submission Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={studentComments}
                  onChange={(e) => setStudentComments(e.target.value)}
                  placeholder="Included graph data points and references to table 3.2 on page 4..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSubmissionModal(null)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Submit Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Grading & Review Modal */}
      {activeGradingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-emerald-400">
                  Teacher Evaluation Desk
                </span>
                <h3 className="text-sm font-bold">{activeGradingModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveGradingModal(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTeacherGrade} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-semibold text-slate-800">Student: Aarav Patel (Roll: 10-A-42)</div>
                <div className="text-slate-500 font-mono text-[11px]">
                  Submitted: {activeGradingModal.submittedAt || 'Sep 23, 2026 · 18:42'}
                </div>
                <div className="text-indigo-600 font-mono text-[11px] flex items-center gap-1 pt-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{activeGradingModal.studentSubmissionFile || 'Aarav_Patel_Assignment.pdf'}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Awarded Marks (Out of {activeGradingModal.maxMarks})
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={activeGradingModal.maxMarks}
                    value={gradeMarks}
                    onChange={(e) => setGradeMarks(Number(e.target.value))}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold focus:outline-indigo-600"
                  />
                  <span className="text-slate-500 font-mono text-xs">
                    / {activeGradingModal.maxMarks} Total Points
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Teacher Constructive Feedback
                </label>
                <textarea
                  rows={3}
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveGradingModal(null)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Grade & Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Create New Assignment</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electromagnetic Induction Lab Analysis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Maximum Marks</label>
                  <input
                    type="number"
                    value={newMaxMarks}
                    onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Submission Deadline</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Submission Instructions & Rubrics
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the expected format, calculations, and error analysis steps..."
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Publish to Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
