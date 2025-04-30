import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PerformanceMetric } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface PerformanceMetricCardProps {
  metric: PerformanceMetric;
}

export const PerformanceMetricCard: React.FC<PerformanceMetricCardProps> = ({ metric }) => {
  const renderMetricItem = (label: string, score: number, color: string) => (
    <View style={styles.metricItem}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={[styles.metricScore, { color }]}>{score.toFixed(1)}</Text>
      </View>
      <ProgressBar progress={score * 20} color={color} />
    </View>
  );

  const renderList = (title: string, items: string[]) => (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listBullet}>•</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Review</Text>
        <Text style={styles.academicYear}>{metric.academicYear}</Text>
      </View>
      
      <View style={styles.overallContainer}>
        <Text style={styles.overallLabel}>Overall Score</Text>
        <Text style={styles.overallScore}>{metric.overallScore.toFixed(1)}</Text>
        <ProgressBar 
          progress={metric.overallScore * 20} 
          color={colors.primary} 
          height={10}
          showPercentage
        />
      </View>
      
      <View style={styles.metricsContainer}>
        {renderMetricItem('Teaching', metric.teachingScore, colors.success)}
        {renderMetricItem('Research', metric.researchScore, colors.info)}
        {renderMetricItem('Service', metric.serviceScore, colors.secondary)}
      </View>
      
      <View style={styles.detailsContainer}>
        {renderList('Strengths', metric.strengths)}
        {renderList('Areas for Improvement', metric.areasForImprovement)}
        {renderList('Goals', metric.goals)}
      </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  academicYear: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  overallContainer: {
    marginBottom: 20,
    backgroundColor: colors.cardLight,
    padding: 12,
    borderRadius: 8,
  },
  overallLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  overallScore: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  metricsContainer: {
    marginBottom: 20,
    gap: 12,
  },
  metricItem: {
    gap: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  metricScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailsContainer: {
    gap: 16,
  },
  listContainer: {
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  listItem: {
    flexDirection: 'row',
    gap: 8,
  },
  listBullet: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
});