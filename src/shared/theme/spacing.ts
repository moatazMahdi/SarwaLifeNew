export const radius = {
  sm: 6,
  ibtn: 13,
  md: 14,
  button: 17,
  card: 18,
  pill: 999,
} as const;

export const spacing = {
  screenMargin: 22,
  fieldHeight: 54,
  buttonHeight: 56,
  cardGap: 11,
  footerHeight: 95,
} as const;

export const shadows = {
  card: {
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  chip: {
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  header: {
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 4,
  },
  buttonGreen: {
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 26,
    elevation: 6,
  },
} as const;
