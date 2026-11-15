import { describe, expect, it } from 'vitest';
import { getToggledTheme, THEME } from './theme';

describe('theme', () => {
  describe('getToggledTheme', () => {
    it('should flip light to dark', () => {
      expect(getToggledTheme(THEME.LIGHT)).toBe(THEME.DARK);
    });

    it('should flip dark to light', () => {
      expect(getToggledTheme(THEME.DARK)).toBe(THEME.LIGHT);
    });
  });
});
