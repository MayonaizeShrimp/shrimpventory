import type { SidebarItem } from '@core/common/entities/sidebar-item';
import { THEME } from '@core/common/entities/theme';
import { describe, expect, it } from 'vitest';
import { APP_ACTION_TYPE } from './app.action';
import { APP_COMMAND_TYPE } from './app.command';
import { type AppState, appReducer, initializeAppState } from './app.state';

const SIDEBAR_ITEMS: SidebarItem[] = [{ path: '/', label: 'Dashboard', icon: 'dashboard' }];

const createState = (overrides: Partial<AppState> = {}): AppState => ({
  ...initializeAppState({ theme: THEME.LIGHT, sidebarItems: SIDEBAR_ITEMS }),
  ...overrides,
});

describe('app state', () => {
  describe('initializeAppState', () => {
    it('uses the given theme and sidebar items, collapsed, with nothing to do', () => {
      const state = initializeAppState({ theme: THEME.DARK, sidebarItems: SIDEBAR_ITEMS });

      expect(state).toEqual({
        theme: THEME.DARK,
        sidebarItems: SIDEBAR_ITEMS,
        isSidebarCollapsed: true,
        command: { type: APP_COMMAND_TYPE.Noop },
      });
    });
  });

  describe('appReducer', () => {
    describe('ToggleTheme', () => {
      it('should switch light to dark and request saving preferences', () => {
        const state = appReducer(createState(), { type: APP_ACTION_TYPE.ToggleTheme });

        expect(state.theme).toBe(THEME.DARK);
        expect(state.command).toEqual({ type: APP_COMMAND_TYPE.SavePreferences });
      });

      it('should switch dark to light', () => {
        const state = appReducer(createState({ theme: THEME.DARK }), {
          type: APP_ACTION_TYPE.ToggleTheme,
        });

        expect(state.theme).toBe(THEME.LIGHT);
      });
    });

    describe('ToggleSidebar', () => {
      it('should expand a collapsed sidebar without saving', () => {
        const state = appReducer(createState(), { type: APP_ACTION_TYPE.ToggleSidebar });

        expect(state.isSidebarCollapsed).toBe(false);
        expect(state.command).toEqual({ type: APP_COMMAND_TYPE.Noop });
      });

      it('should collapse an expanded sidebar', () => {
        const state = appReducer(createState({ isSidebarCollapsed: false }), {
          type: APP_ACTION_TYPE.ToggleSidebar,
        });

        expect(state.isSidebarCollapsed).toBe(true);
      });
    });

    describe('SelectSidebarItem', () => {
      it('should collapse the sidebar and request navigation to the item path', () => {
        const state = appReducer(createState({ isSidebarCollapsed: false }), {
          type: APP_ACTION_TYPE.SelectSidebarItem,
          path: '/tools/foo',
        });

        expect(state.isSidebarCollapsed).toBe(true);
        expect(state.command).toEqual({ type: APP_COMMAND_TYPE.NavigateTo, path: '/tools/foo' });
      });
    });

    describe('ResetCommand', () => {
      it('should reset the command to noop and keep everything else', () => {
        const before = createState({
          theme: THEME.DARK,
          command: { type: APP_COMMAND_TYPE.SavePreferences },
        });

        const state = appReducer(before, { type: APP_ACTION_TYPE.ResetCommand });

        expect(state).toEqual({ ...before, command: { type: APP_COMMAND_TYPE.Noop } });
      });
    });

    it('should not mutate the previous state', () => {
      const before = createState();
      const snapshot = structuredClone(before);

      appReducer(before, { type: APP_ACTION_TYPE.ToggleTheme });
      appReducer(before, { type: APP_ACTION_TYPE.ToggleSidebar });
      appReducer(before, { type: APP_ACTION_TYPE.SelectSidebarItem, path: '/' });

      expect(before).toEqual(snapshot);
    });
  });
});
