import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFinishMission,
  useMissionById,
  useStartMission,
} from "@/hooks/missionHook";
import { SafeAreaView } from "react-native-safe-area-context";
import { AttemptFinishRequest } from "@/models/attempt";
import { ProgressBar } from "@/components/ProgressBar";
import { Questions } from "@/components/Questions";

export default function Planets() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const missionId = Number(id);
  const { mission } = useMissionById(missionId);

  return (
    <ScrollView
      style={styles.mainScroll}
      contentContainerStyle={styles.scrollContainer}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.missionContainer}>
          <View style={styles.missionContentContainer}>
            <View>
              <Text>{mission?.name}</Text>
              <Text>{mission?.description}</Text>
            </View>
            <Text>{mission?.content}</Text>
          </View>
          <Questions mission={mission}></Questions>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },

  container: {
    width: "100%",
    flex: 1,
    padding: 12,
    alignItems: "center",
  },

  missionContainer: {
    width: "100%",
    maxWidth: 600,
    gap: 12,
  },

  missionContentContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  missionQuestionsContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  questionContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  correctQuestion: {
    borderColor: "rgba(34, 197, 94, 0.8)",
  },

  wrongQuestion: {
    borderColor: "rgba(239, 68, 68, 0.4)",
  },

  mission: {
    width: "100%",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  alternativeContainer: {
    width: "100%",
    gap: 12,
  },

  alternative: {
    width: "100%",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  selected: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  correct: { backgroundColor: "rgba(34, 197, 94, 0.8)" },
  wrong: { backgroundColor: "rgba(239, 68, 68, 0.4)" },

  buttonContainer: {
    width: "100%",
    maxWidth: 600,
    flexDirection: "row",
    gap: 12,
  },

  buttonWrapper: {
    flex: 1,
  },

  button: {
    width: "100%",
    alignItems: "center",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
