import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useFacultyStore } from '@/store/faculty-store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScheduleItem } from '@/components/schedule/ScheduleItem';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import { Users, Clock, BookOpen, Star } from 'lucide-react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'feedback'>('schedule');
  
  const { 
    getCourse, 
    fetchCourses, 
    fetchSchedules,
    fetchFeedback,
    getFeedbackForCourse
  } = useFacultyStore();
  
  useEffect(() => {
    fetchCourses();
    fetchSchedules();
    fetchFeedback();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchCourses(),
      fetchSchedules(),
      fetchFeedback()
    ]);
    setRefreshing(false);
  };
  
  const course = getCourse(id);
  const courseFeedback = getFeedbackForCourse(id);
  
  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Course not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
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
        <View style={styles.headerContainer}>
          <View style={styles.badgeContainer}>
            <Badge label={course.code} variant="primary" />
            <Badge label={course.department} variant="secondary" size="small" />
          </View>
          
          <Text style={styles.title}>{course.title}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{course.students} Students</Text>
            </View>
            
            <View style={styles.statItem}>
              <Clock size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{course.credits} Credits</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{course.description}</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <View
            style={[
              styles.tabButton,
              activeTab === 'schedule' && styles.activeTabButton,
            ]}
          >
            <Clock 
              size={16} 
              color={activeTab === 'schedule' ? colors.primary : colors.textSecondary} 
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'schedule' && styles.activeTabButtonText,
              ]}
              onPress={() => setActiveTab('schedule')}
            >
              Schedule
            </Text>
          </View>
          
          <View
            style={[
              styles.tabButton,
              activeTab === 'feedback' && styles.activeTabButton,
            ]}
          >
            <Star 
              size={16} 
              color={activeTab === 'feedback' ? colors.primary : colors.textSecondary} 
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'feedback' && styles.activeTabButtonText,
              ]}
              onPress={() => setActiveTab('feedback')}
            >
              Feedback
            </Text>
          </View>
        </View>
        
        {activeTab === 'schedule' ? (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Course Schedule</Text>
            {course.schedule && course.schedule.length > 0 ? (
              course.schedule.map(schedule => (
                <ScheduleItem key={schedule.id} schedule={schedule} />
              ))
            ) : (
              <Card>
                <Text style={styles.emptyText}>No scheduled sessions for this course</Text>
              </Card>
            )}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Course Feedback</Text>
            {courseFeedback.length > 0 ? (
              courseFeedback.map(feedback => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))
            ) : (
              <Card>
                <Text style={styles.emptyText}>No feedback available for this course</Text>
              </Card>
            )}
          </View>
        )}
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
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: colors.cardLight,
  },
  tabButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
});