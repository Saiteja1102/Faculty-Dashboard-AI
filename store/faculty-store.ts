import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Course, Schedule, DevelopmentActivity, Feedback, PerformanceMetric } from '@/types/faculty';
import { courses, schedules, developmentActivities, feedback, performanceMetrics } from '@/mocks/faculty';

interface FacultyState {
  courses: Course[];
  schedules: Schedule[];
  developmentActivities: DevelopmentActivity[];
  feedback: Feedback[];
  performanceMetrics: PerformanceMetric[];
  isLoading: boolean;
  
  // Course actions
  fetchCourses: () => Promise<void>;
  getCourse: (id: string) => Course | undefined;
  
  // Schedule actions
  fetchSchedules: () => Promise<void>;
  addSchedule: (schedule: Schedule) => Promise<void>;
  updateSchedule: (schedule: Schedule) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
  getSchedulesForDate: (date: string) => Schedule[];
  getSchedulesForWeek: (startDate: string) => Schedule[];
  
  // Development actions
  fetchDevelopmentActivities: () => Promise<void>;
  addDevelopmentActivity: (activity: DevelopmentActivity) => Promise<void>;
  updateDevelopmentActivity: (activity: DevelopmentActivity) => Promise<void>;
  deleteDevelopmentActivity: (id: string) => Promise<void>;
  
  // Feedback actions
  fetchFeedback: () => Promise<void>;
  getFeedbackForCourse: (courseId: string) => Feedback[];
  
  // Performance actions
  fetchPerformanceMetrics: () => Promise<void>;
  getLatestPerformanceMetric: () => PerformanceMetric | undefined;
}

export const useFacultyStore = create<FacultyState>()(
  persist(
    (set, get) => ({
      courses: [],
      schedules: [],
      developmentActivities: [],
      feedback: [],
      performanceMetrics: [],
      isLoading: false,
      
      // Course actions
      fetchCourses: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ courses, isLoading: false });
      },
      
      getCourse: (id: string) => {
        return get().courses.find(course => course.id === id);
      },
      
      // Schedule actions
      fetchSchedules: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ schedules, isLoading: false });
      },
      
      addSchedule: async (schedule: Schedule) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          schedules: [...state.schedules, schedule],
          isLoading: false 
        }));
      },
      
      updateSchedule: async (schedule: Schedule) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          schedules: state.schedules.map(s => s.id === schedule.id ? schedule : s),
          isLoading: false 
        }));
      },
      
      deleteSchedule: async (id: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          schedules: state.schedules.filter(s => s.id !== id),
          isLoading: false 
        }));
      },
      
      getSchedulesForDate: (date: string) => {
        return get().schedules.filter(s => s.date === date);
      },
      
      getSchedulesForWeek: (startDate: string) => {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setDate(end.getDate() + 6);
        
        return get().schedules.filter(s => {
          const scheduleDate = new Date(s.date);
          return scheduleDate >= start && scheduleDate <= end;
        });
      },
      
      // Development actions
      fetchDevelopmentActivities: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ developmentActivities, isLoading: false });
      },
      
      addDevelopmentActivity: async (activity: DevelopmentActivity) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          developmentActivities: [...state.developmentActivities, activity],
          isLoading: false 
        }));
      },
      
      updateDevelopmentActivity: async (activity: DevelopmentActivity) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          developmentActivities: state.developmentActivities.map(a => 
            a.id === activity.id ? activity : a
          ),
          isLoading: false 
        }));
      },
      
      deleteDevelopmentActivity: async (id: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set(state => ({ 
          developmentActivities: state.developmentActivities.filter(a => a.id !== id),
          isLoading: false 
        }));
      },
      
      // Feedback actions
      fetchFeedback: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ feedback, isLoading: false });
      },
      
      getFeedbackForCourse: (courseId: string) => {
        return get().feedback.filter(f => f.courseId === courseId);
      },
      
      // Performance actions
      fetchPerformanceMetrics: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ performanceMetrics, isLoading: false });
      },
      
      getLatestPerformanceMetric: () => {
        const metrics = get().performanceMetrics;
        if (metrics.length === 0) return undefined;
        
        return metrics.reduce((latest, current) => {
          return current.academicYear > latest.academicYear ? current : latest;
        }, metrics[0]);
      },
    }),
    {
      name: 'faculty-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        courses: state.courses,
        schedules: state.schedules,
        developmentActivities: state.developmentActivities,
        feedback: state.feedback,
        performanceMetrics: state.performanceMetrics,
      }),
    }
  )
);