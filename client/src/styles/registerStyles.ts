import { StyleSheet, Platform } from 'react-native';

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
    flex: 1, 
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
  input: {
    backgroundColor: '#2B2B2B',
    color: '#FFFFFF',
    width: '100%',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  button: {
    backgroundColor: '#D58BE8',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // Adicione uma margem aqui (ex: marginTop: 20) se o DoublePasswordInput não tiver espaço na base
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: 'row', // Removido o display: 'flex' pois já é o padrão no React Native
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

  // --- Estilos logo lá embaixo ---
  bottomLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50, // Mudei de 0 para 50 para afastar a logo do link de "Entrar", seguindo a tela de Login
  },
});