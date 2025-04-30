import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DevelopmentActivity } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { Calendar, ExternalLink } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface DevelopmentCardProps {
  activity: DevelopmentActivity;
  onPress?: (activity: DevelopmentActivity) => void;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ activity, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(activity);
    }
  };

  const getStatusVariant = (status: DevelopmentActivity['status']) => {
    switch (status) {
      case 'planned':
        return 'info';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getTypeVariant = (type: DevelopmentActivity['type']) => {
    switch (type) {
      case 'workshop':
        return 'primary';
      case 'conference':
        return 'secondary';
      case 'course':
        return 'info';
      case 'certification':
        return 'warning';
      case 'research':
        return 'error';
      case 'publication':
        return 'success';
      default:
        return 'primary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Badge 
          label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} 
          variant={getTypeVariant(activity.type)} 
        />
        <Badge 
          label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)} 
          variant={getStatusVariant(activity.status)} 
          size="small"
        />
      </View>
      
      <Text style={styles.title}>{activity.title}</Text>
      
      <Text style={styles.description} numberOfLines={2}>
        {activity.description}
      </Text>
      
      <View style={styles.dateContainer}>
        <Calendar size={14} color={colors.textSecondary} />
        <Text style={styles.dateText}>
          {formatDate(activity.startDate)}
          {activity.endDate ? ` - ${formatDate(activity.endDate)}` : ''}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={activity.progress} 
          showPercentage 
          color={
            activity.status === 'completed' 
              ? colors.success 
              : activity.status === 'in-progress' 
                ? colors.warning 
                : colors.primary
          }
        />
      </View>
      
      {activity.url && (
        <View style={styles.urlContainer}>
          <ExternalLink size={14} color={colors.primary} />
          <Text style={styles.urlText} numberOfLines={1}>
            {activity.url}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressContainer: {
    marginBottom: 12,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urlText: {
    fontSize: 12,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});