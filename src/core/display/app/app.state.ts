import type { SidebarItem } from '@core/common/entities/sidebar-item';
import { getToggledTheme, type Themes } from '@core/common/entities/theme';
import { match } from 'ts-pattern';
import { APP_ACTION_TYPE, type AppActions } from './app.action';
import { APP_COMMAND_TYPE, type AppCommands } from './app.command';

export type AppState = {
  theme: Themes;
  isSidebarCollapsed: boolean;
  sidebarItems: SidebarItem[];
  command: AppCommands;
};

type InitializeAppStateParams = {
  theme: Themes;
  sidebarItems: SidebarItem[];
};

export const initializeAppState = ({
  theme,
  sidebarItems,
}: InitializeAppStateParams): AppState => ({
  theme,
  sidebarItems,
  isSidebarCollapsed: true,
  command: { type: APP_COMMAND_TYPE.Noop },
});

export const appReducer = (state: AppState, action: AppActions): AppState =>
  match(action)
    .returnType<AppState>()
    .with({ type: APP_ACTION_TYPE.ToggleTheme }, () => ({
      ...state,
      theme: getToggledTheme(state.theme),
      command: { type: APP_COMMAND_TYPE.SavePreferences },
    }))
    .with({ type: APP_ACTION_TYPE.ToggleSidebar }, () => ({
      ...state,
      isSidebarCollapsed: !state.isSidebarCollapsed,
    }))
    .with({ type: APP_ACTION_TYPE.SelectSidebarItem }, ({ path }) => ({
      ...state,
      isSidebarCollapsed: true,
      command: { type: APP_COMMAND_TYPE.NavigateTo, path },
    }))
    .with({ type: APP_ACTION_TYPE.ResetCommand }, () => ({
      ...state,
      command: { type: APP_COMMAND_TYPE.Noop },
    }))
    .exhaustive();
