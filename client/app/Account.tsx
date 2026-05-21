import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import { AccountStyles as S } from '@/styles/AccountStyles';
import { LinearGradient } from 'expo-linear-gradient';

import api from '@/services/api'; 

interface UserData {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  levelName: string;
  createdAt: string;
}

export default function Account() {
  const [user, setUser] = useState<UserData | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  // --- BUSCANDO OS DADOS NA API ---
  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get('/me');
        
        const dadosMapeados: UserData = {
          id: response.data.id || 'N/A',
          name: response.data.username || response.data.name || 'Jogador', 
          email: response.data.email || 'sem-email',
          xp: response.data.xp || 0,
          level: response.data.level || 1,
          levelName: response.data.levelName || 'Iniciante',
          createdAt: response.data.createdAt || 'Desconhecido', 
        };

        setUser(dadosMapeados);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        Alert.alert("Ops!", "Não foi possível carregar os dados do seu perfil.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleUpdatePassword = () => {
    Alert.alert("Tudo certo!", "O botão tá funcionando.");
    console.log('Função para atualizar a senha do usuário');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={S.container}
    >
      <ScrollView
        contentContainerStyle={S.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        <View style={S.imageContainer}>
          <Image
            source={require('../assets/LoginImg.jpg')} 
            style={S.topImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', '#000000']}
            style={S.gradientFade}
          />
        </View>

        <View style={S.contentWrapper}>
          <Text style={S.title}>Seu perfil:</Text>

          <View style={S.profileContainer}>

            {loading ? (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={{ color: '#fff', marginTop: 10 }}>Carregando seus dados...</Text>
              </View>
            ) : !user ? (

              <Text style={{ color: '#ff4444', textAlign: 'center', padding: 20 }}>
                Erro ao carregar informações. Faça login novamente.
              </Text>
            ) : (

              <>
                <View style={S.accountInfo}>
                  <Text style={S.label}>NOME</Text>
                  <Text style={S.value}>{user.name}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <Text style={S.label}>EMAIL</Text>
                  <Text style={S.value}>{user.email}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <Text style={S.label}>XP</Text>
                  <Text style={S.value}>{user.xp}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <Text style={S.label}>NÍVEL ATUAL</Text>
                  <Text style={S.value}>
                    {user.level} - {user.levelName}
                  </Text>
                  <View style={S.line} />
                </View>

                <TouchableOpacity
                  style={S.button}
                  onPress={handleUpdatePassword}
                  activeOpacity={0.8}
                >
                  <Text style={S.buttonText}>Atualizar Senha</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}