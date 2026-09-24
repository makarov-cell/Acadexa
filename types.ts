export type UserRole = 'student' | 'teacher' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  schoolId: string;
  grade?: string;
  section?: string;
  rollNumber?: string;
  department?: string;
  subjects?: string[];
}

export interface SchoolTenant {
  id: string;
  name: string;
  code: string;
  logo: string;
  tagline: string;
  accentColor: string;
  plan: 'Starter' | 'Standard' | 'Enterprise';
  status: 'active' | 'onboarding' | 'suspended';
  studentCount: number;
  teacherCount: number;
  storageUsedGb: number;
  storageLimitGb: number;
  academicYear: string;
  classesCount: number;
  joinedDate: string;
}

export interface StudyResource {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  chapter: string;
  resourceType: 'pdf' | 'notes' | 'presentation' | 'video' | 'worksheet' | 'ebook';
  fileSize: string;
  authorName: string;
  authorRole: string;
  uploadDate: string;
  downloadCount: number;
  tags: string[];
  externalUrl?: string;
  bookmarked?: boolean;
}

export interface Assignment {
  id: string;
  schoolId: string;
  title: string;
  subject: string;
  grade: string;
  chapter: string;
  assignedBy: string;
  dueDate: string;
  maxMarks: number;
  instructions: string;
  attachmentName?: string;
  totalSubmissions: number;
  totalStudents: number;
  studentStatus?: 'pending' | 'submitted' | 'graded';
  obtainedMarks?: number;
  submittedAt?: string;
  studentSubmissionFile?: string;
  teacherFeedback?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  schoolId: string;
  title: string;
  subject: string;
  grade: string;
  chapter: string;
  timeLimitMinutes: number;
  totalMarks: number;
  dueDate: string;
  questions: QuizQuestion[];
  status: 'upcoming' | 'active' | 'completed';
  studentScore?: number;
  studentAttemptedAt?: string;
}

export interface PreviousYearQuestion {
  id: string;
  schoolId: string;
  title: string;
  grade: string;
  subject: string;
  examType: 'Mid-Term' | 'Final Board' | 'Preliminary' | 'Unit Test';
  year: number;
  fileSize: string;
  hasSolution: boolean;
  downloads: number;
  uploadedBy: string;
}

export interface Notice {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  priority: 'normal' | 'important' | 'urgent';
  targetAudience: 'All' | 'Teachers' | 'Students' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  publishDate: string;
  expiryDate: string;
  authorName: string;
  authorRole: string;
  attachmentName?: string;
}

export interface CalendarEvent {
  id: string;
  schoolId: string;
  title: string;
  category: 'exam' | 'assignment' | 'quiz' | 'holiday' | 'event';
  date: string; // YYYY-MM-DD
  time?: string;
  description: string;
  targetGrade?: string;
}

export interface ImportantLink {
  id: string;
  schoolId: string;
  title: string;
  category: 'Virtual Labs' | 'Digital Library' | 'Mathematics' | 'Research' | 'Tools';
  targetGrade: string;
  url: string;
  description: string;
}
