import { Faculty, Course, Schedule, DevelopmentActivity, Feedback, PerformanceMetric } from '@/types/faculty';
import { colors } from '@/constants/colors';

export const currentUser: Faculty = {
  id: 'f1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  phone: '(555) 123-4567',
  department: 'Computer Science',
  position: 'Associate Professor',
  joinDate: '2018-08-15',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  bio: 'Dr. Sarah Johnson is an Associate Professor in the Computer Science department with expertise in artificial intelligence and machine learning. She has published over 30 papers in top-tier conferences and journals.'
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Introduction to Computer Science',
    code: 'CS101',
    department: 'Computer Science',
    credits: 3,
    description: 'An introductory course covering the fundamentals of computer science, including programming basics, algorithms, and data structures.',
    schedule: [],
    students: 120,
    facultyId: 'f1'
  },
  {
    id: 'c2',
    title: 'Machine Learning',
    code: 'CS450',
    department: 'Computer Science',
    credits: 4,
    description: 'Advanced course on machine learning algorithms, neural networks, and practical applications in data science.',
    schedule: [],
    students: 45,
    facultyId: 'f1'
  },
  {
    id: 'c3',
    title: 'Artificial Intelligence',
    code: 'CS460',
    department: 'Computer Science',
    credits: 4,
    description: 'Comprehensive study of artificial intelligence concepts, including search algorithms, knowledge representation, and reasoning.',
    schedule: [],
    students: 38,
    facultyId: 'f1'
  },
  {
    id: 'c4',
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    department: 'Computer Science',
    credits: 3,
    description: 'In-depth exploration of data structures and algorithms, focusing on efficiency and optimization.',
    schedule: [],
    students: 85,
    facultyId: 'f1'
  }
];

