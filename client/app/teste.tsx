import React, { useState } from 'react';
import {
  View,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { AccountStyles as S } from '@/styles/AccountStyles';
import { LinearGradient } from 'expo-linear-gradient';

// Verifique se estes caminhos estão corretos no seu projeto
import api from '@/services/api'; 
import { storage } from '@/services/storage'; 

export default function TesteEndpoints() {
  const [resultado, setResultado] = useState<string>("Pronto para testar!");
  const [carregando, setCarregando] = useState<boolean>(false);

  // =========================================================================
  // VALORES ATUALIZADOS COM BASE NO BRUNO
  // =========================================================================
  const mockRegistro = { 
    username: "username2", 
    email: "email@gmail.com", 
    password: 12345678 
  };
  
  const mockLogin = { 
    email: "email@email.com", 
    password: 123456 
  };
  
  const idPlanetaFake = "1"; 
  const idMissaoFake = "1";
  const idTentativaFake = "1";
  
  const mockIniciarTentativa = { id_mission: idMissaoFake };
  const mockFinalizarTentativa = { respostas: [ { perguntaId: 1, alternativa: "A" } ] };
  // =========================================================================

  const executarTeste = async (nomeDoTeste: string, chamadaApi: () => Promise<any>) => {
    setCarregando(true);
    setResultado(`Aguardando resposta de: ${nomeDoTeste}...`);
    
    try {
      const response = await chamadaApi();
      
      // Lógica para salvar o token assim que o login der certo
      if (nomeDoTeste === 'Login de Usuário') {
        const tokenRecebido = response.data.token || response.data.accessToken; 
        
        if (tokenRecebido) {
          await storage.saveToken(tokenRecebido); 
          setResultado(`✅ [Login] Sucesso! Token salvo no aparelho.\n\nDados:\n${JSON.stringify(response.data, null, 2)}`);
        } else {
          setResultado(`⚠️ [Login] Sucesso, mas o campo 'token' não veio no JSON. Verifique no Bruno como o token é devolvido:\n${JSON.stringify(response.data, null, 2)}`);
        }
      } else {
        setResultado(`✅ [${nomeDoTeste}] Sucesso!\n\nDados:\n${JSON.stringify(response.data, null, 2)}`);
      }

    } catch (error: any) {
      console.error(error);
      const statusErro = error.response?.status;
      const erroMsg = error.response?.data || error.message;
      setResultado(`❌ [${nomeDoTeste}] Erro ${statusErro || ''}\n\nDetalhes:\n${JSON.stringify(erroMsg, null, 2)}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={S.container}
    >
      <ScrollView
        contentContainerStyle={[S.scrollContent, { paddingBottom: 50 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        <View style={S.imageContainer}>
          <Image source={require('../assets/LoginImg.jpg')} style={S.topImage} resizeMode="cover" />
          <LinearGradient colors={['transparent', '#000000']} style={S.gradientFade} />
        </View>

        <View style={styles.painelContainer}>
          <Text style={styles.titulo}>Console do Desenvolvedor</Text>
          <View style={styles.boxResultado}>
            {carregando ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                <Text style={styles.textoResultado}>{resultado}</Text>
              </ScrollView>
            )}
          </View>
        </View>

        <View style={styles.botoesContainer}>
          <Text style={styles.categoria}>0. Sistema</Text>
          <BotaoTeste titulo="Health Check" onPress={() => executarTeste('Health Check', () => api.get('/actuator/health'))} />

          <Text style={styles.categoria}>1. Autenticação</Text>
          <BotaoTeste titulo="Cadastro (/auth/register)" onPress={() => executarTeste('Cadastro de Usuário', () => api.post('/auth/register', mockRegistro))} />
          <BotaoTeste titulo="Login (/auth/login)" onPress={() => executarTeste('Login de Usuário', () => api.post('/auth/login', mockLogin))} />

          <Text style={styles.categoria}>2. Perfil</Text>
          <BotaoTeste titulo="Meu Perfil (/me)" onPress={() => executarTeste('Perfil do Usuário', () => api.get('/me'))} />

          <Text style={styles.categoria}>3. Planetas</Text>
          <BotaoTeste titulo="Lista Planetas (/planets)" onPress={() => executarTeste('Lista de Planetas', () => api.get('/planets'))} />
          <BotaoTeste titulo="Detalhes Planeta" onPress={() => executarTeste('Detalhes do Planeta', () => api.get(`/planets/${idPlanetaFake}`))} />

          <Text style={styles.categoria}>4. Missões</Text>
          <BotaoTeste titulo="Detalhes Missão" onPress={() => executarTeste('Detalhes da Missão', () => api.get(`/missions/${idMissaoFake}`))} />
          <BotaoTeste titulo="Iniciar Tentativa" onPress={() => executarTeste('Iniciar Tentativa', () => api.post('/attempts', mockIniciarTentativa))} />
          <BotaoTeste titulo="Finalizar Tentativa" onPress={() => executarTeste('Finalizar Tentativa', () => api.post(`/attempts/${idTentativaFake}/finish`, mockFinalizarTentativa))} />
        </View>
      </ScrollView>                 
    </KeyboardAvoidingView>
  );
}

const BotaoTeste = ({ titulo, onPress }: { titulo: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.botao} onPress={onPress}>
    <Text style={styles.textoBotao}>{titulo}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  painelContainer: { paddingHorizontal: 20, marginTop: -20 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 10, textAlign: 'center' },
  boxResultado: { width: '100%', minHeight: 150, backgroundColor: '#121212', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333', justifyContent: 'center' },
  textoResultado: { fontSize: 13, color: '#4CAF50', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  botoesContainer: { paddingHorizontal: 20, paddingTop: 20 },
  categoria: { color: '#888', fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 5 },
  botao: { backgroundColor: '#2A2A2A', padding: 12, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: '#444' },
  textoBotao: { color: '#E0E0E0', fontSize: 15, textAlign: 'center', fontWeight: '500' }
});