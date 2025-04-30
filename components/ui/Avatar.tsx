import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors } from '@/constants/colors';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  borderColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 40,
  borderColor = colors.primary,
}) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: size - 4,
              height: size - 4,
              borderRadius: (size - 4) / 2,
            },
          ]}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize: size / 2.5,
            },
          ]}
        >
          {name ? getInitials(name) : '?'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.text,
    fontWeight: 'bold',
  },
});