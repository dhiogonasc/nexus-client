import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { handleLogout } from '../src/services/serviçoLogout'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LogoutScreen() {
  const router = useRouter();

  const confirmarSaida = () => {
    // Executa a sua lógica de logout e depois redireciona para o login (rota '/')
    handleLogout();
    router.replace('/'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <MaterialCommunityIcons name="sword-cross" size={48} color="#A855F7" style={styles.icon} />
        
        <Text style={styles.title}>Sair do Nexus-RPG?</Text>
        
        <Text style={styles.subtitle}>
          Você sempre pode entrar novamente a qualquer momento. Tem certeza de que deseja desconectar sua conta agora?
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={confirmarSaida}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/homePage')}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//estilo sem necessidade de criar um componente próprio, muito específico para essa tela, então deixa aqui mesmo.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1E293B',
    width: '100%',
    maxWidth: 400, 
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    color: '#F8FAFC', 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8', 
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#A855F7',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30, 
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#F8FAFC', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  cancelButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});