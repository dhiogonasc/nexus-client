import { StyleSheet, Platform } from 'react-native';

// Tamanhos máximos para Web
const MAX_CONTENT_WIDTH = 650;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
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

  // --- Wrapper de Responsividade ---
  contentWrapper: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center', // Centraliza o formulário na Web
    flex: 1, // Permite que ocupe o resto da tela
  },

  // --- Estilos do Formulário ---
  formContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 25,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },
  
  // Substitui a margem inline das Views dos inputs
  inputMargin: {
    marginBottom: 15,
  },
  inputMarginBottom: {
    marginBottom: 35, // Afastamento maior antes do botão (ajustado de 85 para 35 para melhor harmonia)
  },

  button: {
    backgroundColor: '#D58BE8',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '400',
  },
  registerLink: {
    color: '#F6D48F',
    fontSize: 18,
    fontWeight: '800',
  },
  homeLinkContainer: {
    textAlign: 'center', 
    color: '#fff', 
    marginTop: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 0,
  },

  // --- Estilos logo lá embaixo ---
  bottomLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50, // Empurra a logo para o fundo se houver espaço
  },

  // --- Estilos Missões ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: -20,
  },
  card: {
    backgroundColor: '#2A2765',
    borderRadius: 24,
    padding: 20,
    width: '48%',
    height: '60%',
    marginBottom: 20,
    alignItems: 'center',
  },
  circleContainer: {
    marginBottom: 16,
    backgroundColor: '#1C1A4A',
    borderRadius: 50,
    padding: 4,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4A478A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  imageCards: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  }
});