import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@/styles/FooterBarStyle';
import { handleLogout } from '../services/serviçoLogout';
import { router } from 'expo-router';
import { useRouter, usePathname } from 'expo-router';

export default function Footer() {
  // Pega as medidas seguras da tela atual
  const insets = useSafeAreaInsets();

  // Para saber em qual rota o usuário está e estilizar
  const router = useRouter(); 
  const pathname = usePathname();

  // Define as cores para o botão ativo e inativo
  const corAtiva = '#A855F7';   
  const corInativa = '#94A3B8'; 

  return (
    <View
      style={[
        styles.container,
        // essa parte aqui usa o tamanho da barra do celular OU 16px (o que for maior) para não ficar colado em celulares antigos.
        { paddingBottom: Math.max(insets.bottom, 2), paddingTop: 2 }
      ]}
    >

      {/* Botão Perfil */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace('/Account')}
      >
        <MaterialCommunityIcons 
          name="account-circle" 
          size={24} 
          color={pathname === '/Account' ? corAtiva : corInativa} 
        />
        <Text style={[
          styles.buttonText,
          pathname === '/Account' && { color: corAtiva }
        ]}>
          Perfil
        </Text>
      </TouchableOpacity>

            {/* Botão Home */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace('/homePage')}
      >
        <MaterialCommunityIcons 
          name="home-variant" 
          size={28} 
          color={pathname === '/homePage' ? corAtiva : corInativa}
        />
        <Text style={[
          styles.buttonText,
          pathname === '/homePage' && { color: corAtiva }
        ]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
        <Text style={[styles.buttonText, styles.exitText]}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}