import { useFinishMission, useStartMission } from "@/hooks/missionHook";
import { AttemptFinishRequest } from "@/models/attempt";
import { Mission } from "@/models/mission";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { router } from "expo-router";

interface Props {
  mission: Mission | null;
}

export function Questions({ mission }: Props) {
  const missionId = mission?.id || 0;
  const { start, startedAttempt } = useStartMission();
  const { finish, endedAttempt } = useFinishMission();
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const handleStartAttempt = async () => {
    await start({ missionId });
    setSelectedAnswers([]);
    setHasStarted(true);
    setHasFinished(false);
  };

  const handleFinishAttempt = async () => {
    await finish(Number(startedAttempt?.id), selectedAnswers);
    setHasStarted(false);
    setHasFinished(true);
  };

  const [selectedAnswers, setSelectedAnswers] = useState<AttemptFinishRequest>(
    [],
  );

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

  const handleBackMenu = () => {
    router.replace(`/planets/${mission?.planet.id}`);
  };

  const correctAnswers =
    endedAttempt?.answers?.filter((answer) => answer.hit).length || 0;

  const totalAnswers = endedAttempt?.answers?.length || 0;

  return (
    <>
      {!hasStarted ? (
        !hasFinished ? (
          <>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleStartAttempt}
              >
                <Text>Iniciar Tentativa</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.missionQuestionsContainer}>
              <ProgressBar
                completed={correctAnswers}
                total={totalAnswers}
              ></ProgressBar>
              {endedAttempt?.answers?.map((answer) => {
                const question = mission?.questions?.find(
                  (q) => q.id === answer.question.id,
                );

                return (
                  <View
                    key={answer.question.id}
                    style={[
                      styles.questionContainer,
                      answer.hit
                        ? styles.correctQuestion
                        : styles.wrongQuestion,
                    ]}
                  >
                    <View>
                      <Text>
                        {question?.order}: {question?.content}
                      </Text>
                    </View>

                    <View style={styles.alternativeContainer}>
                      {question?.alternatives?.map((alternative) => {
                        const isCorrectAnswer =
                          alternative.id === answer.correct?.id;
                        const isUserSelection =
                          alternative.id === answer.selection?.id;

                        return (
                          <View
                            key={alternative.id}
                            style={[
                              styles.alternative,
                              isCorrectAnswer && styles.correct,
                              isUserSelection && answer.hit && styles.correct,
                              isUserSelection && !answer.hit && styles.wrong,
                            ]}
                          >
                            <Text>{alternative.content}</Text>
                          </View>
                        );
                      })}
                      <Text> Explicação: {answer.explanation}</Text>
                    </View>
                  </View>
                );
              })}

              <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleBackMenu}
                  >
                    <Text>Voltar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartAttempt}
                  >
                    <Text>Tentar novamente</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )
      ) : (
        <>
          <View style={styles.missionQuestionsContainer}>
            {mission?.questions?.map((question) => {
              const currentSelection = selectedAnswers.find(
                (answer) => answer.questionId === question.id,
              );

              return (
                <View key={question.id} style={styles.questionContainer}>
                  <View>
                    <Text>
                      {question.order}: {question.content}
                    </Text>
                  </View>

                  <View style={styles.alternativeContainer}>
                    {question.alternatives?.map((alternative) => {
                      const isSelected =
                        currentSelection?.alternativeId === alternative.id;

                      return (
                        <TouchableOpacity
                          key={alternative.id}
                          style={[
                            styles.alternative,
                            isSelected && styles.selected,
                          ]}
                          onPress={() =>
                            handleSelectAlternative(question.id, alternative.id)
                          }
                        >
                          <Text>{alternative.content}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
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
    </>
  );
}

const styles = StyleSheet.create({
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
