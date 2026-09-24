import { useState } from 'react';
import {
  UserRole,
  SchoolTenant,
  UserProfile,
  StudyResource,
  Assignment,
  Quiz,
  PreviousYearQuestion,
  Notice,
  CalendarEvent,
  ImportantLink,
} from './types.ts';
import {
  INITIAL_SCHOOLS,
  INITIAL_USERS,
  INITIAL_STUDY_RESOURCES,
  INITIAL_ASSIGNMENTS,
  INITIAL_QUIZZES,
  INITIAL_PYQS,
  INITIAL_NOTICES,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_IMPORTANT_LINKS,
} from './data/mockData.ts';

import { Header } from './components/common/Header.tsx';
import { Sidebar } from './components/common/Sidebar.tsx';
import { GlobalSearchModal } from './components/common/GlobalSearchModal.tsx';
import { ClientPitchModal } from './components/pitch/ClientPitchModal.tsx';
import { OnboardingWizardModal } from './components/onboarding/OnboardingWizardModal.tsx';

import { StudentDashboard } from './components/student/StudentDashboard.tsx';
import { TeacherDashboard } from './components/teacher/TeacherDashboard.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard.tsx';

import { StudyMaterialView } from './components/modules/StudyMaterialView.tsx';
import { AssignmentsView } from './components/modules/AssignmentsView.tsx';
import { QuizView } from './components/modules/QuizView.tsx';
import { PYQsView } from './components/modules/PYQsView.tsx';
import { NoticesView } from './components/modules/NoticesView.tsx';
import { CalendarView } from './components/modules/CalendarView.tsx';
import { LinksView } from './components/modules/LinksView.tsx';
import { PublicLandingView } from './components/public/PublicLandingView.tsx';

