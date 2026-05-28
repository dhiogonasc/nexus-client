import React from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useCurrentUser } from "@/hooks/userHook";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export function formatPlanetName(name: string | undefined): string {
  if (!name) return "";
  const withHyphen = name.replace(/_/g, "-");
  return withHyphen.charAt(0).toUpperCase() + withHyphen.slice(1).toLowerCase();
}

export default function Profile() {
  const { user } = useCurrentUser();
  const currentPlanet = user?.progression.planet;
  const currentMission = user?.progression.mission;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.profileContainer}>
        <View>
          <Text>{user?.username}</Text>
        </View>
        <View>
          <Text>{user?.email}</Text>
        </View>
        <View>
          <Text>{user?.xp}</Text>
        </View>
        <View style={styles.progressionContainer}>
          <TouchableOpacity
            onPress={() => router.push(`/planets/${currentPlanet?.id}`)}
          >
            <View>
              <Text>{formatPlanetName(currentPlanet?.name)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/missions/${currentMission?.id}`)}
          >
            <View>
              <Text>{user?.progression.mission.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 12,
    alignItems: "center",
  },

  profileContainer: {
    width: "100%",
    maxWidth: 600,
    gap: 12,
  },

  progressionContainer: {
    width: "100%",
    gap: 12,
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
