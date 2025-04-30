import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useFacultyStore } from '@/store/faculty-store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react-native';

export default function DevelopmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    developmentActivities, 
    fetchDevelopmentActivities,
  } = useFacultyStore();
  
  useEffect(() => {
    fetchDevelopmentActivities();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDevelopmentActivities();
    setRefreshing(false);
  };
  
  const activity = developmentActivities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Activity not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const getStatusVariant = (status: typeof activity.status) => {
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

  const getTypeVariant = (type: typeof activity.type) => {
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
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleOpenUrl = () => {
    if (activity.url) {
      Linking.openURL(activity.url);
    }
  };
  
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
            <Badge 
              label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} 
              variant={getTypeVariant(activity.type)} 
            />
            <Badge 
              label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)} 
              variant={getStatusVariant(activity.status)} 
            />
          </View>
          
          <Text style={styles.title}>{activity.title}</Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Progress</Text>
            <ProgressBar 
              progress={activity.progress} 
              showPercentage 
              height={10}
              color={
                activity.status === 'completed' 
                  ? colors.success 
                  : activity.status === 'in-progress' 
                    ? colors.warning 
                    : colors.primary
              }
            />
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <Card>
            <View style={styles.detailItem}>
              <Calendar size={18} color={colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailText}>
                  {formatDate(activity.startDate)}
                  {activity.endDate ? ` - ${formatDate(activity.endDate)}` : ''}
                </Text>
              </View>
            </View>
            
            {activity.location && (
              <View style={styles.detailItem}>
                <MapPin size={18} color={colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailText}>{activity.location}</Text>
                </View>
              </View>
            )}
            
            {activity.url && (
              <View style={styles.detailItem}>
                <ExternalLink size={18} color={colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>URL</Text>
                  <Text 
                    style={styles.urlText}
                    numberOfLines={1}
                    onPress={handleOpenUrl}
                  >
                    {activity.url}
                  </Text>
                </View>
              </View>
            )}
          </Card>
          
          <Card>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </Card>
          
          {activity.url && (
            <Button 
              title="Open URL" 
              onPress={handleOpenUrl} 
              icon={<ExternalLink size={16} color={colors.text} />}
              fullWidth
            />
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
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  detailsContainer: {
    padding: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
  },
  urlText: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});