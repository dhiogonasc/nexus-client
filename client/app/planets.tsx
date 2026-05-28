import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAllPlanets } from "@/hooks/planetHook";
import { router } from "expo-router";
import { STATUS_BORDER_COLORS } from "@/models/task";
import { ProgressBar } from "@/components/ProgressBar";

export function formatPlanetName(name: string | undefined): string {
  if (!name) return "";
  const withHyphen = name.replace(/_/g, "-");
  return withHyphen.charAt(0).toUpperCase() + withHyphen.slice(1).toLowerCase();
}

export default function Home() {
  const { planets } = useAllPlanets();

  const completed = planets?.progress?.completed || 0;
  const total = planets?.progress?.total || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <ScrollView
      style={styles.mainScroll}
      contentContainerStyle={styles.scrollContainer}
    >
      {" "}
      <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Text>--- Lista de Planetas ---</Text>
        <View style={styles.planetContainer}>
          <ProgressBar
            completed={completed}
            total={total}
            percent={percent}
          ></ProgressBar>

          {planets?.tasks.map((planet) => {
            const status = planet.execution?.status || "";
            const isLocked = status === "LOCKED";
            const borderColor = STATUS_BORDER_COLORS[status];

            return (
              <TouchableOpacity
                style={[styles.planet, { borderColor }]}
                key={planet.id}
                disabled={isLocked}
                onPress={() => router.push(`/planets/${planet.id}`)}
              >
                <View>
                  <Text>
                    {formatPlanetName(planet.name)}{" "}
                    {planet.execution?.isCurrent ? "(Atual)" : ""}
                  </Text>
                  <Text>{planet.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    flex: 1,
    padding: 12,
    gap: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  planet: {
    width: "100%",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
