import { useCurrentUser } from "@/hooks/userHook";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserBadge() {
  const currentUser = useCurrentUser();

  const TOTAL_OXYGEN = 10;
  const currentOxygen = currentUser.user?.oxygen || 0;
  const currentXp = currentUser.user?.xp || 0;
  const xpRequired = currentUser.user?.progression.level.next.xpRequired || 1;

  const oxygenPercentage = Math.min(
    Math.max((currentOxygen / TOTAL_OXYGEN) * 100, 0),
    100,
  );

  const xpPercentage = Math.min(
    Math.max((currentXp / xpRequired) * 100, 0),
    100,
  );

  return (
    <View style={styles.container}>
      <View style={styles.userBadgeContainer}>
        <View style={styles.userBadge}>
          <Text style={styles.username}>{currentUser.user?.username}</Text>
        </View>
      </View>

      <View style={styles.userStatsContainer}>
        <View style={styles.levelBadgeContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelLabel}>
              {currentUser.user?.progression.level.name}
            </Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statInfoContainer}>
            <Text style={styles.statInfo}>
              XP: {currentXp}/{xpRequired}
            </Text>
          </View>
          <View style={styles.statBar}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${xpPercentage}%`, backgroundColor: "#10b981" },
              ]}
            />
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statInfoContainer}>
            <Text style={styles.statInfo}>
              O₂: {currentOxygen}/{TOTAL_OXYGEN}
            </Text>
          </View>
          <View style={styles.statBar}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${oxygenPercentage}%`, backgroundColor: "#3b82f6" },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  levelBadgeContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  levelBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  userBadgeContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userBadge: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userStatsContainer: {
    flex: 1,
    gap: 12,
  },
  statRow: {
    width: "100%",
    gap: 6,
  },
  statInfoContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  statInfo: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  statBar: {
    height: 10,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
});
