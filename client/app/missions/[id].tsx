import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useMissionById } from "@/hooks/missionHook";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Planets() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const missionId = Number(id);
  const { mission } = useMissionById(missionId);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.missionContainer}>
          <View style={styles.missionContentContainer}>
            <View style={styles.contentHeader}>
              <Text>{mission?.name}</Text>
              <Text>{mission?.description}</Text>
            </View>
            <Text>{mission?.content}</Text>
          </View>

          <Text>--- Lista de Questões ---</Text>
          <View style={styles.missionQuestionsContainer}>
            {mission?.questions?.map((question) => {
              return (
                <React.Fragment key={question.id}>
                  <View style={styles.questionContainer}>
                    <View>
                      <Text>
                        {question.order}: {question.content}
                      </Text>
                    </View>

                    <View>
                      {question.alternatives?.map((alternative) => {
                        return (
                          <View key={alternative.id}>
                            <Text>• {alternative.content}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
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

  mission: {
    width: "100%",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
