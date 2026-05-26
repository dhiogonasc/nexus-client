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
  const [errorMessage, setErrorMessage] = useState("");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function getBackendErrorMessage(error: any) {
    const data = error?.response?.data;

    if (!data) {
      return "Não foi possível conectar ao servidor.";
    }

    if (typeof data === "string") {
      return data;
    }

    if (data.message) {
      return data.message;
    }

    if (data.error) {
      return data.error;
    }

    if (data.detail) {
      return data.detail;
    }

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors
        .map((item: any) => item.defaultMessage || item.message || String(item))
        .join("\n");
    }

    return "Não foi possível realizar o cadastro.";
  }

  const handleRegister = async () => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password);
    const cleanConfirmPassword = String(confirmPassword);

    setErrorMessage("");

    if (!cleanUsername) {
      setErrorMessage("Digite seu nome de usuário.");
      return;
    }

    if (cleanUsername.length < 3) {
      setErrorMessage("O nome de usuário deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!cleanEmail) {
      setErrorMessage("Digite seu e-mail.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage("Digite um e-mail válido.");
      return;
    }

    if (!cleanPassword) {
      setErrorMessage("Digite sua senha.");
      return;
    }

    if (cleanPassword.length < 8) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!cleanConfirmPassword) {
      setErrorMessage("Confirme sua senha.");
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setErrorMessage("As senhas não coincidem.");
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

      setErrorMessage(
        error?.message || getBackendErrorMessage(error)
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
                  onChangeText={(text: string) => {
                    setUsername(text);
                    setErrorMessage("");
                  }}
                />

                <EmailInput
                  iconName="mail"
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text: string) => {
                    setEmail(text);
                    setErrorMessage("");
                  }}
                />

                <DoublePasswordInput
                  password={password}
                  setPassword={(text: string) => {
                    setPassword(text);
                    setErrorMessage("");
                  }}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={(text: string) => {
                    setConfirmPassword(text);
                    setErrorMessage("");
                  }}
                />

                {errorMessage ? (
                  <View
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 12,
                      backgroundColor: "rgba(253, 48, 48, 0.03)",
                      borderWidth: 1,
                      borderColor: "#c4c4c4",
                      marginBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
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
                          color: "#fb4f4f",
                          textAlign: "center",
                          fontSize: 14,
                          lineHeight: 18,
                          fontWeight: "bold",
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
                  onPress={handleRegister}
                  disabled={loading}
                  activeOpacity={0.8}
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