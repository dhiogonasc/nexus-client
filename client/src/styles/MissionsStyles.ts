import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // --- Estilos da Imagem de Topo ---
  imageContainer: {
    width: '100%',
    height: 230,
    position: 'relative',
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
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },

// --- Estilos Cartões Planetas ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: -20,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    width: '48%',
    height: '60%',
    marginBottom: 20,
    alignItems: 'center',
  },
  circleContainer: {
    marginBottom: 16,
    backgroundColor: '#000000',
    borderRadius: 50,
    padding: 4,
  },
  circleInside: {
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
  imageCards: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  }
});