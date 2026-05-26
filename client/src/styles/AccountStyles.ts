import { StyleSheet, Platform } from 'react-native';

const MAX_CONTENT_WIDTH = 760;

export const AccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'web' ? 80 : 100,
  },

  imageContainer: {
    width: '100%',
    height: Platform.OS === 'web' ? 250 : 220,
    position: 'relative',
    alignSelf: 'center',
    overflow: 'hidden',
  },

  topImage: {
    width: '100%',
    height: '100%',
  },

  imageBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  gradientFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },

  contentWrapper: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginTop: -20,
  },

  title: {
    fontSize: Platform.OS === 'web' ? 30 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 22,
    textAlign: 'left',
    letterSpacing: 0.5,
  },

  profileContainer: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderRadius: 22,
    padding: Platform.OS === 'web' ? 26 : 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.22)',

    ...Platform.select({
      web: {
        boxShadow: '0px 18px 50px rgba(0, 0, 0, 0.45)',
      },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.35,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        elevation: 8,
      },
    }),
  },

  accountInfo: {
    width: '100%',
  },

  labelContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },

  labelIcon: {
    marginRight: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#CBD5E1',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  value: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
  },

  descriptionText: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  planetName: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },

  line: {
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    marginVertical: 20,
  },

  button: {
    backgroundColor: '#406fd4',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});