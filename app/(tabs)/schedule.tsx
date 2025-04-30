import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useFacultyStore } from '@/store/faculty-store';
import { DaySelector } from '@/components/schedule/DaySelector';
import { ScheduleItem } from '@/components/schedule/ScheduleItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar } from 'lucide-react-native';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    schedules, 
    fetchSchedules, 
    getSchedulesForDate,
    isLoading
  } = useFacultyStore();
  
  useEffect(() => {
    fetchSchedules();
    
    // Set today as the default selected date
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSchedules();
    setRefreshing(false);
  };
  
  const schedulesForSelectedDate = selectedDate ? getSchedulesForDate(selectedDate) : [];
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.daySelectorContainer}>
        <DaySelector 
          onSelectDate={setSelectedDate} 
          selectedDate={selectedDate}
        />
      </View>
      
      <View style={styles.dateHeaderContainer}>
        <Text style={styles.dateHeader}>
          {formatDate(selectedDate)}
        </Text>
      </View>
      
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading schedule...</Text>
          </View>
        ) : schedulesForSelectedDate.length > 0 ? (
          <View style={styles.scheduleContainer}>
            {schedulesForSelectedDate.map(schedule => (
              <ScheduleItem 
                key={schedule.id} 
                schedule={schedule} 
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No scheduled activities"
            description={`You don't have any activities scheduled for ${formatDate(selectedDate)}.`}
            icon={<Calendar size={48} color={colors.textSecondary} />}
          />
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
  daySelectorContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  scheduleContainer: {
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});