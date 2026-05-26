import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

interface PasswordInputProps extends TextInputProps {
  iconName?: keyof typeof Feather.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  onTogglePassword: () => void;
}

export default function PasswordInput({
  iconName = 'lock',
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onTogglePassword,
  ...rest
}: PasswordInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Feather
        name={iconName}
        size={22}
        color="#C4C4C4"
        style={styles.leftIcon}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />

      <TouchableOpacity
        onPress={onTogglePassword}
        activeOpacity={0.7}
        style={styles.eyeButton}
      >
        <Feather
          name={secureTextEntry ? 'eye' : 'eye-off'}
          size={30}
          color="#C4C4C4"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#2B2B2B',
    width: '100%',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 0,
  },

  eyeButton: {
    height: '100%',
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});