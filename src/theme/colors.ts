export const colors = {
  green: '#006957',
  greenD: '#0A5245',
  greenDD: '#0B3730',
  greenL: '#0C7A65',

  gold: '#C9A24B',
  goldL: '#E4CD8E',
  goldBg: '#FBF6EA',
  goldBr: '#EAD9B0',
  goldTx: '#9B7F3E',

  ink: '#1A1D26',
  g7: '#374151',
  g5: '#6B7280',
  g4: '#9CA3AF',
  g3: '#C9CFD6',
  br: '#E5E7EB',
  br2: '#EEF0F3',
  br3: '#F1F3F5',
  bg: '#F5F7FA',
  mint: '#EAF3F0',
  white: '#FFFFFF',

  // Quote flow (Figma "حساب القسط", 1:601) — this section of the design system uses its
  // own neutral ramp, so the tokens are kept separate from the `g*` scale above.
  qInk: '#0E0F0C', // field labels & values
  qInkD: '#020B19', // "تفاصيل احتساب القسط" title
  qGreenInk: '#083400', // page title + age pill text
  qGrey: '#6A6C6A', // chevron-down glyph
  qGreyT: '#6C6D6D', // "مزايا إضافية…" subtitle
  qGreySl: '#353D49', // slider min/max labels
  qGreyRow: '#4B5565', // premium-breakdown row labels
  qBorder: '#E2E2E1', // field / unselected choice border
  qBtnBr: '#F0F0F0', // header icon-button border
  qTrack: '#E2E2E2', // slider track (rendered at 24% opacity)
  qCardBg: '#FAFAFA', // breakdown card fill
  qCardBr: '#E6E6E6', // breakdown card border
  qRule: 'rgba(120,120,128,0.16)', // section divider
  qAmount: '#1A1A1A', // "ج.م" next to the slider value

  ok: '#10B981',
  okBg: '#E7F6EF',
  warn: '#F59E0B',
  warnBg: '#FEF3E2',
  warnBg2: '#FEF9EC',
  bad: '#EF4444',
  badBg: '#FDECEC',
  badBr: '#FBE0E0',
} as const;

export const gradients = {
  brand: {
    colors: ['#0C7A65', '#00705C', '#054A3D'],
    locations: [0, 0.42, 1],
    angle: 155.86,
  },
  brandSoft: {
    colors: ['#F1F8F6', '#E7F2EE'],
    angle: 151.76,
  },
  goldG: {
    colors: ['#E7D296', '#C9A24B'],
    angle: 151.76,
  },
  surface: {
    colors: ['#FFFFFF', '#FDFDFE'],
    angle: 180,
  },
} as const;

export type ProductKey = 'death' | 'sav' | 'crit' | 'fcan' | 'mcan';

export const productColors: Record<ProductKey, { primary: string; deep: string; tint: string }> = {
  death: { primary: '#006957', deep: '#054A3D', tint: '#EAF3F0' },
  sav: { primary: '#C9A24B', deep: '#8A6B25', tint: '#FBF6EA' },
  crit: { primary: '#E8663D', deep: '#A8391A', tint: '#FCEDE7' },
  fcan: { primary: '#D6547E', deep: '#8E2E4F', tint: '#FBEDF2' },
  mcan: { primary: '#2E4B7A', deep: '#1A2C4C', tint: '#EAEEF6' },
};
