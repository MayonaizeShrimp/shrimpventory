import { describe, expect, it } from 'vitest';
import { parseNumber } from './number';

describe('number', () => {
  describe('parseNumber', () => {
    describe('input is number', () => {
      it('should correctly parse number', () => {
        const result = parseNumber(2);
        expect(result).toBe(2);
      });

      it('should correctly parse decimal', () => {
        const result = parseNumber(2.3);
        expect(result).toBe(2.3);
      });

      it('should correctly parse negative number', () => {
        const result = parseNumber(-5);
        expect(result).toBe(-5);
      });

      it('should correctly parse zero', () => {
        const result = parseNumber(0);
        expect(result).toBe(0);
      });

      it.each([
        ['NaN', Number.NaN],
        ['Infinity', Number.POSITIVE_INFINITY],
        ['-Infinity', Number.NEGATIVE_INFINITY],
      ])('should fail to parse %s', (_, input) => {
        const result = parseNumber(input);
        expect(result).toBeNaN();
      });
    });

    describe('input is string', () => {
      const STRING_DECIMAL = '2.2';
      const STRING_FAIL_PARSE = 'not a number';

      it('should correctly parse string of number', () => {
        const STRING_NUMBER = '2';
        const result = parseNumber(STRING_NUMBER);
        expect(result).toBe(2);
      });

      it('should correctly parse string of decimal', () => {
        const result = parseNumber(STRING_DECIMAL);
        expect(result).toBe(2.2);
      });

      it('should correctly parse string of negative number', () => {
        const result = parseNumber('-3.5');
        expect(result).toBe(-3.5);
      });

      it('should correctly parse string in scientific notation', () => {
        const result = parseNumber('1e3');
        expect(result).toBe(1000);
      });

      it('should ignore surrounding whitespace', () => {
        const result = parseNumber('  42  ');
        expect(result).toBe(42);
      });

      it('should fail to parse non-numeric string', () => {
        const result = parseNumber(STRING_FAIL_PARSE);
        expect(result).toBeNaN();
      });

      it('should fail to parse string with trailing characters', () => {
        const result = parseNumber('2abc');
        expect(result).toBeNaN();
      });

      it.each([
        ['empty string', ''],
        ['whitespace-only string', '   '],
        ['Infinity string', 'Infinity'],
      ])('should fail to parse %s', (_, input) => {
        const result = parseNumber(input);
        expect(result).toBeNaN();
      });
    });

    describe('input is neither number nor string', () => {
      it.each([
        ['null', null],
        ['undefined', undefined],
        ['true', true],
        ['false', false],
        ['bigint', 2n],
        ['empty array', []],
        ['array with a number', [2]],
        ['object', {}],
        ['date', new Date(0)],
      ])('should fail to parse %s', (_, input) => {
        const result = parseNumber(input);
        expect(result).toBeNaN();
      });
    });
  });
});
