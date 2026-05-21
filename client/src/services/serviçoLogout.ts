import { router } from "expo-router";
import { Alert, Platform } from "react-native";

export const handleLogout = async () => {
    if (Platform.OS === 'web') {
        {
        router.replace('/logout');
      }
    } else {
      Alert.alert(
        "Certeza q vai sair?",
        "Vai sair pra q mlk, volta!",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { 
            text: "Sair",
            onPress: () => router.replace('/'),
            style: "destructive"
          }
        ]
      );
    }
  };