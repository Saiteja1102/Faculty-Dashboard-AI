import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
  ...rest
}) => {
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(size === 'small' && styles.buttonSmall),
      ...(size === 'large' && styles.buttonLarge),
      ...(fullWidth && styles.buttonFullWidth),
    };

    if (disabled) {
      return {
        ...baseStyle,
        opacity: 0.5,
      };
    }

    switch (variant) {
      case 'primary':
        return baseStyle;
      case 'secondary':
        return baseStyle;
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...(size === 'small' && styles.buttonTextSmall),
      ...(size === 'large' && styles.buttonTextLarge),
    };

    switch (variant) {
      case 'outline':
      case 'ghost':
        return {
          ...baseStyle,
          color: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const renderButtonContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'primary' || variant === 'secondary' ? colors.text : colors.primary} />;
    }

    return (
      <>
        {icon && <>{icon}</>}
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      </>
    );
  };

  const renderButton = () => {
    if (variant === 'primary') {
      return (
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyles(), style]}
        >
          {renderButtonContent()}
        </LinearGradient>
      );
    }

    if (variant === 'secondary') {
      return (
        <LinearGradient
          colors={gradients.secondary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyles(), style]}
        >
          {renderButtonContent()}
        </LinearGradient>
      );
    }

    return (
      <TouchableOpacity
        style={[getButtonStyles(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        {...rest}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    );
  };

  if (variant === 'primary' || variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={styles.gradientWrapper}
        {...rest}
      >
        {renderButton()}
      </TouchableOpacity>
    );
  }

  return renderButton();
};

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    gap: 8,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
});