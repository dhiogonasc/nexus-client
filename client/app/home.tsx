import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Animated,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStyles as S } from "@/styles/homePageStyles";
import PlanetCarousel from "@/components/PlanetCarousel";
import { useCurrentUser } from "@/hooks/userHook";

export default function Home() {
  const { user, loading } = useCurrentUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const greetingText = user?.username
    ? `Astronauta ${user?.username}!`
    : "Astronauta!";

  return (
    <SafeAreaView style={S.container} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={S.scrollContent}
      >
        <Animated.View
          style={[
            S.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={S.headerContent}>
            <View style={S.headerText}>
              {loading ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={S.userName}> Carregando...</Text>
                </View>
              ) : (
                <Text style={S.userName}>{greetingText}</Text>
              )}
            </View>
          </View>
        </Animated.View>

        <View style={S.section}>
          <View style={S.sectionHeader}>
            <View style={S.sectionAccent} />
            <Text style={S.sectionTitle}>LISTA DE PLANETAS</Text>
          </View>

          <PlanetCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
