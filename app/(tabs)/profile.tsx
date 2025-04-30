import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { useFacultyStore } from '@/store/faculty-store';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { PerformanceMetricCard } from '@/components/performance/PerformanceMetricCard';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import { Button } from '@/components/ui/Button';
import { LogOut, Star, TrendingUp } from 'lucide-react-native';

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'performance' | 'feedback'>('performance');
  
  const { user, logout } = useAuthStore();
  const { 
    performanceMetrics, 
    feedback, 
    fetchPerformanceMetrics, 
    fetchFeedback 
  } = useFacultyStore();
  
  useEffect(() => {
    fetchPerformanceMetrics();
    fetchFeedback();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchPerformanceMetrics(),
      fetchFeedback()
    ]);
    setRefreshing(false);
  };
  
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>User not found</Text>
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
        <ProfileHeader faculty={user} />
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'performance' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('performance')}
          >
            <TrendingUp 
              size={16} 
              color={activeTab === 'performance' ? colors.primary : colors.textSecondary} 
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'performance' && styles.activeTabButtonText,
              ]}
            >
              Performance
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'feedback' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('feedback')}
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
            >
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'performance' ? (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>
            {performanceMetrics.length > 0 ? (
              performanceMetrics.map(metric => (
                <PerformanceMetricCard key={metric.id} metric={metric} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No performance metrics available</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Recent Feedback</Text>
            {feedback.length > 0 ? (
              feedback.map(item => (
                <FeedbackCard key={item.id} feedback={item} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No feedback available</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.logoutContainer}>
          <Button 
            title="Log Out" 
            onPress={logout} 
            variant="outline"
            icon={<LogOut size={16} color={colors.primary} />}
          />
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
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  logoutContainer: {
    padding: 16,
    marginTop: 16,
  },
});