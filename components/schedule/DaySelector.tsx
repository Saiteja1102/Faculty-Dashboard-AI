import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';

interface DaySelectorProps {
  onSelectDate: (date: string) => void;
  selectedDate?: string;
  numberOfDays?: number;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  onSelectDate,
  selectedDate,
  numberOfDays = 14,
}) => {
  const [dates, setDates] = useState<Array<{ date: Date; formatted: string }>>([]);
  
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const dateArray = [];
      
      for (let i = 0; i < numberOfDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const formatted = date.toISOString().split('T')[0];
        dateArray.push({ date, formatted });
      }
      
      return dateArray;
    };
    
    setDates(generateDates());
    
    // If no date is selected, select today
    if (!selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      onSelectDate(today);
    }
  }, [numberOfDays, onSelectDate, selectedDate]);
  
  const getDayName = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((item) => {
        const isSelected = item.formatted === selectedDate;
        const today = isToday(item.date);
        
        return (
          <TouchableOpacity
            key={item.formatted}
            style={[
              styles.dayContainer,
              isSelected && styles.selectedDayContainer,
            ]}
            onPress={() => onSelectDate(item.formatted)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayName,
                isSelected && styles.selectedText,
                today && styles.todayText,
              ]}
            >
              {getDayName(item.date)}
            </Text>
            <View
              style={[
                styles.dateContainer,
                isSelected && styles.selectedDateContainer,
                today && !isSelected && styles.todayContainer,
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedText,
                  today && !isSelected && styles.todayText,
                ]}
              >
                {item.date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 8,
  },
  selectedDayContainer: {
    borderRadius: 8,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateContainer: {
    backgroundColor: colors.primary,
  },
  todayContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  selectedText: {
    color: colors.text,
    fontWeight: '700',
  },
  todayText: {
    color: colors.primary,
    fontWeight: '700',
  },
});