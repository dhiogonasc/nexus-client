import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { styles as S } from "@/styles/registerStyles";

import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";

import DoublePasswordInput from "@/components/DoublePasswordInput";
import EmailInput from "@/components/EmailInput";
import UserInput from "@/components/UserInput";
import { authService } from "@/services";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const handleRegister = async () => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password);
    const cleanConfirmPassword = String(confirmPassword);

    if (!cleanUsername || cleanUsername.length < 3) {
      Alert.alert("Erro", "O nome de usuário deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!cleanEmail) {
      Alert.alert("Erro", "Digite seu e-mail.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    if (!cleanPassword || cleanPassword.length < 8) {
      Alert.alert("Erro", "A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        username: cleanUsername,
        email: cleanEmail,
        password: cleanPassword,
      });

      setRegisterSuccess(true);

      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário", error);

      Alert.alert(
        "Erro no cadastro",
        error?.message || "Não foi possível realizar o cadastro.",
      );
    } finally {
      setLoading(false);
    }
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

        <View style={S.imageContainer}>
          <Image
            source={require("../assets/RegisterImg.png")}
            style={S.topImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={["transparent", "#000000"]}
            style={S.gradientFade}
          />
        </View>

        <View style={S.contentWrapper}>
          <View style={S.formContainer}>
            <Text style={S.title}>Crie sua conta agora!</Text>

            {registerSuccess ? (
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

                <ActivityIndicator
                  color="#22c55e"
                  style={{ marginTop: 18 }}
                />
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

            <Image
              source={require("../assets/LogoNexus.jpg")}
              style={S.bottomLogo}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}