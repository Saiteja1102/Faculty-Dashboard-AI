import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Schedule } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { Clock, MapPin } from 'lucide-react-native';

interface ScheduleItemProps {
  schedule: Schedule;
  onPress?: (schedule: Schedule) => void;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, onPress }) => {
  const getScheduleTypeColor = (type: Schedule['type']) => {
    switch (type) {
      case 'class':
        return colors.primary;
      case 'meeting':
        return colors.info;
      case 'office-hours':
        return colors.success;
      case 'development':
        return colors.secondary;
      case 'personal':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handlePress = () => {
    if (onPress) {
      onPress(schedule);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: schedule.color || getScheduleTypeColor(schedule.type) }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(schedule.startTime)}</Text>
        <Text style={styles.time}>{formatTime(schedule.endTime)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{schedule.title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{schedule.location}</Text>
          </View>
        </View>
        
        {schedule.description && (
          <Text style={styles.description} numberOfLines={2}>
            {schedule.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
  },
  timeContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  detailsContainer: {
    marginTop: 4,
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 6,
  },
});