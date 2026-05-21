import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: '100%', 
    backgroundColor: '#111a29',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', 
    borderTopWidth: 2,
    borderTopColor: '#334155', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10, 
    zIndex: 10,
  },
  
  button: {
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1, 
    paddingVertical: 10,
  },
  
  buttonText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  homeButtonText: {
    color: '#FFF',
    fontWeight: 'bold', 
    letterSpacing: 1.5,
  },
  
  exitText: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
});