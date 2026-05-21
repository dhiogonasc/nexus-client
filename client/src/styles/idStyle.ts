import { StyleSheet } from 'react-native';

const MAX_WEB_WIDTH = 800; 

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#020617' 
  },
  header: {
    paddingTop: 60, // Ajuste dependendo do notch/status bar do celular
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: { 
    width: 45,
    height: 45,
    borderRadius: 25,
    overflow: 'hidden',
  },
  iconBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    marginVertical: 10,
  },
  image: { 
    width: 250, 
    height: 250 
  },
  contentWrapper: {
    maxWidth: MAX_WEB_WIDTH,
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  contentBlur: { 
    flex: 1, 
    padding: 25, 
    borderRadius: 24, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  accentLine: {
    height: 4,
    width: 40,
    borderRadius: 2,
    marginBottom: 20,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  descriptionContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
  },
  description: { 
    fontSize: 16, 
    color: '#CBD5E1',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  moduleText: {
    color: '#E2E8F0',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500'
  }
});