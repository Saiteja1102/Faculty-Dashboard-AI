export interface Faculty {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    joinDate: string;
    avatar: string;
    bio: string;
  }
  
  export interface Course {
    id: string;
    title: string;
    code: string;
    department: string;
    credits: number;
    description: string;
    schedule: Schedule[];
    students: number;
    facultyId: string;
  }
  
  export interface Schedule {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    date: string;
    location: string;
    type: 'class' | 'meeting' | 'office-hours' | 'development' | 'personal';
    courseId?: string;
    description?: string;
    color?: string;
  }
  
  export interface DevelopmentActivity {
    id: string;
    title: string;
    type: 'workshop' | 'conference' | 'course' | 'certification' | 'research' | 'publication';
    status: 'planned' | 'in-progress' | 'completed';
    startDate: string;
    endDate?: string;
    description: string;
    location?: string;
    url?: string;
    attachments?: string[];
    progress: number;
  }
  
  export interface Feedback {
    id: string;
    courseId: string;
    type: 'student' | 'peer' | 'supervisor';
    rating: number;
    comment: string;
    date: string;
    anonymous: boolean;
    reviewerId?: string;
  }
  
  export interface PerformanceMetric {
    id: string;
    facultyId: string;
    academicYear: string;
    teachingScore: number;
    researchScore: number;
    serviceScore: number;
    overallScore: number;
    strengths: string[];
    areasForImprovement: string[];
    goals: string[];
  }