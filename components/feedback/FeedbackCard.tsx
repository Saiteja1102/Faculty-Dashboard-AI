import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feedback } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { Calendar, Star } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';

interface FeedbackCardProps {
  feedback: Feedback;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeVariant = (type: Feedback['type']) => {
    switch (type) {
      case 'student':
        return 'primary';
      case 'peer':
        return 'secondary';
      case 'supervisor':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} color={colors.warning} fill={colors.warning} />);
      } else if (i === fullStars && hasHalfStar) {
        // For simplicity, we'll just use a full star for half stars
        stars.push(<Star key={i} size={16} color={colors.warning} fill={colors.warning} opacity={0.5} />);
      } else {
        stars.push(<Star key={i} size={16} color={colors.textTertiary} />);
      }
    }
    
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Badge 
          label={feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)} 
          variant={getTypeVariant(feedback.type)} 
        />
        
        <View style={styles.dateContainer}>
          <Calendar size={14} color={colors.textSecondary} />
          <Text style={styles.dateText}>{formatDate(feedback.date)}</Text>
        </View>
      </View>
      
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {renderStars(feedback.rating)}
        </View>
        <Text style={styles.ratingText}>{feedback.rating.toFixed(1)}</Text>
      </View>
      
      <Text style={styles.comment}>"{feedback.comment}"</Text>
      
      {!feedback.anonymous && feedback.reviewerId && (
        <Text style={styles.reviewer}>- Reviewer ID: {feedback.reviewerId}</Text>
      )}
    </View>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.warning,
  },
  comment: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});