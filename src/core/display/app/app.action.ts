export const APP_ACTION_TYPE = {
  ToggleTheme: 'toggleTheme',
  ToggleSidebar: 'toggleSidebar',
  SelectSidebarItem: 'selectSidebarItem',
  ResetCommand: 'resetCommand',
} as const;

export type AppActionTypes = (typeof APP_ACTION_TYPE)[keyof typeof APP_ACTION_TYPE];

export type AppActions =
  | { type: typeof APP_ACTION_TYPE.ToggleTheme }
  | { type: typeof APP_ACTION_TYPE.ToggleSidebar }
  | { type: typeof APP_ACTION_TYPE.SelectSidebarItem; path: string }
  | { type: typeof APP_ACTION_TYPE.ResetCommand };
