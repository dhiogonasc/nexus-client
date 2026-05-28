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

export default function Planets() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const missionId = Number(id);
  const { mission } = useMissionById(missionId);
  const { start, startedAttempt } = useStartMission();
  const { finish } = useFinishMission();

  const [hasStarted, setHasStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<AttemptFinishRequest>(
    [],
  );

  const handleStartAttempt = async () => {
    await start(missionId);
    setHasStarted(true);
  };

  const handleFinishAttempt = async () => {
    await finish(Number(startedAttempt?.id), selectedAnswers);
    setHasStarted(false);
    router.replace(`/planets/${mission?.planet.id}`);
  };

  const handleSelectAlternative = (
    questionId: number,
    alternativeId: number,
  ) => {
    setSelectedAnswers((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId,
      );
      return [...filteredAnswers, { questionId, alternativeId }];
    });
  };

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
            <View>
              <Text>{mission?.name}</Text>
              <Text>{mission?.description}</Text>
            </View>
            <Text>{mission?.content}</Text>
          </View>

          <Text>--- Lista de Questões ---</Text>
          {!hasStarted ? (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleStartAttempt}
              >
                <Text>Iniciar Tentativa</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text>--- Lista de Questões ---</Text>
              <View style={styles.missionQuestionsContainer}>
                {mission?.questions?.map((question) => {
                  const currentSelection = selectedAnswers.find(
                    (answer) => answer.questionId === question.id,
                  );

                  return (
                    <React.Fragment key={question.id}>
                      <View style={styles.questionContainer}>
                        <View>
                          <Text>
                            {question.order}: {question.content}
                          </Text>
                        </View>

                        <View style={styles.alternativeContainer}>
                          {question.alternatives?.map((alternative) => {
                            const isSelected =
                              currentSelection?.alternativeId ===
                              alternative.id;

                            return (
                              <TouchableOpacity
                                key={alternative.id}
                                style={[
                                  styles.alternative,
                                  isSelected && styles.selected,
                                ]}
                                onPress={() =>
                                  handleSelectAlternative(
                                    question.id,
                                    alternative.id,
                                  )
                                }
                              >
                                <Text>{alternative.content}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    </React.Fragment>
                  );
                })}

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleFinishAttempt}
                >
                  <Text>Finalizar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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

  button: {
    width: "100%",
    alignItems: "center",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
