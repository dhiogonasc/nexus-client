import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  completed: number;
  total: number;
}
export function ProgressBar({ completed, total }: Props) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <View>
          <Text>Progresso</Text>
        </View>
        <Text>
          {completed}/{total}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>
        <View>
          <Text>{percent}% concluído</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    padding: 12,
    gap: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  progressHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarContainer: {
    width: "100%",
    gap: 4,
  },
  progressBarTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 4,
  },
});
