export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Themes = (typeof THEME)[keyof typeof THEME];

export const DEFAULT_THEME: Themes = THEME.LIGHT;

export const getToggledTheme = (theme: Themes): Themes => {
  const logicMap: Record<Themes, Themes> = {
    [THEME.LIGHT]: THEME.DARK,
    [THEME.DARK]: THEME.LIGHT,
  };

  return logicMap[theme];
};