export default function App() {
  const [schools, setSchools] = useState<SchoolTenant[]>(INITIAL_SCHOOLS);
  const [currentSchool, setCurrentSchool] = useState<SchoolTenant>(INITIAL_SCHOOLS[0]);
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');

  const [isPublicMode, setIsPublicMode] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Core Data States
  const [studyResources, setStudyResources] = useState<StudyResource[]>(INITIAL_STUDY_RESOURCES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [pyqs, setPYQs] = useState<PreviousYearQuestion[]>(INITIAL_PYQS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [links, setLinks] = useState<ImportantLink[]>(INITIAL_IMPORTANT_LINKS);

  const currentUser = INITIAL_USERS[activeRole];

  // Role Switch Handler
  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    setCurrentView('dashboard');
    setIsPublicMode(false);
  };

  // School Switch Handler
  const handleSelectSchool = (school: SchoolTenant) => {
    setCurrentSchool(school);
  };

  // Navigate Handler
  const handleNavigate = (view: string, _itemId?: string) => {
    setCurrentView(view);
  };

  // Actions: Study Resources
  const handleAddResource = (res: StudyResource) => {
    setStudyResources((prev) => [res, ...prev]);
  };

  const handleToggleBookmark = (id: string) => {
    setStudyResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, bookmarked: !r.bookmarked } : r))
    );
  };

  // Actions: Assignments
  const handleSubmitAssignment = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              studentStatus: 'submitted',
              submittedAt: 'Just Now',
              studentSubmissionFile: fileName,
              totalSubmissions: a.totalSubmissions + 1,
            }
          : a
      )
    );
  };

  const handleGradeAssignment = (assignmentId: string, marks: number, feedback: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              studentStatus: 'graded',
              obtainedMarks: marks,
              teacherFeedback: feedback,
            }
          : a
      )
    );
  };

  const handleCreateAssignment = (asg: Assignment) => {
    setAssignments((prev) => [asg, ...prev]);
  };

  // Actions: Quizzes
  const handleCompleteQuiz = (quizId: string, score: number) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId
          ? {
              ...q,
              studentScore: score,
              studentAttemptedAt: 'Just Now',
              status: 'completed',
            }
          : q
      )
    );
  };

  const handleCreateQuiz = (quiz: Quiz) => {
    setQuizzes((prev) => [quiz, ...prev]);
  };

  // Actions: PYQ
  const handleAddPYQ = (pyq: PreviousYearQuestion) => {
    setPYQs((prev) => [pyq, ...prev]);
  };

  // Actions: Notices
  const handleAddNotice = (notice: Notice) => {
    setNotices((prev) => [notice, ...prev]);
  };

  // Actions: Calendar Events
  const handleAddEvent = (evt: CalendarEvent) => {
    setEvents((prev) => [evt, ...prev]);
  };

  // Actions: Important Links
  const handleAddLink = (lnk: ImportantLink) => {
    setLinks((prev) => [lnk, ...prev]);
  };

  // Actions: Update School Settings
  const handleUpdateSchoolSettings = (updated: Partial<SchoolTenant>) => {
    const updatedSchool = { ...currentSchool, ...updated };
    setCurrentSchool(updatedSchool);
    setSchools((prev) => prev.map((s) => (s.id === currentSchool.id ? updatedSchool : s)));
  };

  // Actions: Super Admin School Management
  const handleToggleSchoolStatus = (schoolId: string) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === schoolId
          ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' }
          : s
      )
    );
  };

  const handleSchoolCreated = (newSchool: SchoolTenant) => {
    setSchools((prev) => [newSchool, ...prev]);
    setCurrentSchool(newSchool);
  };

  const pendingAssignmentsCount = assignments.filter((a) => a.studentStatus === 'pending').length;
  const unreadNoticesCount = notices.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Header */}
      <Header
        currentSchool={currentSchool}
        schools={schools}
        currentUser={currentUser}
        activeRole={activeRole}
        onSelectRole={handleSelectRole}
        onSelectSchool={handleSelectSchool}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPitch={() => setIsPitchOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onTogglePublicWebsite={() => setIsPublicMode(!isPublicMode)}
        isPublicMode={isPublicMode}
      />

      {/* Main View Port */}
      {isPublicMode ? (
        <PublicLandingView
          onEnterPortal={(role) => {
            setActiveRole(role);
            setIsPublicMode(false);
          }}
          onOpenPitch={() => setIsPitchOpen(true)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Role Aware Sidebar */}
          <Sidebar
            activeRole={activeRole}
            currentView={currentView}
            onSelectView={setCurrentView}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            unreadNoticesCount={unreadNoticesCount}
            pendingAssignmentsCount={pendingAssignmentsCount}
          />

          {/* Main Content Workspace */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
            {/* 1. Dashboards */}
            {currentView === 'dashboard' && (
              <>
                {activeRole === 'student' && (
                  <StudentDashboard
                    user={currentUser}
                    resources={studyResources}
                    assignments={assignments}
                    quizzes={quizzes}
                    notices={notices}
                    events={events}
                    onNavigate={handleNavigate}
                    onSelectSubject={setSelectedSubject}
                  />
                )}
                {activeRole === 'teacher' && (
                  <TeacherDashboard
                    user={currentUser}
                    resources={studyResources}
                    assignments={assignments}
                    quizzes={quizzes}
                    onNavigate={handleNavigate}
                    selectedSubject={selectedSubject}
                    onSelectSubject={setSelectedSubject}
                  />
                )}
                {activeRole === 'admin' && (
                  <AdminDashboard
                    school={currentSchool}
                    user={currentUser}
                    onNavigate={handleNavigate}
                    onUpdateSchoolSettings={handleUpdateSchoolSettings}
                  />
                )}
                {activeRole === 'superadmin' && (
                  <SuperAdminDashboard
                    schools={schools}
                    user={currentUser}
                    onOpenOnboarding={() => setIsOnboardingOpen(true)}
                    onToggleSchoolStatus={handleToggleSchoolStatus}
                    onSelectSchool={handleSelectSchool}
                  />
                )}
              </>
            )}

            {/* 2. Core Academic Modules */}
            {(currentView === 'study_material' || currentView === 'bookmarks') && (
              <StudyMaterialView
                resources={
                  currentView === 'bookmarks'
                    ? studyResources.filter((r) => r.bookmarked)
                    : studyResources
                }
                activeRole={activeRole}
                selectedSubject={selectedSubject}
                onSelectSubject={setSelectedSubject}
                onAddResource={handleAddResource}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {(currentView === 'assignments' || currentView === 'submissions') && (
              <AssignmentsView
                assignments={assignments}
                activeRole={activeRole}
                selectedSubject={selectedSubject}
                onSubmitAssignment={handleSubmitAssignment}
                onGradeAssignment={handleGradeAssignment}
                onCreateAssignment={handleCreateAssignment}
              />
            )}

            {currentView === 'quizzes' && (
              <QuizView
                quizzes={quizzes}
                activeRole={activeRole}
                selectedSubject={selectedSubject}
                onCompleteQuiz={handleCompleteQuiz}
                onCreateQuiz={handleCreateQuiz}
              />
            )}

            {currentView === 'pyqs' && (
              <PYQsView
                pyqs={pyqs}
                activeRole={activeRole}
                selectedSubject={selectedSubject}
                onSelectSubject={setSelectedSubject}
                onAddPYQ={handleAddPYQ}
              />
            )}

            {currentView === 'notices' && (
              <NoticesView
                notices={notices}
                activeRole={activeRole}
                onAddNotice={handleAddNotice}
              />
            )}

            {currentView === 'calendar' && (
              <CalendarView
                events={events}
                activeRole={activeRole}
                onAddEvent={handleAddEvent}
              />
            )}

            {currentView === 'important_links' && (
              <LinksView
                links={links}
                activeRole={activeRole}
                onAddLink={handleAddLink}
              />
            )}

            {/* Admin and Super Admin Secondary Views */}
            {['students', 'teachers', 'classes', 'subjects', 'content_audit', 'analytics', 'settings'].includes(
              currentView
            ) && (
              <AdminDashboard
                school={currentSchool}
                user={currentUser}
                onNavigate={handleNavigate}
                onUpdateSchoolSettings={handleUpdateSchoolSettings}
              />
            )}

            {['schools', 'subscriptions', 'platform_analytics', 'security_logs', 'support', 'platform_settings'].includes(
              currentView
            ) && (
              <SuperAdminDashboard
                schools={schools}
                user={currentUser}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
                onToggleSchoolStatus={handleToggleSchoolStatus}
                onSelectSchool={handleSelectSchool}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resources={studyResources}
        assignments={assignments}
        quizzes={quizzes}
        pyqs={pyqs}
        notices={notices}
        onNavigateToItem={handleNavigate}
      />

      <ClientPitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        onSelectRole={handleSelectRole}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <OnboardingWizardModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSchoolCreated={handleSchoolCreated}
      />
    </div>
  );
}
