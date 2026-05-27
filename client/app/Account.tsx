import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { AccountStyles as S } from "@/styles/AccountStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCurrentUser } from "@/hooks/userHook";
import UserBadge from "@/components/UserBadge";

function formatLevelName(levelName: string | undefined) {
  return levelName?.replace(/_/g, " ").toUpperCase();
}

export default function Account() {
  const { user, loading, error } = useCurrentUser();

  const levelText = useMemo(() => {
    return `Nível ${user?.progression.level} - ${formatLevelName(user?.progression.level.name)}`;
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={S.container}
    >
      <ScrollView
        contentContainerStyle={S.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View style={S.contentWrapper}>
          <View style={S.profileContainer}>
            {loading ? (
              <View style={{ padding: 40, alignItems: "center" }}>
                <ActivityIndicator size="large" color="#ffffff" />

                <Text style={{ color: "#fff", marginTop: 10 }}>
                  Carregando seus dados...
                </Text>
              </View>
            ) : !user ? (
              <Text
                style={{
                  color: "#ff4444",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                Erro ao carregar informações. Faça login novamente.
              </Text>
            ) : (
              <>
                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>NOME</Text>
                  </View>

                  <Text style={S.value}>{user.username}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>EMAIL</Text>
                  </View>

                  <Text style={S.value}>{user.email}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>XP</Text>
                  </View>

                  <Text style={S.value}>{user.xp}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="medal-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>NÍVEL ATUAL</Text>
                  </View>

                  <Text style={S.value}>{levelText}</Text>

                  <Text
                    style={{
                      color: "#94A3B8",
                      fontSize: 13,
                      marginTop: 6,
                    }}
                  >
                    {user.progression.level.description}
                  </Text>

                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="arrow-up-bold-circle-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>PRÓXIMO NÍVEL</Text>
                  </View>

                  <Text style={S.value}>
                    {user.progression.level.next.name}
                  </Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="rocket-launch-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>MISSÃO ATUAL</Text>
                  </View>

                  <Text style={S.value}>
                    {user.progression.mission.name || "Nenhuma missão atual"}
                  </Text>
                  <View style={S.line} />
                </View>
              </>
            )}
          </View>

          <UserBadge />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
