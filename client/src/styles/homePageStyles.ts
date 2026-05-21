import { StyleSheet, Platform } from 'react-native';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const TOKEN = {
  bg:         '#020617',
  surface:    '#0F172A',
  surfaceAlt: '#1E293B',
  border:     '#1E293B',
  borderAlt:  '#334155',
  accent:     '#38BDF8',
  accentWarm: '#F59E0B',
  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#475569',
};

// Largura máxima para que a interface não estique ao infinito num monitor Web
const MAX_WEB_WIDTH = 800; 

// ─── Home Page ─────────────────────────────────────────────────────────────────
export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TOKEN.bg,
  },

  // Header responsivo
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: TOKEN.border,
    borderBottomWidth: 1,
  },
  headerContent: {
    width: '100%',
    maxWidth: MAX_WEB_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    fontSize: 28,
  },
  greeting: {
    color: TOKEN.textSecondary,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 2,
  },
  userName: {
    color: TOKEN.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  // Scroll Responsivo
  scrollContent: {
    // Reduzimos o espaço vazio na web, já que geralmente não tem NavBar lá
    paddingBottom: Platform.OS === 'web' ? 40 : 130, 
    alignItems: 'center', // Isso garante que todas as <View style={S.section}> fiquem no centro na Web
  },

  // Sections
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: MAX_WEB_WIDTH,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: TOKEN.accent,
  },
  sectionTitle: {
    color: TOKEN.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
});