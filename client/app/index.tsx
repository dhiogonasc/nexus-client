import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { styles as S } from '@/styles/indexStyles';
import { Link, router, useRootNavigationState } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';

import { useIndexLogin } from '@/hooks/useIndexLogin';

export default function Index() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    loginSuccess,
    errorMessage,
    clearError,
    handleLogin,
  } = useIndexLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={S.container}
    >
      <ScrollView
        contentContainerStyle={S.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View style={S.imageContainer}>
          <Image
            source={require('../assets/LoginImg.jpg')}
            style={S.topImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['transparent', '#000000']}
            style={S.gradientFade}
          />
        </View>

        <View style={S.contentWrapper}>
          <View style={S.formContainer}>
            <Text style={S.title}>Bem vindo!</Text>

            {loginSuccess ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                  borderRadius: 18,
                  backgroundColor: 'rgba(34, 197, 94, 0.07)',
                  borderWidth: 1,
                  borderColor: '#22c55e',
                  marginBottom: 24,
                }}
              >
                <MaterialCommunityIcons
                  name="rocket-launch"
                  size={54}
                  color="#22c55e"
                />

                <Text
                  style={{
                    color: '#22c55e',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 12,
                    textAlign: 'center',
                  }}
                >
                  Login realizado!
                </Text>

                <Text
                  style={{
                    color: '#d1fae5',
                    fontSize: 14,
                    marginTop: 8,
                    textAlign: 'center',
                    lineHeight: 20,
                  }}
                >
                  Redirecionando para a Home...
                </Text>

                <ActivityIndicator color="#22c55e" style={{ marginTop: 18 }} />
              </View>
            ) : (
              <>
                <View style={S.inputMargin}>
                  <EmailInput
                    iconName="mail"
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text: string) => {
                      setEmail(text);
                      clearError();
                    }}
                  />
                </View>

                <View style={S.inputMarginBottom}>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={(text: string) => {
                      setPassword(text);
                      clearError();
                    }}
                    secureTextEntry={!showPassword}
                    onTogglePassword={() => setShowPassword((prev) => !prev)}
                  />
                </View>

                {errorMessage ? (
                  <View
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 12,
                      backgroundColor: 'rgba(253, 48, 48, 0.09)',
                      borderWidth: 1,
                      borderColor: '#c4c4c4',
                      marginBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="alert-outline"
                        size={20}
                        color="#fb4f4f"
                      />

                      <Text
                        style={{
                          color: '#fb4f4f',
                          textAlign: 'center',
                          fontSize: 14,
                          lineHeight: 18,
                          fontWeight: 'bold',
                          flexShrink: 1,
                        }}
                      >
                        {errorMessage}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={[S.button, loading && { opacity: 0.7 }]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={S.buttonText}>Entrar</Text>
                  )}
                </TouchableOpacity>

                <View style={S.registerContainer}>
                  <Text style={S.registerButton}>Não possui conta? </Text>

                  <Link href="/register" style={S.registerLink}>
                    Registrar-se
                  </Link>
                </View>
              </>
            )}

            <Image
              source={require('../assets/LogoNexus.jpg')}
              style={S.bottomLogo}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}