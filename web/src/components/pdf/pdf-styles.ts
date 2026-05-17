import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  text: "#1A1A1A",
  muted: "#6B7280",
  divider: "#E5E7EB",
  accent: "#6B62D1",
  accentLight: "#EEF2FF",
  success: "#16A34A",
  successLight: "#DCFCE7",
  white: "#FFFFFF",
  surface: "#F9FAFB",
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.5,
    backgroundColor: colors.white,
    paddingBottom: 56,
  },

  headerBand: {
    backgroundColor: colors.accent,
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.white,
  },
  generatedAt: {
    fontSize: 8,
    color: "rgba(255,255,255,0.75)",
  },

  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },

  title: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 20,
  },

  companyBox: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    backgroundColor: colors.accentLight,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 22,
  },
  companyBoxTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  companyBoxName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.success,
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  companyBoxMeta: {
    flexDirection: "row",
  },
  companyBoxMetaItem: {
    fontSize: 8,
    color: colors.muted,
    marginRight: 16,
  },
  companyBoxMetaBold: {
    fontFamily: "Helvetica-Bold",
    color: colors.text,
  },

  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionBar: {
    width: 3,
    height: 12,
    backgroundColor: colors.accent,
    marginRight: 7,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  rowShaded: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 2,
    backgroundColor: colors.surface,
  },
  label: {
    width: 118,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.muted,
    paddingTop: 1,
  },
  value: {
    flex: 1,
    fontSize: 9,
    color: colors.text,
  },

  addressBlock: {
    flex: 1,
  },
  addressLine: {
    fontSize: 9,
    color: colors.text,
    marginBottom: 1,
  },
  addressLineMuted: {
    fontSize: 8,
    color: colors.muted,
  },

  cnaeItem: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cnaeCode: {
    width: 70,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.accent,
  },
  cnaeDescription: {
    flex: 1,
    fontSize: 8,
    color: colors.muted,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 7,
    color: colors.muted,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 6,
  },
});
