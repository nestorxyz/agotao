export const colors = {
  primary: {
    DEFAULT: "#694fff",
  },
  black: {
    DEFAULT: "#1e1e1e",
    "50": "#f7f7f7",
    "100": "#e3e3e3",
    "200": "#c8c8c8",
    "300": "#a4a4a4",
    "400": "#818181",
    "500": "#666666",
    "600": "#515151",
    "700": "#434343",
    "800": "#383838",
    "900": "#1e1e1e",
  },
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 24,
  xl: 30,
};

export const lineHeight = {
  tight: "125%",
  relaxed: "160%",
};

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
};

export const borderRadius = {
  base: 100,
  full: 9999,
};

export const fontFamily = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const spacing = {
  s0: 0,
  s1: 4,
  s3: 8,
  s4: 12,
  s5: 16,
  s6: 20,
  s7: 24,
  s8: 32,
  s9: 40,
  s10: 48,
  s11: 56,
};

export const screens = {
  xs: "480px",
  sm: "640px",
};

export const themeDefaults = {
  fontFamily: fontFamily.sans,
  lineHeight: lineHeight.relaxed,
  fontWeight: fontWeight.normal,
  fontSize: fontSize.base,
  color: colors.black,
  padding: 0,
};
