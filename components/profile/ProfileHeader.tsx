import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Faculty } from '@/types/faculty';
import { colors } from '@/constants/colors';
import { Avatar } from '@/components/ui/Avatar';
import { Mail, Phone, Calendar } from 'lucide-react-native';

interface ProfileHeaderProps {
  faculty: Faculty;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ faculty }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar source={faculty.avatar} name={faculty.name} size={80} />
      </View>
      
      <Text style={styles.name}>{faculty.name}</Text>
      <Text style={styles.position}>{faculty.position}</Text>
      <Text style={styles.department}>{faculty.department}</Text>
      
      <View style={styles.contactContainer}>
        <View style={styles.contactItem}>
          <Mail size={16} color={colors.textSecondary} />
          <Text style={styles.contactText}>{faculty.email}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Phone size={16} color={colors.textSecondary} />
          <Text style={styles.contactText}>{faculty.phone}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.contactText}>Joined {formatDate(faculty.joinDate)}</Text>
        </View>
      </View>
      
      {faculty.bio && (
        <Text style={styles.bio}>{faculty.bio}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  department: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  contactContainer: {
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});