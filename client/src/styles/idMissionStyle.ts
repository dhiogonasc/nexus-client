import { StyleSheet } from 'react-native';

// Definindo a largura máxima para telas grandes (Web/Tablets)
const MAX_WEB_WIDTH = 800; 

export const styles = StyleSheet.create({
  container: { 
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    // Propriedades de responsividade adicionadas:
    maxWidth: MAX_WEB_WIDTH,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: { 
    width: 45, 
    height: 45, 
    borderRadius: 25, 
    overflow: 'hidden' 
  },
  iconBlur: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingBottom: 40,
    // Propriedades de responsividade adicionadas:
    maxWidth: MAX_WEB_WIDTH,
    width: '100%',
    alignSelf: 'center',
  },
  questionCard: {
    padding: 25,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 30,
  },
  questionText: { 
    fontSize: 22, 
    color: '#fff', 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  optionsContainer: { 
    flex: 1 
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioDot: { 
    width: 12, 
    height: 12, 
    borderRadius: 6 
  },
  optionText: { 
    color: '#E2E8F0', 
    fontSize: 16, 
    flex: 1 
  },
  confirmButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});