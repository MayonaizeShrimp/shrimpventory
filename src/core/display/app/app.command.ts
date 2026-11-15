export const APP_COMMAND_TYPE = {
  Noop: 'noop',
  SavePreferences: 'savePreferences',
  NavigateTo: 'navigateTo',
} as const;

export type AppCommandTypes = (typeof APP_COMMAND_TYPE)[keyof typeof APP_COMMAND_TYPE];

export type AppCommands =
  | { type: typeof APP_COMMAND_TYPE.Noop }
  | { type: typeof APP_COMMAND_TYPE.SavePreferences }
  | { type: typeof APP_COMMAND_TYPE.NavigateTo; path: string };
