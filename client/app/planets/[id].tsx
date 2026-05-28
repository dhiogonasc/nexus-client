import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { usePlanetById } from "@/hooks/planetHook";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { STATUS_BORDER_COLORS } from "@/models/task";
import { ProgressBar } from "@/components/ProgressBar";

export default function Planets() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const planetId = Number(id);
  const { planet } = usePlanetById(planetId);

  const completed = planet?.missions.progress?.completed || 0;
  const total = planet?.missions.progress?.total || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

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
        <View style={styles.planetContainer}>
          <View style={styles.planetContentContainer}>
            <View>
              <Text>{planet?.name}</Text>
              <Text>{planet?.description}</Text>
            </View>
            <View>
              <Text>{planet?.content}</Text>
            </View>
          </View>

          <Text>--- Lista de Missões ---</Text>
          <View style={styles.planetTasksContainer}>
            <ProgressBar
              completed={completed}
              total={total}
              percent={percent}
            ></ProgressBar>

            {planet?.missions?.tasks?.map((mission) => {
              const status = mission.execution?.status;
              const isLocked = status === "LOCKED";
              const borderColor =
                STATUS_BORDER_COLORS[status] || "rgba(0,0,0,0.1)";

              return (
                <TouchableOpacity
                  key={mission.id}
                  disabled={isLocked}
                  onPress={() => router.push(`/missions/${mission.id}`)}
                  style={[styles.mission, { borderColor }]}
                >
                  <View>
                    <Text> {mission.name}</Text>
                    <Text> {mission.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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

  planetContainer: {
    width: "100%",
    maxWidth: 600,
    gap: 12,
  },

  planetContentContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  planetTasksContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  mission: {
    width: "100%",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
