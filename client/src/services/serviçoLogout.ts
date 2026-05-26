import { router } from "expo-router";
import { Alert, Platform } from "react-native";

export const handleLogout = async () => {
    if (Platform.OS === 'web') {
        {
        router.replace('/logout');
      }
    } else {
      Alert.alert(
        "Tem certeza que deseja sair?",
        "Estude sempre! Você pode entrar novamente a qualquer momento.",
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