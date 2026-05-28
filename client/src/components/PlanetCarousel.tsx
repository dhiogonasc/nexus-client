import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
  ActivityIndicator,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { CarouselStyles as S } from "@/styles/CarouselStyle";
import { router } from "expo-router";
import { useAllPlanets } from "@/hooks/planetHook";

export default function PlanetCarousel() {
  const { planets, loading } = useAllPlanets();
  const [erro] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const useNativeDriver = Platform.OS !== "web";

  useEffect(() => {
    if (planets?.tasks && planets.tasks.length > 0) {
      const currentPlanetIndex = planets.tasks.findIndex(
        (p) => p.execution?.isCurrent === true,
      );
      if (currentPlanetIndex !== -1) {
        setIndex(currentPlanetIndex);
      }
    }
  }, [planets]);

  if (loading) {
    return (
      <View
        style={[
          S.wrapper,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#020617",
          },
        ]}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ color: "#fff", marginTop: 10 }}>
          Mapeando galáxia...
        </Text>
      </View>
    );
  }

  if (erro || planets?.tasks.length === 0) {
    return (
      <View
        style={[
          S.wrapper,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#020617",
          },
        ]}
      >
        <Text
          style={{ color: "#ef4444", marginBottom: 20, textAlign: "center" }}
        >
          {erro || "Nenhum planeta encontrado."}
        </Text>

        <TouchableOpacity style={S.navButton} onPress={() => router.back()}>
          <Text style={{ color: "#fff" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const planet = planets?.tasks[index];
  const isLocked = planet?.execution.status === "LOCKED";
  const displayColor = isLocked ? "#475569" : planet?.accentColor;

  const navegar = (alvo: "ant" | "prox" | number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    let proximoIndex = 0;
    let direcaoAnimacao = 1;

    if (typeof alvo === "number") {
      proximoIndex = alvo;
      direcaoAnimacao = alvo > index ? -1 : 1;
    } else {
      proximoIndex =
        alvo === "prox"
          ? (index + 1) % (planets?.tasks.length || 0)
          : (index - 1 + (planets?.tasks.length || 0)) %
            (planets?.tasks.length || 0);

      direcaoAnimacao = alvo === "prox" ? -1 : 1;
    }

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 200,
        useNativeDriver,
      }),
      Animated.timing(translateXAnim, {
        toValue: direcaoAnimacao * 40,
        duration: 200,
        useNativeDriver,
      }),
    ]).start(() => {
      setIndex(proximoIndex);
      translateXAnim.setValue(-direcaoAnimacao * 40);

      Animated.parallel([
        Animated.spring(opacityAnim, {
          toValue: 1,
          useNativeDriver,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver,
        }),
        Animated.spring(translateXAnim, {
          toValue: 0,
          friction: 7,
          useNativeDriver,
        }),
      ]).start(() => setIsAnimating(false));
    });
  };

  return (
    <View style={S.wrapper}>
      <ImageBackground
        source={require("../../assets/GalaxyBG.png")}
        style={S.galaxyBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(2,6,23,0.2)", "rgba(2,6,23,0.85)"]}
          style={S.galaxyOverlay}
        />

        <View style={[S.orbitRing, { borderColor: displayColor + "25" }]} />

        <Animated.View
          style={[
            S.planetContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }, { translateX: translateXAnim }],
            },
          ]}
        >
          <ImageBackground
            source={planet?.image}
            style={[
              S.planetImage,
              isLocked && {
                opacity: 0.25,
              },
            ]}
            resizeMode="contain"
          />

          {isLocked && (
            <View
              style={{
                position: "absolute",
                top: "40%",
                alignSelf: "center",
              }}
            >
              <MaterialCommunityIcons
                name="lock"
                size={60}
                color="rgba(255,255,255,0.3)"
              />
            </View>
          )}
        </Animated.View>

        <View style={S.controls}>
          <TouchableOpacity onPress={() => navegar("ant")} style={S.navButton}>
            <BlurView intensity={30} tint="dark" style={S.navBlur}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={28}
                color="#CBD5E1"
              />
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navegar("prox")} style={S.navButton}>
            <BlurView intensity={30} tint="dark" style={S.navBlur}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={28}
                color="#CBD5E1"
              />
            </BlurView>
          </TouchableOpacity>
        </View>

        <Animated.View style={[S.infoCard, { opacity: opacityAnim }]}>
          <BlurView intensity={40} tint="dark" style={S.infoBlur}>
            <View style={[S.accentLine, { backgroundColor: displayColor }]} />

            {planet?.execution.isCurrent && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color={planet.accentColor}
                />

                <Text
                  style={{
                    color: planet.accentColor,
                    fontSize: 12,
                    fontWeight: "bold",
                    marginLeft: 4,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Você está aqui
                </Text>
              </View>
            )}

            <Text style={[S.planetName, isLocked && { color: "#94A3B8" }]}>
              {planet?.name}
            </Text>

            <View style={S.infoRow}>
              <View style={S.infoPill}>
                <MaterialCommunityIcons name="atom" size={12} color="#94A3B8" />
                <Text style={S.infoPillText}>{planet?.description}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        <View style={S.dots}>
          {planets?.tasks.map((p, i) => (
            <TouchableOpacity
              key={p.id || i}
              onPress={() => {
                if (i !== index) navegar(i);
              }}
            >
              <View
                style={[
                  S.dot,
                  i === index && {
                    backgroundColor:
                      p.execution?.status === "LOCKED"
                        ? "#475569"
                        : p.accentColor,
                    width: 20,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>

      {/* Botão de explorar ou mensagem de bloqueio */}
      <TouchableOpacity
        style={{
          backgroundColor: displayColor,
          padding: 12,
          paddingLeft: 35,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
          marginBottom: 25,
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        disabled={isLocked}
        onPress={() => router.push(`/planet/${planet?.id}`)}
      >
        <Text
          style={{
            color: isLocked ? "#94A3B8" : "#fff",
            fontWeight: "bold",
          }}
        >
          {isLocked
            ? "Complete o planeta anterior"
            : `Explorar ${planet?.name}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
