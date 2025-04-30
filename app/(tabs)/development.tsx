import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useFacultyStore } from '@/store/faculty-store';
import { DevelopmentActivity } from '@/types/faculty';
import { DevelopmentCard } from '@/components/development/DevelopmentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Award } from 'lucide-react-native';

export default function DevelopmentScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<DevelopmentActivity['status'] | 'all'>('all');
  
  const { 
    developmentActivities, 
    fetchDevelopmentActivities, 
    isLoading 
  } = useFacultyStore();
  
  useEffect(() => {
    fetchDevelopmentActivities();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDevelopmentActivities();
    setRefreshing(false);
  };
  
  const handleActivityPress = (activityId: string) => {
    router.push(`/development/${activityId}`);
  };
  
  const filteredActivities = filter === 'all' 
    ? developmentActivities 
    : developmentActivities.filter(activity => activity.status === filter);
  
  const FilterButton = ({ label, value }: { label: string; value: DevelopmentActivity['status'] | 'all' }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.filterContainer}>
        <FilterButton label="All" value="all" />
        <FilterButton label="Planned" value="planned" />
        <FilterButton label="In Progress" value="in-progress" />
        <FilterButton label="Completed" value="completed" />
      </View>
      
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityContainer}>
            <DevelopmentCard 
              activity={item} 
              onPress={() => handleActivityPress(item.id)}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading activities...</Text>
            </View>
          ) : (
            <EmptyState
              title="No development activities found"
              description={`You don't have any ${filter !== 'all' ? filter : ''} development activities.`}
              icon={<Award size={48} color={colors.textSecondary} />}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.cardLight,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  activityContainer: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});