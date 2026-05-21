import React from 'react';
import { View, TextInputProps, StyleProp, ViewStyle, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface EmailInputProps extends
  TextInputProps {
  iconName?: keyof typeof Feather.glyphMap;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function EmailInput(
  {
    iconName,
    containerStyle,
    style,
    ...rest
  }: EmailInputProps) {

  return (
    <View style={[styles.inputContainer, containerStyle]}>

      {iconName && 
      (
        <Feather name={iconName} size={20} color="#C4C4C4" style={styles.icon}
        />
      )
      }

      <TextInput
        style={styles.textInput}
        placeholderTextColor="#C4C4C4"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    width: '100%',
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
  },
});