import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "@/styles/idStyle";

import {
  getMissionColor,
  getMissionIcon,
  getMissionStatus,
  getMissionStatusLabel,
} from "../utils/planetHelper";
import { Mission } from "@/models/mission";

type Props = {
  mission: Mission;
  accentColor: string;
  onPress: () => void;
};

export default function MissionCard({ mission, accentColor, onPress }: Props) {
  const status = getMissionStatus(mission);
  const missionColor = getMissionColor(mission, accentColor);
  const isLocked = status === "LOCKED";

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.8}
      style={[
        styles.moduleCard,
        {
          borderLeftColor: missionColor,
          opacity: isLocked ? 0.55 : 1,
        },
      ]}
      onPress={isLocked ? undefined : onPress}
    >
      <MaterialCommunityIcons
        name={getMissionIcon(mission) as any}
        size={22}
        color={missionColor}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.moduleText}>{mission.name}</Text>

        <Text
          style={{
            color: missionColor,
            fontSize: 12,
            marginTop: 4,
            fontWeight: "600",
          }}
        >
          {getMissionStatusLabel(mission)}
        </Text>
      </View>

      {!isLocked && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#94A3B8"
        />
      )}
    </TouchableOpacity>
  );
}
