import { StyleSheet, Platform } from 'react-native';


// Largura máxima para os dados do perfil não ficarem gigantes no PC
const MAX_CONTENT_WIDTH = 1200; 

export const AccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    // Menos espaçamento na base se for Web
    paddingBottom: Platform.OS === 'web' ? 40 : 60, 
  },

  // --- Estilos da Imagem de Topo ---
  imageContainer: {
    width: '100%',
    height: 230,
    position: 'relative',
    alignSelf: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  gradientFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  // --- Wrapper para responsividade ---
  contentWrapper: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center', // Centraliza todo o bloco no meio da tela
  },

  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#CCCCCC',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'left',
    paddingHorizontal: 20, // Mudado de paddingLeft para manter a simetria
  },
  profileContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 7,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20, // Garante que o botão não cole no fundo da tela
  },
  accountInfo: {
    // Pode ficar vazio ou ser usado para espaçamentos futuros
  },
  label: {
    fontSize: 18,
    fontFamily: 'ArchivoBlack_400Regular',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  line: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 22, // marginVertical substitui marginTop e marginBottom iguais
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10, // Um pequeno respiro do último input para o botão
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});