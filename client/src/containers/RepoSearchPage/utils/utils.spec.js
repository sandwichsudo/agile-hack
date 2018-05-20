import { createTimeScale } from './utils';

describe('selectors', () => {
  describe('createTimeScale', () => {
    it('should create scale for slider', () => {
      const times = ['2am','4am','6am', '8am', '10am', '12pm'];

      const marks = createTimeScale(times, 10);
      expect(marks).toEqual({
          "0": {"label": "2am", "style": {"color": "white"}},
          "2": {"label": "4am", "style": {"color": "white"}},
          "4": {"label": "6am", "style": {"color": "white"}},
          "6": {"label": "8am", "style": {"color": "white"}},
          "8": {"label": "10am", "style": {"color": "white"}},
          "10": {"label": "12pm", "style": {"color": "white"}},
        })
    });
  });
})
