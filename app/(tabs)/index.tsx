import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { useFacultyStore } from '@/store/faculty-store';
import { Card } from '@/components/ui/Card';
import { ScheduleItem } from '@/components/schedule/ScheduleItem';
import { CourseCard } from '@/components/course/CourseCard';
import { DevelopmentCard } from '@/components/development/DevelopmentCard';
import { PerformanceMetricCard } from '@/components/performance/PerformanceMetricCard';
import { Button } from '@/components/ui/Button';
import { Calendar, BookOpen, Award, TrendingUp } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const { user, isAuthenticated, login } = useAuthStore();
  const { 
    schedules, 
    courses, 
    developmentActivities, 
    performanceMetrics,
    fetchSchedules,
    fetchCourses,
    fetchDevelopmentActivities,
    fetchPerformanceMetrics,
    getSchedulesForDate,
    getLatestPerformanceMetric
  } = useFacultyStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      login();
    }
    
    fetchSchedules();
    fetchCourses();
    fetchDevelopmentActivities();
    fetchPerformanceMetrics();
  }, [isAuthenticated]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchSchedules(),
      fetchCourses(),
      fetchDevelopmentActivities(),
      fetchPerformanceMetrics()
    ]);
    setRefreshing(false);
  };
  
  const today = new Date().toISOString().split('T')[0];
  const todaySchedules = getSchedulesForDate(today);
  const latestPerformanceMetric = getLatestPerformanceMetric();
  
  const inProgressDevelopment = developmentActivities.filter(
    activity => activity.status === 'in-progress'
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {user && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Welcome back, {user.name.split(' ')[0]}
            </Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        )}
        
        {/* Today's Schedule */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Calendar size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
            </View>
            <Button 
              title="View All" 
              variant="ghost" 
              size="small" 
              onPress={() => router.push('/schedule')}
            />
          </View>
          
          {todaySchedules.length > 0 ? (
            <View style={styles.scheduleContainer}>
              {todaySchedules.map(schedule => (
                <ScheduleItem 
                  key={schedule.id} 
                  schedule={schedule} 
                />
              ))}
            </View>
          ) : (
            <Card>
              <Text style={styles.emptyText}>No scheduled activities for today</Text>
            </Card>
          )}
        </View>
        
        {/* Courses */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BookOpen size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Your Courses</Text>
            </View>
            <Button 
              title="View All" 
              variant="ghost" 
              size="small" 
              onPress={() => router.push('/courses')}
            />
          </View>
          
          {courses.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {courses.slice(0, 3).map(course => (
                <View key={course.id} style={styles.courseCardContainer}>
                  <CourseCard 
                    course={course} 
                    onPress={(course) => router.push(`/course/${course.id}`)}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Card>
              <Text style={styles.emptyText}>No courses assigned</Text>
            </Card>
          )}
        </View>
        
        {/* Development Activities */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Award size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Professional Development</Text>
            </View>
            <Button 
              title="View All" 
              variant="ghost" 
              size="small" 
              onPress={() => router.push('/development')}
            />
          </View>
          
          {inProgressDevelopment.length > 0 ? (
            <View>
              {inProgressDevelopment.slice(0, 2).map(activity => (
                <DevelopmentCard 
                  key={activity.id} 
                  activity={activity} 
                  onPress={(activity) => router.push(`/development/${activity.id}`)}
                />
              ))}
            </View>
          ) : (
            <Card>
              <Text style={styles.emptyText}>No in-progress development activities</Text>
            </Card>
          )}
        </View>
        
        {/* Performance Metrics */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <TrendingUp size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Performance Overview</Text>
            </View>
          </View>
          
          {latestPerformanceMetric ? (
            <PerformanceMetricCard metric={latestPerformanceMetric} />
          ) : (
            <Card>
              <Text style={styles.emptyText}>No performance metrics available</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  scheduleContainer: {
    gap: 8,
  },
  horizontalScrollContent: {
    paddingRight: 16,
  },
  courseCardContainer: {
    width: 280,
    marginRight: 16,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
});