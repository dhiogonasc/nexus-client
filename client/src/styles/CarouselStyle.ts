import { StyleSheet } from 'react-native';

const TOKEN = {
  bg:            '#020617',
  surface:       '#0F172A',
  border:        '#1E293B',
  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#475569',
};

export const CarouselStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: TOKEN.border,
  },

  // Galaxy background
  galaxyBackground: {
    width: '100%',
    height: 520,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galaxyOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  // Orbit ring decorativo
  orbitRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
  },

  // Planeta
  planetContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  planetImage: {
    width: 320,
    height: 320,
  },

  // Controles
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navButton: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  navBlur: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Info card
  infoCard: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoBlur: {
    padding: 14,
    paddingLeft: 18,
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 14,
    bottom: 14,
    width: 3,
    borderRadius: 2,
  },
  planetName: {
    color: TOKEN.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  infoRow: {
    gap: 8,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(30,41,59,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: TOKEN.border,
  },
  infoPillText: {
    color: TOKEN.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },

  // Dots
  dots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },
});