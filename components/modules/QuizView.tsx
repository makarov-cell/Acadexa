import { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Plus,
  Play,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Quiz, QuizQuestion, UserRole } from '../../types.ts';

interface QuizViewProps {
  quizzes: Quiz[];
  activeRole: UserRole;
  selectedSubject: string;
  onCompleteQuiz: (quizId: string, score: number) => void;
  onCreateQuiz: (quiz: Quiz) => void;
}

export function QuizView({
  quizzes,
  activeRole,
  selectedSubject,
  onCompleteQuiz,
  onCreateQuiz,
}: QuizViewProps) {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  // Teacher create quiz state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(selectedSubject === 'All Subjects' ? 'Physics' : selectedSubject);
  const [newLimit, setNewLimit] = useState(10);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectOption, setNewCorrectOption] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [createdQuestions, setCreatedQuestions] = useState<QuizQuestion[]>([]);

  // Timer effect when taking a quiz
  useEffect(() => {
    if (!activeQuiz || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, isSubmitted]);

  const filteredQuizzes = quizzes.filter((q) => {
    return selectedSubject === 'All Subjects' || q.subject === selectedSubject;
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSecondsRemaining(quiz.timeLimitMinutes * 60);
    setIsSubmitted(false);
    setCalculatedScore(0);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalMarks = Math.round((correctCount / activeQuiz.questions.length) * activeQuiz.totalMarks);
    setCalculatedScore(finalMarks);
    setIsSubmitted(true);
    onCompleteQuiz(activeQuiz.id, finalMarks);
  };

  const handleAddQuestionToBuilder = () => {
    if (!newQuestionText.trim() || newOptions.some((o) => !o.trim())) {
      alert('Please fill out question text and all 4 options.');
      return;
    }

    const q: QuizQuestion = {
      id: `q_${Date.now()}_${createdQuestions.length}`,
      question: newQuestionText,
      options: [...newOptions],
      correctAnswerIndex: newCorrectOption,
      explanation: newExplanation || 'Official solution verified by departmental faculty.',
    };

    setCreatedQuestions((prev) => [...prev, q]);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewExplanation('');
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || createdQuestions.length === 0) {
      alert('Please provide a quiz title and at least 1 question.');
      return;
    }

    const newQz: Quiz = {
      id: `quiz_${Date.now()}`,
      schoolId: 'school_apex',
      title: newTitle,
      subject: newSubject,
      grade: 'Grade 10',
      chapter: 'Unit Evaluation',
      timeLimitMinutes: newLimit,
      totalMarks: createdQuestions.length * 5,
      dueDate: '2026-10-10',
      status: 'active',
      questions: createdQuestions,
    };

    onCreateQuiz(newQz);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setCreatedQuestions([]);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Quizzes & Formative MCQ Assessments
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Timed conceptual tests with instant evaluation, attempt verification, and answer explanations.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'admin') && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create MCQ Quiz</span>
          </button>
        )}
      </div>

      {/* Quiz Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz) => {
          const isCompleted = quiz.status === 'completed' || quiz.studentScore !== undefined;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="space-y-3">
                {/* Unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">{quiz.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{quiz.chapter}</span>
                  </div>
                  <span className="font-mono text-slate-600">{quiz.questions.length} MCQs</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{quiz.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quiz.timeLimitMinutes} Mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{quiz.totalMarks} Total Marks</span>
                  </div>
                </div>

                {isCompleted && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-emerald-900">
                      <span>Score Recorded</span>
                      <span className="font-mono text-emerald-700">
                        {quiz.studentScore ?? calculatedScore} / {quiz.totalMarks} (
                        {Math.round(((quiz.studentScore ?? calculatedScore) / quiz.totalMarks) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Due: {quiz.dueDate}
                </span>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isCompleted
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Review Answers</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Timed MCQ Quiz Simulator Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Top Bar of Quiz with Timer */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="truncate pr-4">
                <div className="text-[10px] uppercase font-semibold text-indigo-400">
                  {activeQuiz.subject} · {activeQuiz.chapter}
                </div>
                <h3 className="text-sm font-bold truncate">{activeQuiz.title}</h3>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {!isSubmitted ? (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
                      secondsRemaining < 120
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                        : 'bg-slate-800 text-emerald-400 border border-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(secondsRemaining)}</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold">
                    Score: {calculatedScore} / {activeQuiz.totalMarks}
                  </div>
                )}

                <button
                  onClick={() => setActiveQuiz(null)}
                  className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quiz Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Question Navigation Palette */}
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 overflow-x-auto">
                <span className="text-[11px] font-semibold text-slate-400 uppercase mr-2">
                  Question:
                </span>
                {activeQuiz.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswerIndex;
                  const isWrong = isSubmitted && isAnswered && !isCorrect;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer shrink-0 ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-500 text-white'
                            : isWrong
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-200 text-slate-600'
                          : isCurrent
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : isAnswered
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Current Question Display */}
              {(() => {
                const currentQ = activeQuiz.questions[currentQuestionIndex];
                const selectedOpt = selectedAnswers[currentQ.id];

                return (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs font-bold text-indigo-600 uppercase font-mono">
                        Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {Math.round(activeQuiz.totalMarks / activeQuiz.questions.length)} Marks
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {currentQ.question}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2.5 pt-2">
                      {currentQ.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';

                        if (isSubmitted) {
                          if (optIdx === currentQ.correctAnswerIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isSelected && optIdx !== currentQ.correctAnswerIndex) {
                            optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-medium';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQ.id, optIdx)}
                            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${optionStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'border-slate-300 text-slate-500'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isSubmitted && optIdx === currentQ.correctAnswerIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && optIdx !== currentQ.correctAnswerIndex && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Post-submit explanation */}
                    {isSubmitted && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Conceptual Explanation</span>
                          <span className="text-[10px] text-slate-500 font-normal">· Faculty Solution</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {currentQ.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Quiz Footer Navigation */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : !isSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit Exam</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    Done Reviewing
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Create Quiz Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Author New Timed MCQ Quiz</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thermodynamics & Heat Transfer Rapid Check"
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
                  <label className="block font-semibold text-slate-700 mb-1">Timer (Minutes)</label>
                  <input
                    type="number"
                    min={2}
                    max={60}
                    value={newLimit}
                    onChange={(e) => setNewLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-indigo-600"
                  />
                </div>
              </div>

              {/* Question authoring box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>Add Question #{createdQuestions.length + 1}</span>
                  <span className="font-mono text-indigo-600 text-[11px]">
                    {createdQuestions.length} Questions in Draft
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">Question Prompt</label>
                  <input
                    type="text"
                    placeholder="Enter question text..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-slate-600">
                    4 Multiple Choice Options (Select radio for correct answer)
                  </label>
                  {newOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={newCorrectOption === i}
                        onChange={() => setNewCorrectOption(i)}
                        className="cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newOptions];
                          updated[i] = e.target.value;
                          setNewOptions(updated);
                        }}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">Solution Explanation</label>
                  <input
                    type="text"
                    placeholder="Explanation shown to students after test completion..."
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-indigo-600"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddQuestionToBuilder}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium cursor-pointer"
                >
                  + Add Question to Quiz
                </button>
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
                  Publish Timed Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
