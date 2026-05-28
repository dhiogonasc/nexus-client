import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { styles as S } from "@/styles/registerStyles";
import { Link } from "expo-router";

import DoublePasswordInput from "@/components/DoublePasswordInput";
import EmailInput from "@/components/EmailInput";
import UserInput from "@/components/UserInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRegister } from "@/hooks/authHook";

export default function RegisterScreen() {
  const { register, loading, success } = useRegister();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    register({ username, email, password });
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
            <Text style={S.title}>Crie sua conta agora!</Text>

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
                  Conta criada com sucesso!
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
                  Redirecionando para o login...
                </Text>

                <ActivityIndicator color="#22c55e" style={{ marginTop: 18 }} />
              </View>
            ) : (
              <>
                <UserInput
                  iconName="user"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChangeText={setUsername}
                />

                <EmailInput
                  iconName="mail"
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />

                <DoublePasswordInput
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                />

                <TouchableOpacity
                  style={[S.button, loading && { opacity: 0.7 }]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={S.buttonText}>Cadastrar</Text>
                  )}
                </TouchableOpacity>

                <View style={S.registerContainer}>
                  <Text style={S.registerButton}>Já tem uma conta? </Text>

                  <Link href="/" style={S.registerLink}>
                    Entrar
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
