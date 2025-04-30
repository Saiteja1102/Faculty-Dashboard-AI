import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useFacultyStore } from '@/store/faculty-store';
import { CourseCard } from '@/components/course/CourseCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react-native';

export default function CoursesScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    courses, 
    fetchCourses, 
    isLoading 
  } = useFacultyStore();
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };
  
  const handleCoursePress = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseContainer}>
            <CourseCard 
              course={item} 
              onPress={() => handleCoursePress(item.id)}
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
              <Text style={styles.loadingText}>Loading courses...</Text>
            </View>
          ) : (
            <EmptyState
              title="No courses found"
              description="You don't have any courses assigned yet."
              icon={<BookOpen size={48} color={colors.textSecondary} />}
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
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  courseContainer: {
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