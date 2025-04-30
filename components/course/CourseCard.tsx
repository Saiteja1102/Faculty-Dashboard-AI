import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Course } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { Users, Clock } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';

interface CourseCardProps {
  course: Course;
  onPress?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(course);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Badge label={course.code} variant="primary" />
        <Badge label={course.department} variant="secondary" size="small" />
      </View>
      
      <Text style={styles.title}>{course.title}</Text>
      
      <Text style={styles.description} numberOfLines={2}>
        {course.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Users size={16} color={colors.textSecondary} />
          <Text style={styles.footerText}>{course.students} Students</Text>
        </View>
        
        <View style={styles.footerItem}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.footerText}>{course.credits} Credits</Text>
        </View>
      </View>
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
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});