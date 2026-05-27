import { StyleSheet } from 'react-native';

const MAX_CONTENT_WIDTH = 650;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },

  imageContainer: {
    width: '100%',
    height: 230,
    position: 'relative',
    alignSelf: 'center',
    overflow: 'hidden',
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
    height: 130,
  },

  contentWrapper: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    flex: 1,
  },

  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 36,
    paddingTop: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },

  inputMargin: {
    marginBottom: 0,
  },

  inputMarginBottom: {
    marginBottom: 0,
  },

  button: {
    backgroundColor: '#D58BE8',
    width: '100%',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#FFFFFF',
    marginTop: 20,
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 0,
  },

  bottomLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50,
  },

  gridContainer: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
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
    minHeight: 220,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
});