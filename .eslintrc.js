const PRIMITIVES = [
  'src/shared/components/Box/**',
  'src/shared/components/AppText/**',
  'src/shared/components/Touchable/**',
  'src/shared/components/Scroll/**',
  'src/shared/components/AppImage/**',
  'src/shared/components/AppInput/**',
  'src/shared/components/SafeArea/**',
  'src/shared/components/KeyboardAvoid/**',
  'src/shared/components/AnimatedBox/**',
  'src/shared/components/AnimatedText/**',
  'src/shared/components/AnimatedTouchable/**',
];

const RAW_PRIMITIVES = {
  name: 'react-native',
  importNames: [
    'View',
    'Text',
    'Pressable',
    'ScrollView',
    'Image',
    'TextInput',
    'KeyboardAvoidingView',
  ],
  message:
    'Use the primitives from shared/components (Box, Row, AppText, Touchable, Scroll, AppImage, AppInput, KeyboardAvoid).',
};

const RAW_SAFE_AREA = {
  name: 'react-native-safe-area-context',
  importNames: ['SafeAreaView'],
  message: 'Use SafeArea from shared/components.',
};

const STYLESHEET_IN_TSX = {
  name: 'react-native',
  importNames: ['StyleSheet'],
  message: 'Styles live in the sibling <Name>.styles.ts file.',
};

module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      excludedFiles: PRIMITIVES,
      rules: {
        'no-restricted-imports': ['error', { paths: [RAW_PRIMITIVES, RAW_SAFE_AREA] }],
        'react-native/no-inline-styles': 'error',
      },
    },
    {
      files: ['src/**/*.tsx'],
      excludedFiles: PRIMITIVES,
      rules: {
        'no-restricted-imports': [
          'error',
          { paths: [RAW_PRIMITIVES, RAW_SAFE_AREA, STYLESHEET_IN_TSX] },
        ],
      },
    },
  ],
};
