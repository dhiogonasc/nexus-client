import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { styles } from '@/styles/idStyle';

// Importa o dicionário de imagens e cores
import { PLANETAS } from '@/data/planetas';
import api from '@/services/api';

export default function PlanetDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [planeta, setPlaneta] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarDetalhesPlaneta = async () => {
      if (!id) {
        setErro("Coordenadas não identificadas.");
        setCarregando(false);
        return;
      }

      try {
        // 1. Busca os dados do back-end
        const response = await api.get(`/planets/${id}`);
        const dadosApi = response.data;

        // 2. Busca os recursos visuais no dicionário local (agora acessando como objeto)
        const idString = id.toString();
        const planetaLocal = (PLANETAS as any)[idString]; 

        // 3. Junta tudo
        const planetaCompleto = {
          ...dadosApi,
          id: dadosApi.id?.toString() || idString,
          name: dadosApi.name || dadosApi.nome,
          description: dadosApi.description || dadosApi.descricao || "",
          content: dadosApi.content || "",
          imagem: planetaLocal?.imagem || require('../../assets/FundoPlanets.png'),
          accentColor: planetaLocal?.accentColor || '#3B82F6',
        };

        setPlaneta(planetaCompleto);
      } catch (error) {
        console.error("Erro ao buscar detalhes do planeta:", error);
        setErro("Não foi possível estabelecer conexão com o planeta.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDetalhesPlaneta();
  }, [id]);

  // --- TELAS DE CARREGAMENTO E ERRO ---
  if (carregando) {
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ color: 'white', marginTop: 10 }}>Pousando no planeta...</Text>
      </View>
    );
  }

  if (erro || !planeta) {
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#ef4444' }}>{erro || "Planeta não encontrado."}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#406fd4', marginTop: 15, fontWeight: 'bold' }}>Voltar para o mapa estelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <ImageBackground
      source={require('../../assets/GalaxyBG.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(2,6,23,0.3)', 'rgba(2,6,23,0.95)']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={planeta.accentColor} />
          </BlurView>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={planeta.imagem} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentWrapper}>
          <BlurView intensity={40} tint="dark" style={styles.contentBlur}>
            
            <View style={[styles.accentLine, { backgroundColor: planeta.accentColor }]} />
            
            <Text style={[styles.title, { color: planeta.accentColor }]}>
              {planeta.name}
            </Text>
            
            <View style={styles.descriptionContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingBottom: 16 }}>
                <MaterialCommunityIcons name="atom" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                <Text style={styles.description}>{planeta.description}</Text>
              </View>
              <Text style={styles.description}>
                {planeta.content}
              </Text>
            </View>

            {/* --- VERIFICAÇÃO DE STATUS DO PLANETA --- */}
            {planeta.execution?.status === 'LOCKED' ? (
              
              <View style={{ alignItems: 'center', padding: 25, marginTop: 15, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                <MaterialCommunityIcons name="lock-outline" size={36} color="#94A3B8" />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Acesso Restrito</Text>
                <Text style={{ color: '#94A3B8', textAlign: 'center', marginTop: 6, fontSize: 13, lineHeight: 20 }}>
                  Sua nave ainda não tem os requisitos necessários. Complete as missões do planeta anterior para liberar este quadrante.
                </Text>
              </View>

            ) : (
              
              <>
                <Text style={styles.sectionTitle}>Módulos Disponíveis</Text>
                
                {planeta.missions?.tasks?.map((missao: any) => (
                  <TouchableOpacity
                    key={missao.id}
                    activeOpacity={0.8}
                    style={[styles.moduleCard, { borderLeftColor: planeta.accentColor }]}
                    onPress={() => router.push({
                      pathname: `/mission/[id]`,
                      params: { id: missao.id, planetId: planeta.id }
                    })}
                  >
                    <MaterialCommunityIcons name="rocket-launch-outline" size={20} color={planeta.accentColor} />
                    <Text style={styles.moduleText}>{missao.name}</Text>
                  </TouchableOpacity>
                ))}

                {(!planeta.missions?.tasks || planeta.missions.tasks.length === 0) && (
                  <Text style={{ color: '#94A3B8', marginTop: 10 }}>Nenhuma missão detectada neste quadrante.</Text>
                )}
              </>
              
            )}

          </BlurView>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}