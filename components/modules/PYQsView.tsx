import { useState } from 'react';
import {
  History,
  Download,
  Filter,
  FileCheck,
  Search,
  Plus,
  Eye,
  CheckCircle,
  X,
  FileText,
} from 'lucide-react';
import { PreviousYearQuestion, UserRole } from '../../types.ts';

interface PYQsViewProps {
  pyqs: PreviousYearQuestion[];
  activeRole: UserRole;
  selectedSubject: string;
  onSelectSubject: (sub: string) => void;
  onAddPYQ: (pyq: PreviousYearQuestion) => void;
}

export function PYQsView({
  pyqs,
  activeRole,
  selectedSubject,
  onSelectSubject,
  onAddPYQ,
}: PYQsViewProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>('All Grades');
  const [selectedExamType, setSelectedExamType] = useState<string>('All Exams');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New PYQ state
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState(selectedSubject === 'All Subjects' ? 'Physics' : selectedSubject);
  const [newGrade, setNewGrade] = useState('Grade 10');
  const [newExamType, setNewExamType] = useState<PreviousYearQuestion['examType']>('Final Board');
  const [newYear, setNewYear] = useState(2025);
  const [newHasSolution, setNewHasSolution] = useState(true);

  const grades = ['All Grades', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const examTypes = ['All Exams', 'Mid-Term', 'Final Board', 'Preliminary', 'Unit Test'];
  const years = ['All Years', '2025', '2024', '2023', '2022', '2021'];

  const filteredPYQs = pyqs.filter((p) => {
    const matchSubject = selectedSubject === 'All Subjects' || p.subject === selectedSubject;
    const matchGrade = selectedGrade === 'All Grades' || p.grade === selectedGrade;
    const matchExam = selectedExamType === 'All Exams' || p.examType === selectedExamType;
    const matchYear = selectedYear === 'All Years' || p.year.toString() === selectedYear;
    const matchQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchSubject && matchGrade && matchExam && matchYear && matchQuery;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const pyq: PreviousYearQuestion = {
      id: `pyq_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      grade: newGrade,
      subject: newSub,
      examType: newExamType,
      year: newYear,
      fileSize: '3.2 MB',
      hasSolution: newHasSolution,
      downloads: 0,
      uploadedBy: activeRole === 'teacher' ? 'Dr. Sarah Jenkins' : 'Examination Cell',
    };

    onAddPYQ(pyq);
    setIsUploadOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Previous Year Questions & Board Papers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Archival question papers, official marking rubrics, and model answer keys categorized by exam and year.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'admin') && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Past Paper</span>
          </button>
        )}
      </div>

      {/* 4-Level Filter Pipeline (Class -> Subject -> Exam -> Year as in workflow diagram) */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>4-Tier Curricular Filter Hierarchy</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {filteredPYQs.length} Papers Available
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Class */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">1. Class / Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600 cursor-pointer"
            >
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">2. Academic Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => onSelectSubject(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600 cursor-pointer"
            >
              <option value="All Subjects">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">3. Examination Type</label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600 cursor-pointer"
            >
              {examTypes.map((et) => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">4. Exam Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600 cursor-pointer font-mono"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PYQ Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPYQs.map((paper) => (
          <div
            key={paper.id}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Unboxed metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="font-semibold text-slate-800">{paper.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{paper.grade}</span>
                  <span aria-hidden="true">·</span>
                  <span>{paper.examType}</span>
                </div>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {paper.year}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <History className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  {paper.title}
                </h3>
              </div>

              {paper.hasSolution ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Includes Verified Marking Scheme & Step-by-Step Solutions</span>
                </div>
              ) : (
                <div className="text-xs text-slate-400">
                  <span>Question Paper Only (Unsolved)</span>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2 font-mono">
                <span>{paper.fileSize}</span>
                <span aria-hidden="true">·</span>
                <span>{paper.downloads} downloads</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    alert(`Opening official paper: ${paper.title}`);
                  }}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading past examination bundle: ${paper.title}`);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload PYQ Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Upload Past Question Paper</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Paper Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024 Physics Final Board Theory Paper"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSub}
                    onChange={(e) => setNewSub(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={newExamType}
                    onChange={(e) => setNewExamType(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600 cursor-pointer"
                  >
                    <option value="Final Board">Final Board</option>
                    <option value="Mid-Term">Mid-Term</option>
                    <option value="Preliminary">Preliminary</option>
                    <option value="Unit Test">Unit Test</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Exam Year</label>
                  <input
                    type="number"
                    min={2018}
                    max={2026}
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="hasSolCheck"
                  checked={newHasSolution}
                  onChange={(e) => setNewHasSolution(e.target.checked)}
                  className="rounded text-indigo-600 cursor-pointer"
                />
                <label htmlFor="hasSolCheck" className="text-slate-700 font-medium cursor-pointer">
                  Includes Answer Key & Full Marking Rubric
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Publish Past Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
