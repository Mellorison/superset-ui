import { getTextDimension } from '../src/index';
import addDummyFill, { SAMPLE_TEXT } from './addDummyFill';

describe('getTextDimension(input)', () => {
  describe('returns default dimension if getBBox() is not available', () => {
    it('returns default value for default dimension', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
        }),
      ).toEqual({
        height: 20,
        width: 100,
      });
    });
    it('return specified value if specified', () => {
      expect(
        getTextDimension(
          {
            text: SAMPLE_TEXT,
          },
          {
            height: 30,
            width: 400,
          },
        ),
      ).toEqual({
        height: 30,
        width: 400,
      });
    });
  });
  describe('returns dimension of the given text', () => {
    let originalFn: () => DOMRect;

    beforeEach(() => {
      // @ts-ignore - fix jsdom
      originalFn = SVGElement.prototype.getBBox;
      addDummyFill();
    });

    afterEach(() => {
      // @ts-ignore - fix jsdom
      SVGElement.prototype.getBBox = originalFn;
    });

    it('takes text as argument', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
        }),
      ).toEqual({
        height: 20,
        width: 200,
      });
    });
    it('accepts provided class via className', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          className: 'test-class',
        }),
      ).toEqual({
        height: 20,
        width: 100, // width is 100 after adding class
      });
    });
    it('accepts provided style.font', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            font: 'italic 700 30px Lobster',
          },
        }),
      ).toEqual({
        height: 30, // 20 * (30/20) [fontSize=30]
        width: 1125, // 250 [fontFamily=Lobster] * (30/20) [fontSize=30] * 1.5 [fontStyle=italic] * 2 [fontWeight=700]
      });
    });
    it('accepts provided style.fontFamily', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            fontFamily: 'Lobster',
          },
        }),
      ).toEqual({
        height: 20,
        width: 250, // (250 [fontFamily=Lobster]
      });
    });
    it('accepts provided style.fontSize', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            fontSize: '40px',
          },
        }),
      ).toEqual({
        height: 40, // 20 [baseHeight] * (40/20) [fontSize=40]
        width: 400, // 200 [baseWidth] * (40/20) [fontSize=40]
      });
    });
    it('accepts provided style.fontStyle', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            fontStyle: 'italic',
          },
        }),
      ).toEqual({
        height: 20,
        width: 300, // 200 [baseWidth] * 1.5 [fontStyle=italic]
      });
    });
    it('accepts provided style.fontWeight', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            fontWeight: 700,
          },
        }),
      ).toEqual({
        height: 20,
        width: 400, // 200 [baseWidth] * 2 [fontWeight=700]
      });
    });
    it('accepts provided style.letterSpacing', () => {
      expect(
        getTextDimension({
          text: SAMPLE_TEXT,
          style: {
            letterSpacing: '1.1',
          },
        }),
      ).toEqual({
        height: 20,
        width: 221, // Ceiling(200 [baseWidth] * 1.1 [letterSpacing=1.1])
      });
    });
  });
});
