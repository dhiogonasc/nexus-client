import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { handleLogout } from "../services/logoutService";
import { useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/profile")}
        >
          <Text>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/planets")}
        >
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  containerContent: {
    width: "100%",
    maxWidth: 600,
    flexDirection: "row",
    padding: 12,
    gap: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },

  button: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 4,
  },
});
