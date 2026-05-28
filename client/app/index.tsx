import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { styles as S } from "@/styles/indexStyles";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import { useLogin } from "@/hooks/authHook";

export default function Index() {
  const { login, loading, error, success } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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

        <View style={S.contentWrapper}>
          <View style={S.formContainer}>
            <Text style={S.title}>Bem vindo!</Text>

            {success ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  borderRadius: 18,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  borderWidth: 1,
                  borderColor: "#22c55e",
                  marginBottom: 24,
                }}
              >
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={54}
                  color="#22c55e"
                />

                <Text
                  style={{
                    color: "#22c55e",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Login realizado!
                </Text>

                <Text
                  style={{
                    color: "#d1fae5",
                    fontSize: 14,
                    marginTop: 8,
                    textAlign: "center",
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
                    }}
                    secureTextEntry={!showPassword}
                    onTogglePassword={() => setShowPassword((prev) => !prev)}
                  />
                </View>

                {error ? (
                  <View
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: "rgba(239,68,68,0.15)",
                      borderWidth: 1,
                      borderColor: "#ef4444",
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fecaca",
                        textAlign: "center",
                        fontSize: 13,
                        lineHeight: 18,
                      }}
                    >
                      {error}
                    </Text>
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