// Generate dates for the current week
const getDateForDayOffset = (dayOffset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

export const schedules: Schedule[] = [
  {
    id: 's1',
    title: 'CS101 Lecture',
    startTime: '09:00',
    endTime: '10:30',
    date: getDateForDayOffset(1),
    location: 'Science Building, Room 301',
    type: 'class',
    courseId: 'c1',
    color: colors.primary
  },
  {
    id: 's2',
    title: 'CS450 Lecture',
    startTime: '13:00',
    endTime: '14:30',
    date: getDateForDayOffset(1),
    location: 'Engineering Hall, Room 105',
    type: 'class',
    courseId: 'c2',
    color: colors.secondary
  },
  {
    id: 's3',
    title: 'Department Meeting',
    startTime: '15:00',
    endTime: '16:00',
    date: getDateForDayOffset(2),
    location: 'Admin Building, Conference Room A',
    type: 'meeting',
    description: 'Weekly department meeting to discuss curriculum updates and research initiatives.',
    color: colors.info
  },
  {
    id: 's4',
    title: 'Office Hours',
    startTime: '10:00',
    endTime: '12:00',
    date: getDateForDayOffset(3),
    location: 'Science Building, Office 210',
    type: 'office-hours',
    description: 'Open office hours for students to ask questions and get help with assignments.',
    color: colors.success
  },
  {
    id: 's5',
    title: 'CS460 Lecture',
    startTime: '09:00',
    endTime: '10:30',
    date: getDateForDayOffset(3),
    location: 'Science Building, Room 305',
    type: 'class',
    courseId: 'c3',
    color: colors.warning
  },
  {
    id: 's6',
    title: 'Research Meeting',
    startTime: '14:00',
    endTime: '15:30',
    date: getDateForDayOffset(4),
    location: 'Research Lab, Building B',
    type: 'meeting',
    description: 'Meeting with research assistants to discuss progress on the ML project.',
    color: colors.info
  },
  {
    id: 's7',
    title: 'AI Workshop',
    startTime: '09:00',
    endTime: '16:00',
    date: getDateForDayOffset(5),
    location: 'Conference Center',
    type: 'development',
    description: 'Full-day workshop on recent advances in AI and their applications.',
    color: colors.secondary
  }
];

// Add schedules to courses
courses.forEach(course => {
  course.schedule = schedules.filter(s => s.courseId === course.id);
});

export const developmentActivities: DevelopmentActivity[] = [
  {
    id: 'd1',
    title: 'Advanced Machine Learning Certification',
    type: 'certification',
    status: 'in-progress',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    description: 'Professional certification in advanced machine learning techniques and applications.',
    url: 'https://example.com/certification',
    progress: 65
  },
  {
    id: 'd2',
    title: 'International Conference on AI',
    type: 'conference',
    status: 'planned',
    startDate: '2023-11-10',
    endDate: '2023-11-12',
    description: 'Presenting research paper on "Neural Networks in Educational Applications".',
    location: 'San Francisco, CA',
    progress: 30
  },
  {
    id: 'd3',
    title: 'Research Publication: "Advancements in ML for Education"',
    type: 'publication',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-06-30',
    description: 'Research paper published in the Journal of Educational Technology.',
    url: 'https://example.com/journal/paper123',
    progress: 100
  },
  {
    id: 'd4',
    title: 'Faculty Teaching Workshop',
    type: 'workshop',
    status: 'completed',
    startDate: '2023-08-20',
    endDate: '2023-08-21',
    description: 'Workshop on innovative teaching methods and student engagement strategies.',
    location: 'University Campus, Building E',
    progress: 100
  }
];

export const feedback: Feedback[] = [
  {
    id: 'fb1',
    courseId: 'c1',
    type: 'student',
    rating: 4.7,
    comment: "Dr. Johnson explains complex concepts in a way that's easy to understand. Her enthusiasm for the subject is contagious!",
    date: '2023-05-15',
    anonymous: true
  },
  {
    id: 'fb2',
    courseId: 'c2',
    type: 'student',
    rating: 4.5,
    comment: "The machine learning course was challenging but incredibly rewarding. Dr. Johnson provides excellent support and resources.",
    date: '2023-05-16',
    anonymous: true
  },
  {
    id: 'fb3',
    courseId: 'c3',
    type: 'peer',
    rating: 4.8,
    comment: "Sarah's curriculum design for the AI course is exemplary. Her integration of theory and practical applications gives students a comprehensive understanding of the field.",
    date: '2023-06-10',
    anonymous: false,
    reviewerId: 'f2'
  },
  {
    id: 'fb4',
    courseId: 'c1',
    type: 'supervisor',
    rating: 4.9,
    comment: "Dr. Johnson consistently demonstrates excellence in teaching and student mentorship. Her introductory CS course has become a model for the department.",
    date: '2023-06-20',
    anonymous: false,
    reviewerId: 'f3'
  }
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'pm1',
    facultyId: 'f1',
    academicYear: '2022-2023',
    teachingScore: 4.8,
    researchScore: 4.5,
    serviceScore: 4.2,
    overallScore: 4.6,
    strengths: [
      'Exceptional teaching evaluations',
      'Strong research publication record',
      'Effective student mentorship'
    ],
    areasForImprovement: [
      'Increase grant application submissions',
      'Expand interdisciplinary collaborations'
    ],
    goals: [
      'Publish 3 papers in top-tier journals',
      'Develop new graduate-level course',
      'Secure external research funding'
    ]
  },
  {
    id: 'pm2',
    facultyId: 'f1',
    academicYear: '2021-2022',
    teachingScore: 4.6,
    researchScore: 4.3,
    serviceScore: 4.0,
    overallScore: 4.4,
    strengths: [
      'Innovative teaching methods',
      'Quality research output',
      'Department committee contributions'
    ],
    areasForImprovement: [
      'Enhance research visibility',
      'Develop more industry partnerships'
    ],
    goals: [
      'Attend 2 international conferences',
      'Revise undergraduate curriculum',
      'Mentor junior faculty members'
    ]
  }
];